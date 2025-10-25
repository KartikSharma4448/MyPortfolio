Full-Stack Dynamic Developer Portfolio

This repository contains the complete source code for my personal portfolio website, live at kartiksharma.site.
This is not just a static site. It is a full-stack monorepo application featuring a React frontend, a Node.js (Hono/Express) backend API, a PostgreSQL database, and a complete, secure Admin Panel for dynamic content management.

🚀 About This Project
The primary goal of this project was to build a high-performance, fully dynamic portfolio that I could manage without touching the code.
All content—including projects, blog posts, skills, and certificates—is served from a database. I built a secure Admin Panel with authentication where I can perform full CRUD (Create, Read, Update, Delete) operations on all site content.

🛠️ Tech Stack
This project utilizes a monorepo structure with shared type definitions, a React frontend, and a Node.js backend.
Frontend: React, TypeScript, Vite, Tailwind CSS
Backend: Node.js, Hono, Express.js
Database: Remote PostgreSQL
ORM: Drizzle ORM (for type-safe SQL)
Authentication: JWT (JSON Web Tokens) for secure API routes
Deployment: Deployed on Render with a CI/CD pipeline from GitHub.

✨ Features
Dynamic Content: All data for projects, blogs, skills, certificates, and services is fetched from the database.
Secure Admin Panel: A complete admin dashboard to manage all site content, protected by JWT authentication.
Custom REST API: A full backend API built to handle all communication between the client and the database.
SEO Optimized: Includes dynamic meta tags, structured JSON-LD data, and an auto-generated sitemap.xml for better search engine indexing.
Automated Deployment: CI/CD pipeline via Render ensures that any push to the main branch is automatically built and deployed.
