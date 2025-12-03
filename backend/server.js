import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import crypto from "crypto";
import { PORT, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, FRONTEND_URL } from "./config.js";

const app = express();

// Minimal CORS for development - allow configured frontend or localhost
app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => res.json({ message: "Backend is running" }));

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const value = Number(amount) || 0;
    if (value <= 0) return res.status(400).json({ success: false, error: "Invalid amount" });

    const options = { amount: value * 100, currency: "INR", receipt: `rcpt_${Date.now()}` };
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, key: RAZORPAY_KEY_ID, order });
  } catch (error) {
    console.error("Order Error:", error?.message || error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  }

  const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(bodyString).digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true, message: "Payment verified successfully" });
  }

  return res.status(400).json({ success: false, message: "Signature verification failed" });
});

const port = PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
