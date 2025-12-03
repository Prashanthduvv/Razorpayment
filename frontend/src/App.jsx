import React, { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

// Icons
import {
  FiCreditCard,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function App() {
  const [amount, setAmount] = useState(499);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const presets = [199, 499, 999, 1499];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const payNow = async () => {
    if (!window.Razorpay)
      return setStatus({
        type: "error",
        message: "Razorpay script not loaded. Check internet.",
      });

    if (!(Number(amount) > 0))
      return setStatus({
        type: "error",
        message: "Enter a valid amount (minimum ₹1).",
      });

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await api.post("/create-order", { amount });
      const { key, order } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "Demo Store",
        description: "Test Payment",

        handler: async (response) => {
          try {
            const verify = await api.post("/verify-payment", response);

            setStatus({
              type: verify.data?.success ? "success" : "error",
              message:
                verify.data?.success
                  ? "Payment verified successfully."
                  : verify.data?.message || "Verification failed.",
            });
          } catch {
            setStatus({ type: "error", message: "Verification failed." });
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: { color: "#2563eb" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "Order creation failed: " +
          (err.response?.data?.error || err.message),
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-container gradient-bg flex-center">
        <div className="card glass-card animate-fade">
          <h1 className="title flex-center gap-2">
            <FiCreditCard className="title-icon" />
            Razorpay Demo
          </h1>

          <div className="field">
            <label className="label">Amount (₹)</label>
            <input
              className="input glass-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              placeholder="Enter amount"
            />
          </div>

          <div className="preset-row">
            {presets.map((p) => (
              <button
                key={p}
                className={`preset-btn ${amount == p ? "preset-active" : ""}`}
                onClick={() => setAmount(p)}
              >
                ₹{p}
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary pay-btn"
            onClick={payNow}
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="spinner" />
            ) : (
              <FiCreditCard className="pay-icon" />
            )}
            {loading ? " Processing..." : " Pay Now"}
          </button>

          {status.message && (
            <div
              className={`alert ${
                status.type === "success" ? "success" : "error"
              } animate-slide`}
            >
              {status.type === "success" ? (
                <FiCheckCircle className="alert-icon" />
              ) : (
                <FiAlertCircle className="alert-icon" />
              )}
              {status.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
