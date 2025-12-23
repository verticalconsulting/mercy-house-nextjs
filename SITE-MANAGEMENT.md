# Site Management Guide

Quick reference for managing the Mercy House Adult & Teen Challenge website.

## Content Management (Sanity CMS)

### Access the CMS
Navigate to `/studio` (e.g., `https://yourdomain.com/studio` or `http://localhost:3000/studio` in development)

### Content Types

#### Pages
- **Location**: Content → Pages
- **Purpose**: Main site pages (Home, About, Programs, etc.)
- **Key Fields**:
  - Title, slug, SEO metadata
  - Page sections (Hero, Video Hero, Content Blocks, CTAs, FAQs, Testimonials)
- **Adding Content**: Use the "+" button to add sections, drag to reorder

#### Blog Posts
- **Location**: Content → Posts
- **Fields**: Title, slug, author, publish date, featured image, body content, categories

#### Programs
- **Location**: Content → Programs
- **Fields**: Title, description, duration, capacity, images, eligibility requirements

#### Form Configurations
- **Location**: Settings → Form Configurations
- **Purpose**: Configure email recipients for forms
- **Forms Available**: Contact, Get Help, Vehicle Donation, Volunteer
- **Fields**:
  - Form name (must match form ID exactly)
  - Email recipients (admin notifications)
  - Success message
  - Google Sheets settings (future feature)

#### Site Settings
- **Location**: Settings → Site Settings
- **Fields**: Site title, description, contact info, social media links, footer text

#### Navigation
- **Location**: Settings → Navigation
- **Fields**: Header menu items, footer menu sections

#### Donation Settings
- **Location**: Settings → Donation Settings
- **Fields**: Donation platform URL, monthly/one-time amounts, custom messaging

## Design & Styling

### Colors
**File**: `app/globals.css`

Theme colors are defined as CSS custom properties:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* etc. */
}
```

Modify these values to change the site color scheme. Uses HSL format: `hue saturation% lightness%`

### Typography
**File**: `tailwind.config.ts`

Fonts and typography settings:
```typescript
fontFamily: {
  sans: ['var(--font-inter)'],
  heading: ['var(--font-poppins)'],
}
```

### Spacing & Layout
Uses Tailwind CSS utility classes. Common patterns:
- Containers: `container mx-auto px-4`
- Sections: `py-16 lg:py-24`
- Grids: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

## Adding New Pages

### 1. Create Route File
**Location**: `app/(site)/your-page-name/page.tsx`

```typescript
import { client } from '@/lib/sanity/client'

export default async function YourPage() {
  const data = await client.fetch(`
    *[_type == "page" && slug.current == "your-page-name"][0]{
      title,
      sections[]
    }
  `)

  return (
    <main>
      <h1>{data.title}</h1>
      {/* Render sections */}
    </main>
  )
}
```

### 2. Create Page in Sanity
1. Go to `/studio`
2. Content → Pages → Create
3. Add title and slug (must match route: `your-page-name`)
4. Add page sections
5. Publish

### 3. Add to Navigation
1. Settings → Navigation
2. Add menu item with title and link (`/your-page-name`)
3. Publish

## Adding New Forms

### 1. Create Validation Schema
**File**: `lib/validation/forms.ts`

```typescript
export const myFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
})

export type MyFormData = z.infer<typeof myFormSchema>
```

### 2. Create Form Component
**File**: `components/forms/MyForm.tsx`

```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { myFormSchema, type MyFormData } from '@/lib/validation/forms'

export function MyForm() {
  const form = useForm<MyFormData>({
    resolver: zodResolver(myFormSchema),
  })

  async function onSubmit(data: MyFormData) {
    const response = await fetch('/api/forms/my-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    // Handle response
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### 3. Create API Route
**File**: `app/api/forms/my-form/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { myFormSchema } from '@/lib/validation/forms'
import { GmailProvider } from '@/lib/email/providers/gmail'

export async function POST(request: Request) {
  const body = await request.json()
  const validated = myFormSchema.parse(body)

  // Send email notification
  const emailProvider = new GmailProvider()
  await emailProvider.send({
    to: 'admin@mercyhouseatc.com',
    subject: 'New Form Submission',
    html: `<p>Name: ${validated.name}</p>`,
    text: `Name: ${validated.name}`,
  })

  return NextResponse.json({ success: true })
}
```

### 4. Configure in Sanity
1. Settings → Form Configurations → Create
2. Set form name to `my-form` (must match API route)
3. Add email recipients
4. Publish

## Email Configuration

### Provider: Gmail SMTP
**Files**: `lib/email/providers/gmail.ts`

**Required Environment Variables**:
- `GMAIL_USER`: Your Gmail address
- `GMAIL_APP_PASSWORD`: 16-character App Password (not your regular password)

### Creating Gmail App Password
1. Go to Google Account settings
2. Security → 2-Step Verification → App Passwords
3. Generate password for "Mail"
4. Copy 16-character password to `.env.local`

### Switching Email Providers
To use SendGrid, AWS SES, or another provider:
1. Create new provider in `lib/email/providers/`
2. Implement `EmailProvider` interface
3. Update API routes to use new provider

## Analytics & Tracking

### Google Analytics 4
**Environment Variable**: `NEXT_PUBLIC_GA4_ID`

Tracking is configured in `app/layout.tsx`. Events are automatically tracked:
- Page views
- Form submissions
- Donation clicks

### Donation Tracking
**Environment Variable**: `NEXT_PUBLIC_GIVEVIRTUOUS_URL`

Donation buttons link to external platform (GiveVirtuous).

## URL Redirects

**File**: `next.config.js`

WordPress to Next.js redirects:
- `/superthrift` → `/our-thrift-store`
- `/thrift-store` → `/our-thrift-store`
- `/vehicle-donate` → `/donate-a-car`
- `/donations` → `/donate`

To add new redirects:
```javascript
{
  source: '/old-url',
  destination: '/new-url',
  permanent: true, // 301 redirect
}
```

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to `master` branch

### Manual Deployment
```bash
npm run build    # Build production bundle
npm start        # Start production server
```

## Troubleshooting

### Forms Not Sending Email
1. Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env.local`
2. Verify form configuration exists in Sanity with correct form name
3. Check API route logs in terminal

### Content Not Updating
1. Ensure changes are published in Sanity Studio (not just saved)
2. Clear browser cache
3. In development, restart dev server: `npm run dev`

### Styling Not Applying
1. Check Tailwind class names are correct
2. Run `npm run build` to rebuild CSS
3. Verify `tailwind.config.ts` includes all content paths

## Common Tasks

### Change Primary Color
1. Open `app/globals.css`
2. Modify `--primary` HSL values
3. Restart dev server

### Add Social Media Link
1. Settings → Site Settings
2. Add/edit social media links
3. Publish
4. Update `components/layout/Footer.tsx` if new platform

### Update Contact Information
1. Settings → Site Settings
2. Edit phone, email, address
3. Publish

### Add Team Member
1. Content → Team (if schema exists) or create new content type
2. Add photo, name, title, bio
3. Publish

## Support

For technical issues:
- **Development**: See `CLAUDE.md` for architecture details
- **CMS**: Sanity documentation at https://www.sanity.io/docs
- **Framework**: Next.js documentation at https://nextjs.org/docs

For emergency changes, contact your development team.
