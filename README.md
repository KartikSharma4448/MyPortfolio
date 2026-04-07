# MyPortfolio

<p align="center">
  <strong>My live professional portfolio with an admin-managed full-stack content system.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-Frontend-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Express" src="https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Data%20Layer-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Fullstack-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

This is my primary portfolio repository and present professional showcase. It includes a client-facing portfolio website plus a secure admin panel for dynamic updates.

## Showcase features

- Portfolio pages for projects, experience, and branding
- Admin dashboard for updating content without redeploying code
- Full-stack TypeScript architecture
- Database-backed content model with Drizzle ORM
- Auth-protected admin routes and APIs

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Radix UI, Framer Motion
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Drizzle ORM

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```env
   DATABASE_URL=postgresql://...
   SESSION_SECRET=your_secret
   ```

3. Push schema:

   ```bash
   npm run db:push
   ```

4. Start app:

   ```bash
   npm run dev
   ```

## Project structure

- `client/` - portfolio frontend
- `server/` - backend API and auth
- `shared/` - shared contracts and schema

## License

See [LICENSE](LICENSE).