
import { NextResponse } from 'next/server';
import { admin } from '@/lib/firebase-admin';
import { z } from 'zod';
import { otpStore } from '@/lib/otp'; // Import the OTP store

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(3),
  otp: z.string().length(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Validation failed", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email, password, fullName, otp } = validation.data;

    // --- Verify OTP ---
    const otpData = otpStore[email];
    if (!otpData || otpData.otp !== otp) {
      return NextResponse.json({ message: "Invalid or expired OTP." }, { status: 401 });
    }

    if (Date.now() > otpData.expires) {
      delete otpStore[email]; // Clean up expired OTP
      return NextResponse.json({ message: "OTP has expired." }, { status: 401 });
    }

    // --- Create Firebase User ---
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // Clean up OTP after successful registration
    delete otpStore[email];

    // --- Optionally, create a user document in Firestore ---
    // await admin.firestore().collection('users').doc(userRecord.uid).set({ ... });

    return NextResponse.json({ message: "User registered successfully", uid: userRecord.uid }, { status: 201 });

  } catch (error: any) {
    console.error("Registration Error:", error);

    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
}
