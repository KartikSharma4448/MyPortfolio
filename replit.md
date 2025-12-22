# Kartik Sharma Portfolio - Replit Setup

## Project Overview
A full-stack portfolio website for Kartik Sharma, a Software Developer & Freelancer from Jaipur.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Radix UI components
- **Backend**: Express.js with REST API
- **Database**: PostgreSQL (Neon Cloud)
- **Runtime**: Node.js
- **Authentication**: Passport.js (Local strategy)
- **ORM**: Drizzle ORM

## Setup & Running

### Development
```bash
npm run dev
```
Runs on `http://localhost:5000`

### Database
- Using **Neon PostgreSQL** for production
- Connection managed via `DATABASE_URL` environment variable
- Run migrations: `npm run db:push`

### Production Build
```bash
npm run build    # Build frontend + backend
npm run start    # Start production server
```

## Key Features

### Pages
- Home - Hero section with profile
- About - Developer background
- Projects - Portfolio projects with links
- Services - Service offerings
- Skills - Technical skills by category
- Blog - Blog posts with admin editing
- Achievements/Certificates - Credentials and achievements
- Admin Dashboard - Content management (protected with auth)

### Database Tables
- users - Admin user credentials
- projects - Portfolio projects
- certificates - Professional certificates
- skills - Technical skills
- services - Service offerings
- blog_posts - Blog articles
- contact_messages - Contact form submissions
- social_links - Social media profiles
- about_content - About page content

## Performance Optimizations Applied

1. **Vite Config**: 
   - Code splitting for vendor, UI, and utilities
   - Minification with Terser
   - Source maps disabled for production

2. **HTTP Headers**:
   - Static assets cached for 1 year (immutable)
   - HTML never cached (always checks)
   - API responses cached for 60 seconds

3. **Frontend Optimization**:
   - DNS prefetch for Google Fonts
   - AdSense script deferred (non-blocking)
   - Font preconnect for faster loading

## Environment Variables
- `DATABASE_URL` - Neon PostgreSQL connection string (Secrets)
- `VITE_GA_MEASUREMENT_ID` - Google Analytics (optional)

## Deployment
Configured for Replit deployment:
- Target: Autoscale
- Build: `npm run build`
- Start: `npm run start`

## Recent Changes
- Dec 22, 2025: Migrated to Neon PostgreSQL, added performance optimizations
- Added cache control headers for faster page loads
- Optimized Vite build with code splitting
- Set up proper DNS prefetching for Google Fonts

## Known Issues to Address
- Favicon (360KB) should be compressed to ~32x32 or 64x64 PNG
- Google Analytics key should be added for proper tracking
- Consider adding image optimization for profile pictures
