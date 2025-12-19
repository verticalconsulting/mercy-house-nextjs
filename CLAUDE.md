# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application for Mercy House Adult & Teen Challenge, a recovery center in Mississippi. It replaces a legacy WordPress/Divi site with a modern, high-performance stack featuring:
- Sanity CMS for content management
- Type-safe form handling with Zod validation
- Gmail SMTP email delivery
- Google Analytics 4 tracking
- shadcn/ui component library

## Development Commands

```bash
# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI)
- **CMS**: Sanity 3.21.1 (Studio at /studio)
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer with Gmail SMTP
- **Hosting**: Vercel (assumed)

## Architecture Patterns

### App Router Structure

The application uses Next.js App Router with route groups:

- `app/(site)/` - Public-facing pages with Header/Footer layout
- `app/api/forms/` - Form submission API routes
- `app/studio/` - Sanity Studio (CMS interface at /studio route)

### Form System Architecture

The form system is designed with these key principles:
1. **Zero data loss** - Email failures don't block submission success
2. **Swappable providers** - Email provider interface allows switching from Gmail to SendGrid/SES
3. **Future Google Sheets integration** - Schema supports `enableGoogleSheets`, `googleSheetId`, `googleSheetTab` fields
4. **Dual email flow** - Admin notification + user welcome email
5. **Type safety** - Zod schemas in `lib/validation/forms.ts` validate both client and server

#### Form Implementation Pattern

Each form follows this structure:
1. **Validation schema**: `lib/validation/forms.ts` (e.g., `contactFormSchema`)
2. **Form component**: `components/forms/` (e.g., `ContactForm.tsx`)
3. **API route**: `app/api/forms/[formName]/route.ts` (POST handler)
4. **Sanity config**: `formConfig` document with recipients

Current forms:
- Contact (`/api/forms/contact`)
- Get Help - intake form with substance use history
- Vehicle Donation (`/donate-a-car`)
- Volunteer

#### Email Provider Pattern

Email providers implement the `EmailProvider` interface:
```typescript
interface EmailProvider {
  send(params: EmailParams): Promise<EmailResult>
}
```

Current provider: `GmailProvider` in `lib/email/providers/gmail.ts`

To swap providers, implement the interface and update the API routes. Environment variables:
- `GMAIL_USER` - Gmail address
- `GMAIL_APP_PASSWORD` - 16-character App Password (not regular password)

### Sanity CMS Integration

#### Schema Organization

Schemas are organized in `schemas/`:
- **documents/** - Top-level content types (page, post, program, formConfig)
- **objects/** - Reusable components (hero, videoHero, ctaSection, testimonial, faq, contentBlock, seo)
- **settings/** - Singleton documents (siteSettings, navigation, donationSettings)

All schemas are registered in `schemas/index.ts` and exported as `schemaTypes`.

#### Studio Configuration

`sanity.config.ts` configures:
- Custom desk structure grouping content logically
- Vision plugin for GROQ queries
- Project ID and dataset from environment variables

#### Key Sanity Patterns

**Form Configuration**: The `formConfig` schema stores:
- Email recipients per form
- Success messages
- Google Sheets integration settings (future)
- Form field definitions (for dynamic forms)

**Page Builder**: Pages use reusable block objects (hero, videoHero, contentBlock, etc.) for flexible content editing.

### Component Architecture

Components follow shadcn/ui patterns:
- **components/ui/** - Base components from shadcn/ui (button, input, textarea, select, etc.)
- **components/forms/** - Form components using React Hook Form
- **components/blocks/** - Page section components (VideoHero, ThreeStepProcess, WhyMercyHouse, FAQ, StickyMobileCTA)
- **components/layout/** - Layout components (Header, Footer)

All UI components use `cn()` utility from `lib/utils.ts` for Tailwind class merging.

## Environment Variables

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually "production") |
| `SANITY_API_TOKEN` | Sanity API token for write access |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16 chars, not regular password) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GIVEVIRTUOUS_URL` | Donation platform URL |

## URL Redirects

The following redirects are configured in `next.config.js` for WordPress migration:
- `/superthrift` → `/our-thrift-store`
- `/thrift-store` → `/our-thrift-store`
- `/vehicle-donate` → `/donate-a-car`
- `/donations` → `/donate`

These are 301 permanent redirects to preserve SEO from the old WordPress site.

## Key Implementation Details

### Adding a New Form

1. Create Zod schema in `lib/validation/forms.ts`:
   ```typescript
   export const myFormSchema = z.object({
     name: z.string().min(2),
     email: z.string().email(),
   })
   export type MyFormData = z.infer<typeof myFormSchema>
   ```

2. Create form component in `components/forms/MyForm.tsx` using React Hook Form:
   ```typescript
   const form = useForm<MyFormData>({
     resolver: zodResolver(myFormSchema),
   })
   ```

3. Create API route at `app/api/forms/my-form/route.ts`:
   - Parse and validate with schema
   - Send admin notification email
   - Send user welcome email (optional)
   - Return success response

4. Configure recipients in Sanity Studio under Form Configurations

### Email Template Pattern

Templates are in `lib/email/templates.ts`:
- `generateFormSubmissionEmail(submission)` - Admin notification
- `generateWelcomeEmail(name)` - User confirmation

Both return `{ html, text }` for HTML and plain text versions.

### Sanity Client Usage

The application uses `@sanity/client` and `next-sanity` for fetching content. Typical pattern:
```typescript
import { client } from '@/lib/sanity/client'

const data = await client.fetch(query, params)
```

Configuration is in `sanity.config.ts`.

## Migration Context

This project replaces a WordPress site with Divi theme. Key migration requirements:
- **5x faster page loads** vs WordPress
- **Staff-editable content** through Sanity Studio
- **Secure form handling** with zero data loss
- **Optimized donation flows** with conversion tracking
- **Mobile-first responsive design**

The codebase is designed to be maintained by the nonprofit organization with limited technical resources, hence the emphasis on:
- Clear separation of concerns
- Well-documented patterns
- Swappable integrations (email providers)
- Future-ready architecture (Google Sheets integration)

## Testing and Validation

- All forms use Zod for runtime validation on both client and server
- Form submissions log to console for debugging (should be removed in production per TODO comments)
- Email delivery failures are logged but don't block form submission success
- API routes include OPTIONS handlers for CORS support
