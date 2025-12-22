
// In-memory storage for OTPs. 
// IMPORTANT: This is not suitable for production. 
// Use a more persistent and scalable solution like Redis or a database.

interface OTPData {
  otp: string;
  expires: number;
}

export const otpStore: { [email: string]: OTPData } = {};
