# Waterdrop '88 Event Management System

A Cloudflare Pages application for managing event RSVPs, wristband purchases, and bond status tracking with an 80s neon aesthetic.

## Project Structure

```
waterdrop/
├── functions/
│   ├── api/
│   │   ├── bond.ts          # GET bond status
│   │   ├── rsvp.ts          # POST RSVP submissions
│   │   └── wristband.ts     # POST wristband purchases
│   └── admin.ts             # GET admin dashboard
├── waterdrop_event.html     # Main event page
├── 001_init.sql            # Database schema
├── wrangler.toml           # Cloudflare configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Local Development

### Prerequisites

- Node.js 18+
- Wrangler CLI: `npm install -g wrangler`
- Cloudflare account (for deployment)

### Setup Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up local D1 database:**
   ```bash
   # Create local database
   npx wrangler d1 create waterdrop-db --local
   
   # Run migrations
   npx wrangler d1 execute waterdrop-db --local --file=001_init.sql
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Main event page: http://localhost:8788
   - Admin dashboard: http://localhost:8788/admin

### Local Development Features

- Hot reload for both static files and Functions
- Local D1 database with persistent data
- Real API endpoints working locally
- TypeScript support with proper type checking

## Deployment

### Manual Deployment

1. **Create production D1 database:**
   ```bash
   npx wrangler d1 create waterdrop-db
   ```

2. **Update wrangler.toml with your database ID:**
   ```toml
   database_id = "your-actual-database-id"
   ```

3. **Run migrations on production:**
   ```bash
   npx wrangler d1 execute waterdrop-db --file=001_init.sql
   ```

4. **Deploy to Cloudflare Pages:**
   ```bash
   npm run deploy
   ```

### CI/CD Deployment (GitHub Actions)

1. Set up secrets in your GitHub repository:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

2. Push to the `main` branch to trigger automatic deployment

## API Endpoints

### Public Endpoints
- `GET /api/bond` - Get bond status (raised amount and goal)
- `POST /api/rsvp` - Submit RSVP (requires `name` and `email`)
- `POST /api/wristband` - Purchase wristband (requires `email` and `quantity`)

### Admin Endpoints
- `GET /admin` - Admin dashboard for RSVP and wristband tracking

## Database Schema

The application uses Cloudflare D1 (SQLite) with the following tables:

- `rsvps` - Event RSVP submissions
- `wristbands` - Wristband purchase records  
- `bond_status` - Bond fundraising progress

## Features

- **Event Landing Page**: 80s-themed responsive design with neon aesthetics
- **RSVP System**: Free event registration with email collection
- **Wristband Sales**: Optional wristband purchases with quantity tracking
- **Bond Status**: Real-time fundraising progress display
- **Admin Dashboard**: Real-time view of RSVPs and wristband purchases
- **Local Development**: Full local development environment with D1 database

## Performance & CI

- Fast CI/CD pipeline with cached dependencies
- Edge deployment for global performance
- Optimized static assets with CDN delivery
- TypeScript for type safety and better developer experience

## Environment Setup

### Required Environment Variables

For production, set in Cloudflare Pages:
- `DB` (D1 database binding - automatically configured)

### Local Development Variables

Local development uses the local D1 database automatically.

## Development Scripts

- `npm run dev` - Start local development server
- `npm run deploy` - Deploy to Cloudflare Pages
- `npm run db:create` - Create production database
- `npm run db:migrate` - Run migrations on production
- `npm run db:local` - Run migrations locally

## Technology Stack

- **Frontend**: HTML, Tailwind CSS, DaisyUI
- **Backend**: Cloudflare Pages Functions (TypeScript)
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions
