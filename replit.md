# Kartik Sharma Portfolio - Replit Setup

## Project Overview
A full-stack portfolio website for Kartik Sharma, a Software Developer & Freelancer from Jaipur, with comprehensive UI animations and 3D effects.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Radix UI components
- **Backend**: Express.js with REST API
- **Database**: In-memory MemStorage (development) / PostgreSQL (Neon Cloud for production)
- **Runtime**: Node.js
- **Animations**: Framer Motion (30+ animation variants)
- **ORM**: Drizzle ORM

## Setup & Running

### Development
```bash
npm run dev
```
Runs on `http://localhost:5000`

### Database
- Using **MemStorage** for development (in-memory, with seed data)
- Configured for **Neon PostgreSQL** for production
- Run migrations: `npm run db:push`

### Production Build
```bash
npm run build    # Build frontend + backend
npm run start    # Start production server
```

## Key Features

### Pages
- Home - Hero section with 3D animated background + profile
- About - Developer background with staggered education/experience animations
- Projects - Portfolio projects with links
- Services - Service offerings
- Skills - Technical skills by category
- Blog - Blog posts with staggered card animations
- Achievements/Certificates - Credentials and achievements
- Admin Dashboard - Content management (protected with auth)

### Animations & UI Effects
#### 3D Background System
- 6 floating geometric shapes (cubes, spheres, toruses)
- CSS 3D transforms with perspective
- Continuous rotation on X, Y, Z axes
- Glowing effects with backdrop blur
- Mesh grid overlay pattern

#### Page Animations
- **Fade-in-up** animations on page headings and content
- **Stagger animations** on card lists (education, experience, contact info, blog posts)
- **Icon hover effects** - scale and rotate on interaction
- **Form animations** - smooth fade-in with staggered field appearance
- **Footer animations** - staggered section transitions

#### Animation Library
Reusable Framer Motion variants in `client/src/lib/animations.ts`:
- `fadeInUp` - Standard fade and slide animation
- `staggerContainer` - Parent container for staggered children
- `staggerItem` - Individual item animation
- Plus 25+ additional variants (scale, rotate, bounce, etc.)

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
   - Font preconnect for faster loading
   - Lazy animations on page scroll

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (Secrets)
- `VITE_GA_MEASUREMENT_ID` - Google Analytics (optional)

## Deployment
Configured for Replit deployment:
- Target: Autoscale
- Build: `npm run build`
- Start: `npm run start`

## Recent Changes
- Dec 23, 2025: Added comprehensive UI animations throughout website
  - 3D animated background with floating geometric shapes
  - Staggered animations on About, Contact, Blog, and Footer sections
  - 30+ reusable Framer Motion animation variants
  - Smooth transitions and hover effects on all interactive elements

## User Preferences
- Hinglish communication preferred
- Focus on animations and visual effects
- In-memory storage for development (MemStorage)

## Optimization Recommendations
- Consider further favicon optimization (current: 768KB) - can be compressed to ~50KB using TinyPNG
- Add Google Analytics measurement ID for tracking
- Implement lazy loading for images on projects page
- Add service worker for offline support (PWA)
- Consider adding page-scroll triggered animations for better UX
