 # 🕒 ticktock - Timesheet Management App

A SaaS-style timesheet web application built as part of the Tentwenty Frontend Technical Assessment. The app allows users to log in, view weekly timesheets, and manage their entries with create, update, and delete functionalities.

---

## 🚀 Live Demo

   [Live on Vercel]([https://your-vercel-deployment-url.vercel.app](https://ticktock-timesheet-management-app.vercel.app/))  
📦 [GitHub Repository](https://github.com/your-username/ticktock-timesheet)

---

## 🧠 Project Overview

This project simulates a real-world SaaS dashboard with login functionality and a timesheet management system. Features include:

- Secure login using mock users via `next-auth`
- Dashboard listing weekly timesheets with status indicators
- Create, update, delete functionality per timesheet week
- Dynamic modals for Add and Edit
- Protected routes based on session
- Responsive, clean UI based on provided Figma design

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router + TypeScript)
- **TailwindCSS** for utility-first responsive styling
- **NextAuth.js** for authentication (`CredentialsProvider`)
- **React Hook Form** + **Zod** for form handling & validation
- **Jest**, **React Testing Library** (bonus test setup)
- **Inter Font** from Google Fonts
- Mock Data for users and timesheets stored locally

---

## 🧪 Bonus Features Implemented

✅ Used `next-auth` for authentication  
✅ Modal for Create/Edit timesheet  
✅ Form validation with react-hook-form + zod  
✅ Responsive design  
✅ Protected routes with session check  
✅ Code is modular, reusable, and clean

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ticktock-timesheet.git
cd ticktock-timesheet

# 2. Install dependencies
npm install

# 3. Run the app locally
npm run dev

# 4. Environment variable
# Create a .env.local file with:
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

```

---
## User Login

```bash

Email: john@tentwenty.com
Password: password123
```
