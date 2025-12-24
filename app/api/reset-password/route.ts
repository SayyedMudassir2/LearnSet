
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { admin } from '@/lib/firebase-admin';

// --- Validation Schema ---
const ResetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1, { message: "Token is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// --- API Handler ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ResetPasswordSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessage = Object.values(errors).flat().join(', ');
      return NextResponse.json({ message: errorMessage || "Invalid input." }, { status: 400 });
    }

    const { email, token, password } = validation.data;

    // --- Verify Token in Firestore ---
    const tokenRef = admin.firestore().collection('passwordResetTokens').doc(email);
    const tokenDoc = await tokenRef.get();

    if (!tokenDoc.exists) {
        return NextResponse.json({ message: "Invalid or expired password reset link." }, { status: 400 });
    }

    const { token: storedToken, expires } = tokenDoc.data()!;

    if (storedToken !== token) {
        return NextResponse.json({ message: "Invalid or expired password reset link." }, { status: 400 });
    }

    if (Date.now() > expires) {
        await tokenRef.delete(); // Clean up expired token
        return NextResponse.json({ message: "Password reset link has expired." }, { status: 400 });
    }

    // --- Update User Password in Firebase Auth ---
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(user.uid, { password });

    // --- Delete the Token ---
    await tokenRef.delete();

    return NextResponse.json({ message: "Password has been reset successfully." }, { status: 200 });

  } catch (error) {
    console.error("Error resetting password:", error);
    // Check for specific Firebase auth errors if needed
    if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        if (firebaseError.code === 'auth/user-not-found') {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }
    }
    return NextResponse.json({ message: 'Failed to reset password. Please try again.' }, { status: 500 });
  }
}
