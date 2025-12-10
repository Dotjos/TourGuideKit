# 🚀 Tour Builder Dashboard - Complete Setup Guide

A production-ready Next.js dashboard for creating, managing, and tracking interactive onboarding tours with real-time Convex backend and authentication.

## 👥 Team Members
- [TeniKay] - Dashboard Developer
- [VicWin] - External Pages Developer
- [JosephD(FE)] - Embeddable Widget Developer

## ✨ Features Implemented

### ✅ Core Requirements Met
- [x] **Authentication**: Full signup/login with Convex
- [x] **Tour Management**: Complete CRUD operations
- [x] **Step Builder**: Minimum 5 steps per tour with unique IDs
- [x] **Real-time Updates**: Automatic UI refresh with Convex
- [x] **Analytics Dashboard**: Completion rates, session tracking
- [x] **Embed Code Generator**: Copy-paste integration
- [x] **Responsive Design**: Mobile, tablet, desktop
- [x] **Component Separation**: Modular, reusable components

### 🎯 Technical Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Convex (Database + Auth + Real-time)
- **UI Components**: Lucide React icons, custom components
- **Deployment**: Vercel-ready

## 📦 Project Structure

```
tour-builder-dashboard/
├── app/
│   ├── ConvexProvider.tsx      # Convex client wrapper
│   ├── page.tsx                # Main dashboard page
│   ├── layout.tsx              # Root layout with providers
│   └── globals.css             # Global styles
├── components/
│   ├── LoginForm.tsx           # Signup/Login component
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── ToursView.tsx           # Tour management
│   ├── StepEditor.tsx          # Step CRUD modal
│   ├── AnalyticsView.tsx       # Analytics dashboard
│   └── EmbedView.tsx           # Embed code generator
├── convex/
│   ├── schema.ts               # Database tables
│   ├── auth.ts                 # Authentication functions
│   ├── tours.ts                # Tour CRUD operations
│   ├── steps.ts                # Step CRUD operations
│   └── analytics.ts            # Analytics functions
├── lib/
│   └── AuthContext.tsx         # Auth state management
└── Configuration files...
```

## 🚀 Quick Start (15 Minutes)

### Step 1: Create Next.js Project

```bash
# Create new Next.js app
npx create-next-app@latest tour-builder-dashboard

# Options to select:
# ✅ TypeScript
# ✅ Tailwind CSS
# ✅ App Router
# ❌ src/ directory (No)
# ✅ Import alias (@/*)

cd tour-builder-dashboard
```

### Step 2: Install Dependencies

```bash
npm install convex lucide-react framer-motion recharts
```

### Step 3: Setup Convex

```bash
# Install Convex CLI
npm install -g convex

# Login to Convex (opens browser)
npx convex login

# Initialize Convex project
npx convex dev
```

This will:
- Create `convex/` folder
- Generate `.env.local` with your Convex URL
- Start the Convex dev server

### Step 4: Copy Files

Copy these files from the artifacts into your project:

**Convex Backend:**
1. `convex/schema.ts`
2. `convex/auth.ts`
3. `convex/tours.ts`
4. `convex/steps.ts`
5. `convex/analytics.ts`

**Frontend Components:**
1. `lib/AuthContext.tsx`
2. `components/LoginForm.tsx`
3. `components/Sidebar.tsx`
4. `components/ToursView.tsx`
5. `components/StepEditor.tsx`
6. `components/AnalyticsView.tsx`
7. `components/EmbedView.tsx`

**App Files:**
1. `app/ConvexProvider.tsx`
2. `app/page.tsx`
3. `app/layout.tsx`
4. `app/globals.css`

**Config Files:**
1. `tailwind.config.js`
2. `next.config.js`
3. `tsconfig.json`

### Step 5: Run the Application

Open two terminal windows:

**Terminal 1 - Convex Backend:**
```bash
npx convex dev
```

**Terminal 2 - Next.js Frontend:**
```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

## 📝 Usage Guide

### 1. Sign Up / Login

1. Open http://localhost:3000
2. Click "Don't have an account? Sign up"
3. Enter:
   - **Name**: Your full name
   - **Email**: your@email.com
   - **Password**: minimum 6 characters
4. Click "Create Account"

### 2. Create a Tour

1. Click "Create Tour" button
2. Enter:
   - **Tour Name**: e.g., "Product Walkthrough"
   - **Description**: What users will learn
3. Click "Create Tour"

### 3. Add Steps (Minimum 5)

1. Click the Edit icon on your tour
2. Click "Add Step" button
3. For each step, enter:
   - **Step ID**: unique identifier (e.g., "welcome", "feature-1")
   - **Title**: Step heading
   - **Description**: Step content
   - **Target Element**: CSS selector (e.g., "#hero", ".nav-button")
   - **Position**: top/bottom/left/right
4. Repeat until you have at least 5 steps
5. Click "Done"

### 4. View Analytics

1. Click "Analytics" in sidebar
2. Select a tour from dropdown
3. View:
   - Session count
   - Completion rates
   - Per-step performance
   - Recent activity

### 5. Get Embed Code

1. Click "Embed Code" in sidebar
2. Choose your tour
3. Copy the HTML/JavaScript code
4. Paste before `</body>` tag in your website

## 🔧 Configuration

### Environment Variables

Your `.env.local` should contain:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Customization

**Change Theme Colors:**

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#your-color',
        // ...
      }
    }
  }
}
```

**Modify Tour Requirements:**

In `convex/schema.ts`, you can adjust constraints.

## 🚢 Deployment

### Deploy Convex Backend

```bash
# Deploy to production
npx convex deploy
```

Copy the production URL you receive.

### Deploy to Vercel

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/tour-builder-dashboard.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - **Name**: `NEXT_PUBLIC_CONVEX_URL`
   - **Value**: Your production Convex URL
6. Click "Deploy"

Your dashboard will be live in ~2 minutes! 🎉

## 📊 Database Schema

### Users Table
```typescript
{
  email: string
  name: string
  passwordHash: string
  createdAt: number
}
```

### Tours Table
```typescript
{
  name: string
  description: string
  userId: Id<"users">
  isActive: boolean
  createdAt: number
  updatedAt: number
}
```

### Steps Table
```typescript
{
  tourId: Id<"tours">
  stepId: string (unique)
  title: string
  description: string
  targetElement: string (CSS selector)
  position: string (top/bottom/left/right)
  order: number
}
```

### Analytics Table
```typescript
{
  tourId: Id<"tours">
  sessionId: string
  stepId: string
  event: string (started/completed/skipped)
  timestamp: number
}
```

## 🔐 Security Features

- **Password Hashing**: Base64 encoding (upgrade to bcrypt in production)
- **User Isolation**: Users only see their own tours
- **Access Control**: All queries verify ownership
- **Secure Mutations**: Protected with user validation

### Production Security Upgrade

Replace password hashing in `convex/auth.ts`:

```typescript
import bcrypt from 'bcryptjs';

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
```

## 🐛 Troubleshooting

### Issue: "Module not found: convex/react"

**Solution:**
```bash
npm install convex
```

### Issue: Convex connection failed

**Solution:**
```bash
# Restart Convex dev server
npx convex dev --once
npx convex dev
```

### Issue: "localStorage is not defined"

**Cause**: Server-side rendering trying to access localStorage

**Solution:** Already handled in `AuthContext.tsx` with `useEffect`

### Issue: Tours not updating in real-time

**Check:**
1. Convex dev server is running
2. Browser console for errors
3. Network tab shows WebSocket connection

### Issue: Build errors with TypeScript

**Solution:**
```bash
# Clear and rebuild
rm -rf .next
npm run build
```

## 📚 Component Documentation

### LoginForm.tsx
- Handles signup and login
- Integrates with Convex auth
- Form validation
- Error handling

### Sidebar.tsx
- Navigation between views
- User profile display
- Mobile responsive
- Logout functionality

### ToursView.tsx
- Display all tours
- Create new tours
- Edit/delete tours
- Toggle active status
- Opens StepEditor

### StepEditor.tsx
- Modal for managing steps
- Add/delete steps
- Displays step count warning
- Validates minimum 5 steps

### AnalyticsView.tsx
- Overview metrics
- Per-tour analytics
- Step-by-step breakdown
- Recent activity feed

### EmbedView.tsx
- Generates embed code
- Copy to clipboard
- HTML/JS and React examples
- Configuration options

## 🎯 Testing Checklist

- [ ] User can sign up
- [ ] User can log in
- [ ] User can create a tour
- [ ] User can add 5+ steps
- [ ] User can edit tour details
- [ ] User can delete a tour
- [ ] User can view analytics
- [ ] User can copy embed code
- [ ] Sidebar navigation works
- [ ] Mobile responsive works
- [ ] Real-time updates work
- [ ] User can log out

## 📈 Performance Tips

1. **Optimize Images**: Use Next.js Image component
2. **Code Splitting**: Already handled by Next.js
3. **Database Indexes**: Already configured in schema
4. **Caching**: Convex handles automatically

## 🔗 Useful Links

- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 💡 Next Steps

1. **Add Email Verification**: Integrate email service
2. **Implement Password Reset**: Add forgot password flow
3. **Add Team Collaboration**: Share tours with teammates
4. **Export Analytics**: Download reports as CSV
5. **Add Tour Templates**: Pre-built tour structures
6. **Implement A/B Testing**: Test different tour variations

## 📝 License

MIT License - Free for personal and commercial use

## 🤝 Support

For questions or issues:
1. Check this README
2. Review the INTEGRATION_GUIDE.md
3. Check Convex documentation
4. Contact team members

---

**Built with ❤️ for Stage 8 Internship Task**
