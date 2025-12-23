# Environment Configuration Guide

This project uses environment variables to manage secrets and configuration. In Replit, these are managed through the **Secrets** tab on the left sidebar.

## Available Environment Variables

### Database Configuration
All database variables are automatically set when you create a PostgreSQL database in Replit:
- `DATABASE_URL` - Full PostgreSQL connection string
- `PGHOST` - Database host
- `PGPORT` - Database port (default: 5432)
- `PGDATABASE` - Database name
- `PGUSER` - Database username
- `PGPASSWORD` - Database password

### Application
- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 5000)
- `SESSION_SECRET` - Secret key for session management

### Analytics
- `VITE_GA_MEASUREMENT_ID` - Google Analytics measurement ID (for frontend tracking)
  - **Must be prefixed with `VITE_`** to be exposed to frontend
  - Get this from your Google Analytics account

### Optional API Keys
Add these when you integrate external services:
- `OPENAI_API_KEY` - For OpenAI/GPT integration
- `STRIPE_SECRET_KEY` - For Stripe payment processing

### Replit Variables
- `REPLIT_DEV_DOMAIN` - Your Replit development domain
- `REPLIT_DOMAINS` - Your custom domain(s)

## How to Add/Update Environment Variables in Replit

1. **Open the Secrets Panel**
   - Look for the "Lock" icon or "Secrets" tab on the left sidebar
   
2. **Add a New Secret**
   - Click "New Secret" or the plus icon
   - Enter the key (e.g., `VITE_GA_MEASUREMENT_ID`)
   - Enter the value
   - Click "Add Secret"

3. **For Frontend Variables**
   - **Important:** Prefix with `VITE_` to expose to frontend
   - Example: `VITE_GA_MEASUREMENT_ID`, `VITE_API_URL`

4. **Restart Your Application**
   - After adding/updating secrets, restart the workflow
   - Click the Stop button and then Start application

## Usage in Code

### Server-side (Node.js)
```typescript
import { env } from './config/env';

console.log(env.DATABASE_URL);
console.log(env.NODE_ENV);
console.log(env.PORT);
```

### Client-side (React)
```typescript
import { env } from '@lib/env';

// Only VITE_ prefixed variables are available on client
if (env.GA_MEASUREMENT_ID) {
  // Initialize Google Analytics
}
```

## Example: Adding Google Analytics

1. Get your Measurement ID from [Google Analytics](https://analytics.google.com)
   - Go to Admin → Data Streams → Select your property → Copy Measurement ID

2. Add to Replit Secrets:
   - **Key:** `VITE_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (your actual ID)

3. Restart the application

4. Use in code:
   ```typescript
   import { env } from '@lib/env';
   
   const trackingId = env.GA_MEASUREMENT_ID;
   ```

## .env File (For Local Development)

If you want to use a `.env` file for local development:

1. Create a `.env` file in the root directory
2. Copy content from `.env.example`
3. Fill in your actual values
4. **Important:** Never commit `.env` to git (it's in .gitignore)

### Local .env Example
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/kartik_portfolio
SESSION_SECRET=your_local_development_secret
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NODE_ENV=development
PORT=5000
```

**Note:** In Replit, use the Secrets tab instead of .env file - it's more secure.

## Security Best Practices

1. ✅ **Use Replit Secrets** - Never hardcode secrets in code
2. ✅ **Use VITE_ prefix** - Only for data safe for frontend
3. ✅ **Never commit .env** - It's already in .gitignore
4. ✅ **Rotate secrets** - Change SESSION_SECRET and API keys periodically
5. ✅ **Different secrets per environment** - Dev, staging, and production should have different values

## Common Issues

### "Missing critical environment variables"
- Check that all required variables are set in Replit Secrets
- Restart the application after adding secrets

### Variables not appearing in frontend
- Make sure variable name starts with `VITE_`
- Example: `VITE_GA_MEASUREMENT_ID` (not `GA_MEASUREMENT_ID`)

### Changes not taking effect
- Restart the workflow after updating secrets
- Clear browser cache if needed

## Troubleshooting

To check which environment variables are available:

```bash
# In Replit console
echo $DATABASE_URL
echo $NODE_ENV
```

Or check in code:
```typescript
console.log('Database:', process.env.DATABASE_URL ? 'configured' : 'missing');
console.log('Env:', process.env.NODE_ENV);
```
