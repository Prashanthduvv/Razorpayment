# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<<<<<<< HEAD
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
=======
# Razorpayment
Razorpay payment gateway implementation
>>>>>>> 213e1e401d3f6743a9acc10d7cd1ecb6c692ce45
