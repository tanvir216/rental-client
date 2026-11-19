# RentGear – Equipment Rental Platform (Client)

**Live URL:** https://YOUR-CLIENT-LIVE-URL
**Server repo:** https://github.com/YOUR-USERNAME/YOUR-SERVER-REPO
**Server live URL:** https://YOUR-SERVER-LIVE-URL

## Purpose

RentGear is a rental marketplace where equipment owners list their equipment and customers browse, book and pay online for a chosen rental period. Admins approve listings and monitor the whole platform.

## Key Features

- Email/password + Google login (BetterAuth) with JWT-secured API calls
- Role based dashboards: **Customer**, **Owner**, **Admin**
- Home page: banner, 6 featured equipment, categories, why choose us, how it works, stats, reviews (Framer Motion animations)
- All Equipment: server-side search, filters (category, rental type, price, availability), sorting and pagination
- Equipment details (private route), favorites, booking modal with live total price
- Stripe Checkout payment and payment-success confirmation
- Customer: My Rentals (paginated), Favorites, Profile, spending chart
- Owner: Add Equipment (imgbb upload), My Equipment (update/delete), My Equipment Rental, earnings analytics
- Admin: All Users (change role / delete), All Equipment (approve / reject / update / delete), All Rentals, platform analytics
- Dark / Light theme toggle saved in localStorage
- Loading page, error page, 404 page, fully responsive

## npm Packages

`next`, `react`, `react-dom`, `better-auth`, `mongodb`, `framer-motion`, `react-hot-toast`, `recharts`, `tailwindcss`, `daisyui`, `postcss`, `autoprefixer`

## Run Locally

```bash
npm install
cp .env.example .env.local   # then fill in your own values
npm run dev
```

## Environment Variables

See `.env.example`. `INTERNAL_KEY` must be identical in the client and the server.
Google OAuth redirect URI: `https://YOUR-CLIENT-LIVE-URL/api/auth/callback/google`
