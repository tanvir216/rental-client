<div align="center">

# 🛠️ RentGear — Equipment Rental Platform

**Rent the right equipment, on demand.**

A full-stack marketplace where owners list their equipment and customers browse, book and pay online for a chosen rental period, with admin approval and platform-wide analytics.

[![Live Site](https://img.shields.io/badge/Live%20Site-rental--client--lac.vercel.app-FF7F00?style=for-the-badge)](https://rental-client-lac.vercel.app/)
[![Server API](https://img.shields.io/badge/Server%20API-rental--server--pi.vercel.app-522600?style=for-the-badge)](https://rental-server-pi.vercel.app/)

</div>

---

## 🔗 Links

|                        |                                                   |
| ---------------------- | ------------------------------------------------- |
| **Live Site (Client)** | https://rental-client-lac.vercel.app/             |
| **Live Server (API)**  | https://rental-server-pi.vercel.app/              |
| **Client Repository**  | https://github.com/YOUR-USERNAME/YOUR-CLIENT-REPO |
| **Server Repository**  | https://github.com/YOUR-USERNAME/YOUR-SERVER-REPO |

---

## 🎯 Purpose

RentGear connects **equipment owners** and **customers** through a transparent, secure rental marketplace. Owners list construction, photography, vehicle, agriculture, electronics and event equipment. Customers search, filter, book for a specific period and pay with Stripe. Admins approve listings and keep an eye on the entire platform.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- Email + password registration with validation (uppercase, lowercase, minimum 6 characters) and toast feedback
- Google social login (new Google users get the **Customer** role by default)
- **BetterAuth** with MongoDB adapter, plus **JWT** access tokens for API calls
- **Role-Based Access Control** for Customer, Owner and Admin, on both private routes and API endpoints
- Logged-in users stay logged in when reloading any private route

### 🏠 Public Pages

- **Home:** hero banner, 6 featured equipment cards, popular categories, why choose us, how it works, community stats and customer reviews, all animated with **Framer Motion**
- **All Equipment:** 3-column card grid with **server-side** search (name / location), filters (category, rental type, price range, availability), sorting (price low→high, high→low, recently added) and pagination
- Clicking **View Details** while logged out redirects to **Login**, then returns you to the equipment you wanted

### 📦 Equipment & Booking (Private)

- Equipment details: image, description, category, price, rental type, location, quantity, owner info and rental terms
- Add / remove **favorites**
- **Booking modal** with start/end date, quantity, contact number, delivery address and notes, with a live estimated total
- Availability check, then secure payment through **Stripe Checkout**
- After payment: booking record and transaction saved, then redirected to the payment-success page

### 👤 Customer Dashboard

- **My Rentals:** table with dates, total amount, payment status and booking status (paginated), plus a spending chart
- **Favorites:** view details or remove
- **Profile:** update name, image, phone and address

### 🧰 Owner Dashboard

- **Analytics:** listed equipment, completed rentals, total and monthly earnings
- **Add Equipment:** full form with image upload via **imgbb** (listings start as _Pending_)
- **My Equipment:** update, delete and view details
- **My Equipment Rental:** customer and booking information, with booking status management

### 🛡️ Admin Dashboard

- **Analytics:** total users, equipment, bookings, pending approvals, completed rentals, revenue and monthly bookings
- **All Users:** change role, delete user
- **All Equipment:** approve, reject, update, delete
- **All Rentals:** monitor and manage every booking

### 🎨 UI / UX

- Fully responsive (mobile, tablet, desktop)
- **Dark / Light theme** toggle, saved in `localStorage`
- Consistent buttons, headings, equal-size cards and a unified orange-and-black brand palette
- Custom **Loading**, **Error** and **404** pages

---

## 🧱 Tech Stack

| Layer             | Technologies                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **Frontend**      | Next.js 14 (App Router), React 18, Tailwind CSS, DaisyUI, Framer Motion, Recharts, React Hot Toast |
| **Auth**          | BetterAuth, MongoDB Adapter, JWT with role-based access                                            |
| **Backend**       | Node.js, Express.js, MongoDB                                                                       |
| **Payments**      | Stripe Checkout                                                                                    |
| **Image Hosting** | imgbb                                                                                              |
| **Deployment**    | Vercel (client and server)                                                                         |

---

## 📦 NPM Packages (Client)

| Package                                  | Why                                      |
| ---------------------------------------- | ---------------------------------------- |
| `next`, `react`, `react-dom`             | App framework                            |
| `better-auth`                            | Email/password and Google authentication |
| `mongodb`                                | MongoDB adapter for BetterAuth           |
| `framer-motion`                          | Section and card animations              |
| `recharts`                               | Dashboard charts                         |
| `react-hot-toast`                        | Toast notifications                      |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling pipeline                         |
| `daisyui`                                | UI component classes and themes          |

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/YOUR-CLIENT-REPO.git
cd YOUR-CLIENT-REPO

# 2. Install
npm install

# 3. Add environment variables (see below)
cp .env.example .env.local

# 4. Start
npm run dev
```

Open http://localhost:3000

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root. **Never commit real values.**

```env
# Backend API
NEXT_PUBLIC_API_URL=https://rental-server-pi.vercel.app

# Image upload (imgbb)
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key

# BetterAuth
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Must be identical on client and server
INTERNAL_KEY=your_shared_internal_key
```

Google OAuth redirect URI:
`https://rental-client-lac.vercel.app/api/auth/callback/google`

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.js                 # Home
│   ├── equipment/              # All Equipment + [id] details (private)
│   ├── login/  register/
│   ├── payment/success/
│   ├── dashboard/
│   │   ├── customer/  owner/  admin/  profile/
│   ├── loading.js  error.js  not-found.js
│   └── api/                    # BetterAuth + token endpoints
├── components/                 # Navbar, Footer, EquipmentCard, PrivateRoute, Analytics...
└── lib/                        # api helper, auth, hooks
```

---

## 👥 User Roles

| Role         | Can do                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------- |
| **Customer** | Browse, favorite, book, pay, view own rentals and profile                                       |
| **Owner**    | Everything above, plus list and manage own equipment and view rentals of their equipment        |
| **Admin**    | Approve or reject equipment, manage users and roles, monitor all rentals and platform analytics |

---

<div align="center">

Built with ❤️ using Next.js, Express, MongoDB and Stripe.

</div>
