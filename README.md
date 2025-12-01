# ⚡ Professional Portfolio & Admin Dashboard

A robust full-stack portfolio application built to showcase software development projects and technical blogs. Unlike static portfolios, this project features a **dynamic Content Management System (CMS)** allowing real-time updates via a secure Admin Panel.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📸 Project Previews

| Client View (Home) |
|:---:|
| ![Home UI](https://github.com/KartikSharma4448/MyPortfolio/blob/main/client/public/Screenshot%202025-12-01%20212911.png) | 

> *Note: Replace the placeholders above with actual screenshots of your application.*

---

## ✨ Key Features

### 🎨 Frontend (User Experience)
* **Modern UI Architecture:** Built with **React 18** and **Shadcn/UI** (Radix Primitives) for accessible, high-quality design components.
* **Responsive Design:** Fully adaptive layout using **Tailwind CSS**, optimized for mobile and desktop screens.
* **Client-Side Routing:** Lightning-fast navigation using `wouter` for a seamless Single Page Application (SPA) feel.
* **State Management:** Utilizes **TanStack Query (React Query)** for efficient server state synchronization and caching.
* **Theme System:** Built-in Dark/Light mode toggle with persistence.

### ⚙️ Backend & Database
* **Secure API:** RESTful API built with **Express.js** and TypeScript.
* **Database ORM:** Uses **Drizzle ORM** with **PostgreSQL** (NeonDB) for type-safe database interactions and high performance.
* **Authentication:** Secure Admin login implemented via **Passport.js** (Session-based auth).
* **Dynamic Content:** All projects, blogs, and certifications are fetched dynamically from the database, not hardcoded.

---

## 🛠️ Tech Stack

* **Languages:** TypeScript, SQL
* **Frontend:** React, Vite, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Neon Serverless), Drizzle ORM
* **Tools:** Lucide Icons, Zod (Validation), Axios

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
* Node.js (v18 or higher)
* PostgreSQL Database URL

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/KartikSharma4448/MyPortfolio.git](https://github.com/KartikSharma4448/MyPortfolio.git)
    cd MyPortfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your database credentials:
    ```env
    DATABASE_URL=postgresql://user:password@host/dbname
    SESSION_SECRET=your_secret_key
    ```

4.  **Database Migration**
    Push the schema to your database:
    ```bash
    npm run db:push
    ```

5.  **Run Development Server**
    Start both client and server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5000`.

---

## 🤝 Contact

**Kartik Sharma** Software Developer | Jaipur, India  
[LinkedIn](https://linkedin.com/in/kartik-sharma06) • [Email](mailto:kartikuma9261@gmail.com)
