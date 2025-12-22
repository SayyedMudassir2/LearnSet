
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';
import { otpStore } from '@/lib/otp'; // Import the OTP store

// --- Validation Schema ---
const OTPSchema = z.object({
  email: z.string().email(),
});

// --- OTP Generation ---
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// --- API Handler ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = OTPSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    const { email } = validation.data;
    const otp = generateOTP();

    // Store OTP with a 5-minute expiry
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // --- Send Email with OTP ---
    await transporter.sendMail({
      from: process.env.EMAIL, 
      to: email, 
      subject: 'Your One-Time Password (OTP) for Registration',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="text-align: center; color: #333;">Welcome!</h2>
          <p>Thank you for registering. Please use the following One-Time Password (OTP) to complete your registration:</p>
          <p style="text-align: center; font-size: 24px; font-weight: bold; color: #007BFF;">${otp}</p>
          <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
          <p style="font-size: 0.9em; text-align: center; color: #666;">This is an automated message. Please do not reply.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
  }
}
