# Sanity Template Options for Mercy House

## Recommended Templates

### 1. Schema UI (PERFECT MATCH - YOUR EXACT STACK!)
**Next.js 15 + Tailwind CSS + shadcn/ui + Sanity - EXACTLY what you have!**

- **Stack**: Next.js 15 + Tailwind CSS + shadcn/ui + Sanity (100% matches your stack!)
- **Cost**: Open-source
- **Website**: https://schemaui.com/
- **Demo**: https://starter.schemaui.com
- **Sanity Page**: https://www.sanity.io/templates/schema-ui

**Why This Is THE BEST Match**:
- Uses the EXACT same stack you already have (Next.js, Tailwind, shadcn/ui, Sanity)
- 20+ production-tested components
- 99+ Lighthouse scores (performance, SEO, accessibility)
- Built-in light/dark mode support
- 70+ blocks from shadcnblocks.com
- Preconfigured Sanity schemas and queries
- Static Site Generation with on-demand revalidation
- Professional nonprofit-friendly design

**Visual Design**:
- Modern, minimalist aesthetic
- Clean typography with Inter font
- Grid-based responsive layouts
- Rounded corners, subtle shadows
- Generous white space
- High contrast for accessibility
- Smooth transitions and animations

**Installation**:
Installation instructions on https://schemaui.com/

**What You Can Extract**:
- Complete component library (already shadcn/ui like yours!)
- Color schemes and design tokens
- Sanity schema patterns
- Page builder blocks
- Typography system
- Layout components

---

### 2. SanityPress (ALSO GREAT - FREE)
**Another excellent Tailwind option**

- **Stack**: Next.js 15/16 + Tailwind CSS
- **Cost**: Free and open-source (MIT license)
- **GitHub**: https://github.com/nuotsu/sanitypress
- **Stars**: 400+

**Why This Works**:
- Uses Tailwind CSS (matches your setup)
- Pre-built components and schemas ready to adapt
- Perfect Lighthouse scores out of the box
- Visual editing with embedded Sanity Studio
- Well-maintained and actively developed

**Installation**:
```bash
# In a temporary directory to review the code
npm create sanity@latest -- --template nuotsu/sanitypress
```

**What You Can Extract**:
- Component styles and color schemes
- Page builder patterns
- Sanity schema structures
- Tailwind configuration for colors/typography
- Pre-built sections (hero, CTA, content blocks, etc.)

**Adaptation Strategy**:
1. Clone template to review structure
2. Copy color scheme from `tailwind.config.ts`
3. Adapt component styles to your existing components
4. Import useful schema patterns
5. Keep your existing form system

---

### 2. Aiding - Nonprofit Template (PAID - NONPROFIT SPECIFIC)
**Built specifically for charities and nonprofits**

- **Stack**: Next.js 14 + Bootstrap 5 (NOT Tailwind)
- **Cost**: $20 (Personal), $49 (Commercial), $79 (Agency)
- **Demo**: https://adding-hearts.vercel.app/
- **Purchase**: https://webbytemplate.com/product/aiding-donation-nonprofit-website-nextjs-template

**Features**:
- Donation form UI (ready-made)
- Campaign pages
- 11 desktop + 11 mobile screen designs
- SEO-optimized
- Responsive design

**Why Consider It**:
- Purpose-built for nonprofits like Mercy House
- Includes donation-specific UI components
- Professional nonprofit visual design

**Challenges**:
- Uses Bootstrap instead of Tailwind (would need conversion)
- Paid template (though affordable)
- Less flexibility than SanityPress

**If You Choose This**:
You'll need to convert Bootstrap styles to Tailwind, but you get nonprofit-specific design patterns and donation flows.

---

### 3. Clean Next.js + Sanity (OFFICIAL - FREE)
**Official Sanity template**

- **Stack**: Next.js + Tailwind CSS + Sanity
- **Cost**: Free (official Sanity template)
- **GitHub**: https://github.com/sanity-io/template-nextjs-clean
- **Install**: Via Sanity CLI or Vercel

**Features**:
- Visual editing with Presentation tool
- Live content API
- Blog-focused structure
- Official support from Sanity team

**Best For**:
- Starting fresh
- Learning Sanity best practices
- Blog-heavy sites

**Why Maybe Not**:
- More basic/minimal than SanityPress
- Less comprehensive component library
- You already have a site built

---

## My Recommendation: Schema UI

**Why Schema UI is THE PERFECT choice for your project**:

1. **EXACT Stack Match**: Next.js 15 + Tailwind + shadcn/ui + Sanity (literally your exact stack!)
2. **No Conversion Needed**: Components are already shadcn/ui, just drop them in
3. **Production-Ready**: 99+ Lighthouse scores, built by agency with 5+ years Sanity experience
4. **70+ Blocks**: Massive component library ready to use
5. **Professional Design**: Modern, clean aesthetic perfect for nonprofits
6. **Easy Extraction**: Copy components directly since they're already compatible

**Backup Option: SanityPress** if Schema UI doesn't have a specific feature you need.

---

## Implementation Strategy

### Option A: Extract Design System from Schema UI (Recommended)
Keep your existing site structure, extract components and styles from Schema UI:

1. **Get Schema UI** (check installation docs at https://schemaui.com/):
   ```bash
   # Follow their installation instructions
   # Likely similar to:
   npx create-next-app -e https://github.com/schemaui/starter
   ```

2. **Review and extract**:
   - Open `tailwind.config.ts` - copy color scheme
   - Review `app/globals.css` - copy design tokens
   - Copy shadcn/ui components from `components/ui/` (already compatible!)
   - Inspect page sections in `components/` - copy blocks you like
   - Check Sanity schemas in `sanity/schemas/` - import useful patterns

3. **Apply to Mercy House site**:
   - Update `tailwind.config.ts` with new colors
   - Modify `app/globals.css` with new design tokens
   - Copy shadcn/ui components directly (no conversion needed!)
   - Import Sanity schema patterns
   - Test with `npm run dev`

### Option B: Rebuild on Template (More Work)
Start with SanityPress template and migrate your content:

1. Set up new SanityPress project
2. Migrate your Sanity schemas
3. Rebuild your custom forms
4. Import content from existing Sanity dataset
5. Redeploy

**Time Estimate**: Option A = 4-8 hours | Option B = 2-3 days

---

## Quick Start: Explore Schema UI

Want to see the design right now? Here's how:

1. **Visit the live demo**: https://starter.schemaui.com
2. **Explore components**: Browse the site and inspect elements (right-click → Inspect)
3. **Check documentation**: Visit https://schemaui.com/ for setup instructions
4. **Install locally**:
   ```bash
   # Follow instructions at schemaui.com
   # Then:
   npm run dev

   # Open http://localhost:3000
   # Review components in components/ui/ (these are shadcn/ui!)
   # Check tailwind.config.ts and app/globals.css
   ```

Since Schema UI uses the exact same stack as your site, components can be copied directly!

---

## Alternative: Browse Sanity Exchange

If none of these feel right, browse more templates:
- **Sanity Exchange**: https://www.sanity.io/exchange/type=templates/framework=nextjs
- **Vercel Templates**: https://vercel.com/templates/sanity

Filter by:
- Framework: Next.js
- Type: Templates
- Category: Content-driven sites

---

## Next Steps

1. **Visit Schema UI demo**: https://starter.schemaui.com (see it live right now!)
2. **Install Schema UI**: Follow instructions at https://schemaui.com/
3. **Extract what you like**:
   - Color scheme from `tailwind.config.ts`
   - Components from `components/ui/` (already shadcn/ui!)
   - Page blocks from `components/`
   - Sanity schemas from `sanity/schemas/`
4. **Apply to Mercy House**: Copy components and styles directly
5. **Test**: Run `npm run dev` and verify visual improvements
6. **Deploy**: Push to Vercel once satisfied

**The beauty of Schema UI**: Since it uses your EXACT stack, you can literally copy/paste components with minimal modification. No conversion needed!

Need help with any of these steps? Let me know!
