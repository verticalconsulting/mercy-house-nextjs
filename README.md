# Mercy House Adult & Teen Challenge - Next.js Application

A modern, high-performance website for Mercy House Adult & Teen Challenge, built with Next.js 14, TypeScript, and Sanity CMS.

## Overview

This application replaces the legacy WordPress site with a modern stack that provides:
- **5x faster page loads**
- **Staff-editable content** through Sanity CMS
- **Secure form handling** with zero data loss
- **Optimized donation flows** with conversion tracking
- **Mobile-first responsive design**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity
- **Forms**: React Hook Form + Zod validation
- **Email**: Nodemailer (Gmail SMTP)
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4

## Project Structure

```
mercy-house-nextjs/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public-facing pages
│   ├── api/               # API routes
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   ├── blocks/           # Page sections
│   └── layout/           # Layout components
├── lib/                   # Utilities and services
│   ├── email/            # Email providers
│   ├── validation/       # Zod schemas
│   └── sanity/           # Sanity client
├── schemas/              # Sanity schemas
│   ├── documents/        # Content types
│   ├── objects/          # Reusable objects
│   └── settings/         # Site settings
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Gmail account with App Password enabled
- Sanity account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/mercy-house-nextjs.git
cd mercy-house-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

4. Set up Sanity:
```bash
npm create sanity@latest -- --project-id YOUR_PROJECT_ID --dataset production
```

5. Run development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually "production") |
| `SANITY_API_TOKEN` | Sanity API token for write access |
| `GMAIL_USER` | Gmail address for sending emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16 characters) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GIVEVIRTUOUS_URL` | Donation platform URL |

## Forms System

The application includes a robust form system with:
- **Zod validation** on both client and server
- **Email notifications** to configured recipients
- **Automatic welcome emails** to users
- **Future-ready Google Sheets integration**

### Available Forms

1. **Contact Form** (`/api/forms/contact`)
   - Basic contact information
   - Subject and message fields

2. **Get Help Form** (`/api/forms/get-help`)
   - Comprehensive intake information
   - Program selection
   - Emergency contacts

3. **Vehicle Donation Form** (`/api/forms/donate-car`)
   - Vehicle details
   - Pickup scheduling
   - Tax receipt information

### Adding a New Forms

1. Create validation schema in `lib/validation/forms.ts`
2. Build form component in `components/forms/`
3. Create API route in `app/api/forms/[formName]/`
4. Configure recipients in Sanity

## Sanity CMS

### Studio Access

Access Sanity Studio at `/studio` (requires authentication).

### Content Types

- **Pages**: Dynamic page builder with reusable blocks
- **Programs**: Recovery program details
- **Posts**: Blog/news content
- **Form Configurations**: Form settings and recipients
- **Site Settings**: Global configuration
- **Navigation**: Menu structure
- **Donation Settings**: Donation URLs and options

### Updating Content

1. Log into Sanity Studio
2. Navigate to the content type
3. Make changes
4. Publish to see updates live

## Deployment

### Vercel Deployment

1. Connect GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy:
```bash
vercel --prod
```

### Post-Deployment

1. Update DNS records to point to Vercel
2. Configure custom domain in Vercel
3. Test all forms and donation links
4. Monitor analytics for 48 hours

## Email Configuration

### Gmail App Password Setup

1. Enable 2-factor authentication on Gmail
2. Go to Google Account settings
3. Security → 2-Step Verification → App passwords
4. Generate password for "Mail"
5. Use 16-character password in `GMAIL_APP_PASSWORD`

### Email Recipients

Configure form recipients in Sanity Studio under Form Configurations.

## SEO & Analytics

### SEO Features

- **Dynamic meta tags** per page
- **Open Graph** support
- **XML sitemap** generation
- **301 redirects** from old URLs
- **Structured data** markup

### Analytics Tracking

- Page views
- Form submissions
- Donation clicks
- Scroll depth
- User engagement

## Performance

Target metrics (all green):
- **Lighthouse Score**: 90+ across all categories
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Cumulative Layout Shift**: < 0.1

## Maintenance

### Regular Tasks

- **Weekly**: Check form submissions and email delivery
- **Monthly**: Review analytics and conversion rates
- **Quarterly**: Update dependencies and security patches

### Monitoring

- Set up Vercel monitoring alerts
- Configure uptime monitoring (e.g., UptimeRobot)
- Regular backup of Sanity content

## Troubleshooting

### Forms Not Submitting

1. Check browser console for errors
2. Verify API routes are accessible
3. Check email configuration in environment variables
4. Review server logs in Vercel dashboard

### Email Not Sending

1. Verify Gmail App Password is correct
2. Check Gmail account isn't blocked
3. Review email quotas (500/day for Gmail)
4. Check spam folders

### Content Not Updating

1. Ensure content is published in Sanity
2. Clear Next.js cache
3. Check for build errors
4. Verify API token permissions

## Support

For technical support:
- **Email**: tech@mercyhouseatc.com
- **Documentation**: `/docs` folder
- **Sanity Support**: support@sanity.io

## License

Copyright © 2024 Mercy House Adult & Teen Challenge. All rights reserved.

---

Built with dedication to supporting recovery and transformation in Mississippi.