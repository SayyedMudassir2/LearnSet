
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';
import crypto from 'crypto';
import { admin } from '@/lib/firebase-admin';

// --- Validation Schema ---
const ResetEmailSchema = z.object({
  email: z.string().email(),
});

// --- Token Generation ---
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// --- API Handler ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ResetEmailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    // --- Check for Base URL environment variable ---
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        console.error("FATAL: NEXT_PUBLIC_BASE_URL environment variable is not set.");
        return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const { email } = validation.data;
    const token = generateResetToken();
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour expiry

    // --- Store Token in Firestore ---
    await admin.firestore().collection('passwordResetTokens').doc(email).set({
      token,
      expires,
    });

    // --- Create Reset Link ---
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${email}`;

    // --- Send Email with Reset Link ---
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="text-align: center; color: #333;">Password Reset Request</h2>
          <p>You recently requested to reset your password. Please click the button below to proceed.</p>
          <a href="${resetLink}" style="display: block; width: 200px; margin: 20px auto; padding: 10px 20px; background-color: #007BFF; color: white; text-align: center; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>This link is valid for 1 hour.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
          <p style="font-size: 0.9em; text-align: center; color: #666;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Password reset email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json({ message: 'Failed to send password reset email' }, { status: 500 });
  }
}
