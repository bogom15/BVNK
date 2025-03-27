# 💳 Hosted Payment Page (HPP) – Sandbox React App

This is a modern React application built with Vite and TypeScript for simulating a hosted payment flow using BVNK's sandbox API.

---

## 🚀 Tech Stack

- ⚛️ React + Vite + TypeScript
- 💨 TailwindCSS for styling
- 🧩 React Router v6
- 🧪 Vitest + React Testing Library (tests included)
- 📦 Axios for API requests
- 🧠 Clean code structure with reusable components

---

## 📸 Screens

- **Home** – Input a quote UUID to start
- **Accept Quote** – View quote, select currency, confirm
- **Pay Quote** – Copy payment details, view timer and QR code
- **Expired** – Handles expired quotes with redirect

---

## 🔧 Getting Started

### 1. Clone and run the repo
```bash

cd hpp-app

### Install Dependencies

npm install

### Run The application

npm run dev

🛠 Manual Setup
🔑 Get a UUID
To start a flow:

Open Postman and import the sandbox Postman collection.

Use Create Payment in the sandbox environment.

Copy the UUID from the API response.

Paste it on the home page input to simulate the flow.

### Tests

npm run test

