

# Course Section Rebuild + User Dashboard Implementation

## Overview
This is a comprehensive rebuild that transforms the current "Course" page from an LMS module list into a full-featured sales funnel with member dashboard. The implementation spans three distinct user experiences: public sales landing page, authentication flow, and private member dashboard.

---

## Architecture Summary

```text
/course (Public)          -> Sales Landing Page (Hero, Curriculum, Pricing)
/auth (Public)            -> Authentication (Sign Up / Login)
/dashboard (Private)      -> Member Dashboard Hub
/dashboard/courses        -> Course Content (Tier-gated)
/dashboard/ar-scanner     -> AR Scanner & Downloads
/dashboard/arcade         -> Games & Worlds
/dashboard/assessments    -> Quizzes & Assignments
/dashboard/resources      -> PDF Downloads & Worksheets
/dashboard/community      -> Social Feed
```

---

## Phase 1: Database Schema Setup

### 1.1 Create Required Tables

**profiles table** - Store user profile data
- `id` (uuid, references auth.users)
- `email` (text)
- `display_name` (text)
- `avatar_url` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**user_roles table** - Separate role management (security best practice)
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `role` (enum: 'admin', 'member', 'guest')

**subscriptions table** - Track course tier subscriptions
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `tier` (enum: 'single_tool', 'power_suite')
- `status` (enum: 'active', 'cancelled', 'expired')
- `current_period_start` (timestamp)
- `current_period_end` (timestamp)
- `stripe_subscription_id` (text, nullable)
- `created_at` (timestamp)

### 1.2 Enable RLS Policies
- Profiles: Users can only read/update their own profile
- Subscriptions: Users can only read their own subscription
- User roles: Read-only via security definer function

---

## Phase 2: Authentication System

### 2.1 Create Auth Page (`src/pages/Auth.tsx`)
- Combined Login/Signup form using existing Nebula HUD design
- Email/password authentication with Supabase Auth
- Form validation using zod
- Error handling with user-friendly messages
- Auto-redirect to dashboard after authentication
- Uses HUDPanel, HUDButton components for consistent styling

### 2.2 Create Auth Context (`src/contexts/AuthContext.tsx`)
- Global auth state management
- `onAuthStateChange` listener setup
- Session persistence
- Provides: user, session, loading, signIn, signUp, signOut

### 2.3 Create Protected Route Component (`src/components/ProtectedRoute.tsx`)
- Wraps private routes
- Redirects unauthenticated users to /auth
- Shows loading state during auth check

### 2.4 Update Navigation (`src/components/hud/HUDNav.tsx`)
- Add "Sign Up" button (visible when logged out)
- Show user avatar + "Dashboard" link (visible when logged in)
- Sign out functionality

---

## Phase 3: Public Sales Landing Page

### 3.1 Rebuild Course.tsx as Sales Page

**Hero Section**
- Headline: "Future-Proof Your Child's Skills with AI"
- Subheadline: "Empower your child to learn smarter, faster, and have more fun with AI-powered education"
- Eye-catching visual (can use existing dragon egg asset with AI theme overlay)
- Primary CTA: "Start Learning Today"

**Value Proposition Section**
- "Why AI Education Matters" - 3 benefit cards:
  1. Learn Smarter & Faster - AI adapts to your child's learning pace
  2. Build Future-Ready Skills - Master the tools shaping tomorrow
  3. Fun & Engaging - Gamified learning that kids actually enjoy

**Curriculum Overview Section**
- Learning Objectives highlights
- Module/Lesson preview cards showing what's included:
  - Module 1: Introduction to AI Tools
  - Module 2: Prompt Engineering Basics
  - Module 3: AI for Homework & Research
  - Module 4: Creative AI Projects
  - Module 5: Advanced Custom AI Training (Power Suite only)

**Pricing Section (Bottom)**
- Two pricing cards with HUDPanel styling:

**Tier 1: Single Tool Mastery - $20/month**
- Description: "Focus on mastering one AI tool at a time"
- Features: Access to one learning track, Weekly lessons, Basic assessments
- CTA Button: "Get Started" -> Redirects to /auth with tier param

**Tier 2: AI Power Suite - $50/month**
- Description: "Complete AI education package"
- Three tracks included:
  1. Learn Smarter & Faster with AI
  2. AI Tools & Prompt Engineering
  3. Custom AI Training (Train your own models)
- Features: All tracks, Unlimited access, Priority support, Certificate of completion
- CTA Button: "Unlock Full Access" -> Redirects to /auth with tier param
- Badge: "MOST POPULAR" or "BEST VALUE"

---

## Phase 4: Member Dashboard

### 4.1 Dashboard Layout (`src/pages/Dashboard.tsx`)
- Sidebar navigation using existing HUD components
- Main content area
- User profile summary in header
- Responsive design (sidebar collapses on mobile)

### 4.2 Dashboard Modules (Sub-pages)

**4.2.1 Course Content (`src/pages/dashboard/Courses.tsx`)**
- Shows enrolled course modules
- LockOverlay for unpaid content
- Tier-based visibility:
  - $20 tier: Single track unlocked, others locked/blurred
  - $50 tier: All tracks unlocked
- Progress tracking per module
- Lesson list with completion status

**4.2.2 AR Scanner & Downloads (`src/pages/dashboard/ARScanner.tsx`)**
- "Scan blocks to watch them come alive" messaging
- Download AR markers section (PDF download cards)
- Instructions for AR experience
- Links to scan functionality

**4.2.3 The Arcade (`src/pages/dashboard/Arcade.tsx`)**
- Games section with game cards
- "Discover Worlds" feature area
- Uses HoloIcon components for game icons
- Progress/achievement tracking

**4.2.4 Assessment Center (`src/pages/dashboard/Assessments.tsx`)**
- Quiz list with status (Not Started, In Progress, Completed)
- Assignment submissions
- Scores and feedback display
- LockOverlay for assessments tied to locked modules

**4.2.5 Resource Library (`src/pages/dashboard/Resources.tsx`)**
- Downloadable PDFs and worksheets
- Organized by module/topic
- File cards with download buttons
- File type icons

**4.2.6 Social Hub (`src/pages/dashboard/Community.tsx`)**
- Social feed component
- Community updates display
- User-generated content cards
- Engagement features (like, comment placeholders)

---

## Phase 5: Route Configuration

### 5.1 Update App.tsx Routes
```text
/course              -> CourseSales (public)
/auth                -> Auth (public)
/dashboard           -> Dashboard (protected)
/dashboard/courses   -> Courses (protected)
/dashboard/ar        -> ARScanner (protected)
/dashboard/arcade    -> Arcade (protected)
/dashboard/assessments -> Assessments (protected)
/dashboard/resources -> Resources (protected)
/dashboard/community -> Community (protected)
```

### 5.2 Remove Old Course Sub-routes
- Remove /course/module/:id
- Remove /course/lesson/:slug
- Remove /course/assessment/:slug
- Remove /course/ai (AI companion now part of member dashboard)

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/pages/Auth.tsx` | Login/Signup page |
| `src/pages/Dashboard.tsx` | Main dashboard layout |
| `src/pages/dashboard/Courses.tsx` | Course content module |
| `src/pages/dashboard/ARScanner.tsx` | AR scanner & downloads |
| `src/pages/dashboard/Arcade.tsx` | Games & Worlds |
| `src/pages/dashboard/Assessments.tsx` | Quizzes & assignments |
| `src/pages/dashboard/Resources.tsx` | PDF downloads |
| `src/pages/dashboard/Community.tsx` | Social feed |
| `src/contexts/AuthContext.tsx` | Auth state management |
| `src/components/ProtectedRoute.tsx` | Route protection |
| `src/components/dashboard/DashboardSidebar.tsx` | Dashboard navigation |
| `src/hooks/useSubscription.ts` | Subscription status hook |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Course.tsx` | Complete rewrite to sales landing page |
| `src/components/hud/HUDNav.tsx` | Add Sign Up button + auth state handling |
| `src/App.tsx` | Wrap with AuthProvider, add new routes, remove old course routes |

---

## Database Migrations Required

1. Create `app_role` enum type
2. Create `subscription_tier` and `subscription_status` enum types
3. Create `profiles` table with RLS
4. Create `user_roles` table with RLS
5. Create `subscriptions` table with RLS
6. Create `has_role` security definer function
7. Create trigger for auto-creating profile on user signup

---

## Technical Implementation Notes

### Authentication Flow
1. User clicks pricing CTA on sales page
2. Redirect to /auth with `?tier=single_tool` or `?tier=power_suite` query param
3. User creates account
4. Supabase Auth trigger creates profile
5. Redirect to /dashboard
6. Dashboard checks subscription status to determine content access

### Subscription Gating Logic
- On dashboard load, query user's subscription
- If no active subscription: show upgrade prompt, lock course content
- If Tier 1 ($20): unlock single track, lock others
- If Tier 2 ($50): unlock all content

### Component Reuse
- All new pages use existing Nebula HUD design system
- HUDPanel, HUDButton, HoloIcon, LockOverlay, HUDProgressBar
- Consistent spacing, typography, and glow effects

---

## Expected Outcomes
- Clear sales funnel converting visitors to members
- Secure authentication with email/password
- Role-based access to dashboard content
- Tier-gated course access ($20 vs $50 plans)
- Organized member dashboard with 6 distinct modules
- Consistent Nebula HUD visual identity throughout

