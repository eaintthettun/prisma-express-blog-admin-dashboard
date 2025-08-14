# 🛠 Prisma Express Blog - Admin Dashboard

An **Admin Dashboard** for managing a Prisma + Express Blog project.  
This dashboard is built with **React**, **Tailwind CSS**, and **Flowbite** for the UI,  
and uses **PostgreSQL**,**Prisma ORM** with **Express.js** for the backend.

---

## 📌 Features

- **User Management** – View and manage registered users.
- **Post Management** – Approve, edit, or delete blog posts.
- **Topic & Category Management** – Create, update, and delete blog topics.
- **Responsive UI** – Fully responsive design with Tailwind CSS + Flowbite.
- **Routing** – Client-side routing with React Router.
- **API Integration** – The React admin dashboard communicates with the Express backend via REST API calls. The backend uses Prisma ORM to handle database queries and updates.
- **Secure Database Access** – Managed through Prisma ORM.

---

## 🛠 Tech Stack

### Frontend

- **React 19** – UI library
- **Tailwind CSS 4** – Styling
- **Flowbite & Flowbite-React** – Prebuilt components
- **React Router v7** – Routing
- **React Icons** – Icon set

### Backend

- **Express 5** – Server-side framework
- **Prisma ORM 6** – Database queries and migrations
- **PostgreSQL** – Database (can be swapped with MySQL/SQLite)
- **CORS** – API security

### Build Tools

- **Vite 7** – Fast development server and bundler
- **TypeScript** – Type safety
- **ESLint** – Code linting

---

## 📂 Project Structure

project/
│── backend/ # Express + Prisma API
│ ├── prisma/ # Prisma schema and migrations
│ ├── routes/ # API route definitions
│ ├── controllers/ # Controller logic
│ └── index.js # Entry point
│
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Dashboard pages
│ │ └── main.tsx # React entry point
│ │ └── App.tsx # where routes are written
│ └── index.html
│
└── package.json # both frontend & backend dependencies
└── README.md

---

## 🚀 Installation

### 1️⃣ Clone the repository

git clone https://github.com/your-username/prisma-express-blog-admin.git
cd prisma-express-blog-admin

### 2️⃣ Install dependencies

npm install

### 3️⃣ Setup environment variables

Create a `.env` file in `backend/`:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/blogdb"
SECRET=your_secret_key
PORT=5000

### 4️⃣ Run Prisma migrations

cd backend
npx prisma init
npx prisma generate
npx prisma db push

### 5️⃣ Start the development servers

npm run server (for backend)

npm run dev (for frontend)

---

## 🖼 Screenshots

_(Add screenshots of your dashboard here)_

---

## 👨‍💻 Author

- **Eaint Thet Tun** – [GitHub](https://github.com/eaintthettun/prisma-express-blog-admin-dashboard.git)

---
