import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL;