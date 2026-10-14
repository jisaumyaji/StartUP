# Supabase Integration Guide for EcoLuxe Startup

This project is fully integrated with **Supabase** for:
1. **User Authentication** (Customer sign up/in, Clinic & Doctor B2B portal, Google OAuth, session management).
2. **Storing User Details** (Customer profile, clinic credentials, shipping addresses, order histories in PostgreSQL).
3. **Fetching & Storing Images** (Dynamic product photos, media assets, and avatar uploads in Supabase Storage CDN).

---

## ⚡ Quick 3-Step Setup

### Step 1: Create your free Supabase Project
1. Go to [supabase.com](https://supabase.com) and click **Start your project** (Free tier is generous and permanent).
2. Name your project (e.g., `ecoluxe-storefront`) and choose a strong database password.
3. Select the region closest to your primary target audience.

---

### Step 2: Run the Database Schema
1. In your Supabase dashboard, click **SQL Editor** on the left navigation bar.
2. Click **New Query**.
3. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the editor.
4. Click **Run** (or `Ctrl + Enter`).

> **What this does:**
> - Creates the `public.profiles` table linked to Supabase Auth (`auth.users`).
> - Adds automatic PostgreSQL triggers to create a profile whenever a new user signs up.
> - Creates the `public.orders` table for persisting cart checkouts and clinic POs.
> - Configures Row Level Security (RLS) policies so users can only view/edit their own data.
> - Sets up the `avatars` and `product-images` storage buckets with public read policies.

---

### Step 3: Add Credentials to `.env.local`
1. In your Supabase dashboard, navigate to **Project Settings** (gear icon) > **API**.
2. Find:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API keys** > `anon` / `public`
3. Open or create `.env.local` in this project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Restart your development server:
   ```bash
   npm run dev
   ```

---

## 🚀 Features Implemented

### 1. User Details Management
- **Stored in PostgreSQL (`profiles` table)**:
  - Full Name
  - Email Address
  - Phone Number
  - Avatar Photo URL (hosted in Supabase Storage)
  - Account Role (`customer` or `clinic`)
  - Clinic / Hospital Name & Medical License / VAT number
  - Default Shipping Address (Street, City, Postal Code, Country)
- **Automatic Auto-Fill**:
  - Logged-in users have their checkout forms auto-populated instantly.
  - Users can update their profile information anytime in the **User Profile Modal**.

### 2. Fetching & Storing Images (Supabase Storage)
- **Buckets Configured**:
  - `avatars`: User and doctor profile photos.
  - `product-images`: High-resolution catalog imagery and media assets.
- **Image Storage Modal (`openImageManager()`)**:
  - Accessible directly from the top navigation bar or user profile.
  - Drag-and-drop or click to upload any image directly to Supabase Storage CDN.
  - One-click "Copy URL" to attach to new products or marketing banners.
  - Real-time preview of fetched bucket assets.

### 3. Authentication & Security
- **Auth Provider (`src/context/AuthContext.tsx`)**:
  - Reactive `user`, `profile`, and `session` state.
  - Email & Password login and registration.
  - Dedicated B2B tab for Clinics and Healthcare practitioners.
  - Google OAuth integration ready.
  - Row Level Security (RLS) ensures users cannot tamper with or read other customers' data.

### 4. Zero-Friction Local Dev Mode
- If you run the project without adding keys to `.env.local` yet, the app activates **Local Development Mode** with responsive in-browser storage, allowing you and your team to preview the complete auth, profile editing, image management, and checkout flows immediately without fatal errors!
