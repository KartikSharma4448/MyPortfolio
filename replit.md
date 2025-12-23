# Kartik Sharma Portfolio - Replit Setup

## Project Overview
A full-stack portfolio website for Kartik Sharma, a Software Developer & Freelancer from Jaipur, with comprehensive UI animations and 3D effects throughout all pages.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Radix UI components
- **Backend**: Express.js with REST API
- **Database**: In-memory MemStorage (development) / PostgreSQL (Neon Cloud for production)
- **Runtime**: Node.js
- **Animations**: Framer Motion with 30+ animation variants + CSS 3D transforms
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

### Pages with 3D Animations
- **Home** - 3D animated background with 6 floating geometric shapes (cubes, spheres, toruses)
- **About** - Staggered education/experience cards, icon hover animations
- **Projects** - 3D card flip effects (rotateY/rotateX), staggered project cards with perspective transforms
- **Services** - 3D card perspective transforms on hover (rotateX/rotateY), staggered service cards
- **Blog** - Staggered blog post cards with smooth fade-in animations
- **Achievements** - Staggered certification and skills cards with icon scale animations
- **Contact** - Animated contact info cards, staggered form fields
- **Social Links** - 3D card rotations on hover, profile image scale animation, staggered link items
- **Footer** - Staggered section animations

### 3D Animation System
#### 3D Background (Home Page)
- 6 floating geometric shapes (cubes, spheres, toruses)
- CSS 3D transforms with perspective: 1000px
- Continuous rotation on X, Y, Z axes
- Glowing effects with backdrop blur
- Mesh grid overlay pattern
- Smooth floating animation with easing

#### 3D Card Effects (Projects, Services, Social Links)
- **Perspective Transform**: `perspective: '1000px'` for depth perception
- **3D Rotations**: `rotateX`, `rotateY` on hover for tilt effect
- **Scale Animations**: Subtle scale (1.01 - 1.05) combined with 3D rotations
- **Shadow Enhancements**: `hover:shadow-2xl` for depth
- **Smooth Transitions**: 0.2-0.3s duration with spring physics

#### Reusable Animation Variants (`client/src/lib/animations.ts`)
- `fadeInUp` - Fade and slide animation
- `staggerContainer` - Parent container with stagger effect
- `staggerItem` - Individual item animation (delay based on index)
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

## Performance Optimizations

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

## Recent Changes - Dec 23, 2025
### 3D Animations Added to All Pages:
- **Projects Page**: 3D card perspective transforms with rotateX/rotateY on hover, staggered animations
- **Services Page**: 3D card flip effects with scale, staggered service cards with perspective
- **Social Links Page**: 3D card rotations, animated profile image, staggered link items with icon hover effects
- **Component Library**: Created reusable `Card3DFlip` component for advanced 3D card effects
- **Animations Library**: 30+ Framer Motion variants for consistent animations across pages

### Complete Animation Coverage:
- ✅ Home - 3D background + floating shapes
- ✅ About - Staggered cards + icon animations
- ✅ Projects - 3D card effects + staggered list
- ✅ Services - 3D perspective transforms + staggered grid
- ✅ Achievements - Staggered cards + icon scale
- ✅ Blog - Staggered cards + fade-in
- ✅ Contact - Staggered form + animated info cards
- ✅ Social Links - 3D card rotations + animated profile
- ✅ Footer - Staggered sections + smooth transitions

## User Preferences
- Hinglish communication preferred
- Focus on comprehensive animations and visual effects
- 3D effects using CSS transforms and Framer Motion
- In-memory storage for development (MemStorage)

## Technical Highlights
- **No External 3D Libraries**: Uses only CSS 3D transforms and Framer Motion (no Three.js to avoid dependency conflicts)
- **Perspective-Based Depth**: All 3D effects use CSS perspective property for smooth, performant animations
- **Reusable Animation System**: All animations centralized in `@/lib/animations` for consistency
- **Smooth Interactions**: Spring physics and easing functions for natural motion
- **Accessibility-Conscious**: Animations respect user preferences and don't impact usability

## Optimization Recommendations
- Consider further favicon optimization (current: 768KB) - can be compressed to ~50KB
- Add Google Analytics measurement ID for tracking
- Implement lazy loading for images on projects page
- Add service worker for offline support (PWA)
- Consider adding scroll-triggered animations for even more engaging experience
