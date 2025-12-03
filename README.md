# Razorpay Full App (Minimal)

This repository contains a minimal full-stack Razorpay integration (Express backend + React frontend).

Purpose
- Keep only the essential code to create a Razorpay order and verify payment signature.
- Simple, clear instructions for local testing.

Quick Overview
- Backend: `backend/server.js` — exposes `/create-order` and `/verify-payment`.
- Frontend: `frontend/src/App.jsx` — small React UI that loads Razorpay checkout and calls the backend.
- API client: `frontend/src/api.js` — axios instance pointing to backend.

Setup (local development)
1. Backend
```powershell
cd backend
npm install
# create a .env file with your Razorpay test keys (see .env.example)
# Example .env:
# PORT=5000
# RAZORPAY_KEY_ID=rzp_test_your_key
# RAZORPAY_KEY_SECRET=your_secret
# FRONTEND_URL=http://localhost:5173
npm start
```
2. Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

Test Card (Razorpay test)
- Card: `4111 1111 1111 1111`
- Any future expiry date and any CVV

Notes
- Keep your real keys out of version control. Use `.env`.
- This README is the single documentation file in the repo; other docs were removed to keep the project minimal.
