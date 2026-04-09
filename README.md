# Zero Store — Ecommerce

Full-stack ecommerce application built with Next.js 15 App Router, MongoDB, Stripe, and Cloudinary.

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.3 | Full-stack React framework (App Router) |
| [React](https://react.dev/) | 19.1 | UI library |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS (`@import "tailwindcss"` syntax) |
| [Turbopack](https://turbo.build/pack) | — | Dev server bundler (`next dev --turbopack`) |

### Backend & Database

| Technology | Purpose |
|---|---|
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) 8.x | ODM — 5 models (User, Product, Order, Cart, Address) |
| Next.js API Routes | RESTful endpoints (`src/app/api/`) |
| [Joi](https://joi.dev/) | Request validation on API routes |

### Authentication

| Technology | Purpose |
|---|---|
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT token signing & verification |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [js-cookie](https://github.com/js-cookie/js-cookie) | Client-side cookie management |
| Custom middleware | `AuthUser.js` — Bearer token extraction & verification |

### Payments

| Technology | Purpose |
|---|---|
| [Stripe](https://stripe.com/) (server SDK) | Checkout session creation |
| [@stripe/stripe-js](https://github.com/stripe/stripe-js) | Client-side redirect to Stripe Checkout |

### File Storage

| Technology | Purpose |
|---|---|
| [Cloudinary](https://cloudinary.com/) | Product image upload & hosting (REST API, no SDK) |

### UI Libraries

| Library | Purpose |
|---|---|
| [@headlessui/react](https://headlessui.com/) 2.x | Accessible modal/dialog components |
| [react-toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [react-spinners](https://www.davidhu.io/react-spinners/) | Loading indicators |
| [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Inter) | Self-hosted Google Font |

### State Management

- **React Context API** — single `GlobalContext` provider (no Redux/Zustand)
- Client-side hydration from cookies + `localStorage`

### SEO

- Metadata exports with OpenGraph & Twitter cards
- Dynamic `sitemap.js` and `robots.js`
- `generateMetadata` on dynamic product pages

### Deployment

- **Vercel** — zero-config deployment with `NEXT_PUBLIC_VERCEL_URL` auto-fallback

## Project Structure

```
src/
├── app/            # Pages, layouts, API routes (App Router)
├── components/     # Reusable UI (Navbar, Footer, CommonListing, FormElements, etc.)
├── constant/       # Environment-derived constants
├── context/        # React Context provider
├── database/       # MongoDB connection (singleton)
├── middleware/      # JWT auth middleware
├── models/         # Mongoose schemas (User, Product, Order, Cart, Address)
├── services/       # Client-side API fetch wrappers
└── utils/          # Utilities
```

## API Endpoints

| Domain | Endpoints |
|---|---|
| Auth | `POST /api/login`, `POST /api/register` |
| Products | `add-product`, `all-products`, `delete-product`, `update-product`, `product-by-id`, `product-by-category` |
| Cart | `add-to-cart`, `all-cart-items`, `delete-from-cart` |
| Address | `add-new-address`, `delete-address`, `get-all-address`, `update-address` |
| Orders | `create-order`, `get-all-orders` (user + admin) |
| Upload | `POST /api/upload` (Cloudinary) |
| Payment | `POST /stripe` (Stripe Checkout session) |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Stripe account
- Cloudinary account

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Install & Run

```bash
npm install
npm run dev        # Dev server with Turbopack on http://localhost:3000
npm run build      # Production build
npm start          # Start production server
```

### Seed Database (optional)

```bash
node scripts/seed.js
```

Creates test accounts:
- **Admin:** admin@test.com / admin123
- **Customer:** customer@test.com / customer123

## Deploy on Vercel

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Add all environment variables (set `NEXT_PUBLIC_APP_URL` to your production domain)
4. Deploy
