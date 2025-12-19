# Sanity Studio Setup Guide

This project uses a **separate Sanity Studio** deployment for content management, following production best practices.

## Why Separate Studio?

- ✅ **Performance**: Removes ~2MB of Studio code from production bundle
- ✅ **Reliability**: Prevents build conflicts between Next.js and Sanity
- ✅ **Free Hosting**: Sanity provides free Studio hosting
- ✅ **Better UX**: Dedicated CMS interface for staff

## Option 1: Sanity-Hosted Studio (Recommended)

### Access Your Studio

Your Studio is automatically hosted by Sanity at:
```
https://[your-project-name].sanity.studio
```

### Setup Steps

1. **Deploy your schema to Sanity**:
   ```bash
   npx sanity deploy
   ```
   This command will:
   - Build your Studio
   - Deploy it to Sanity's hosting
   - Provide you with the Studio URL

2. **Add CORS origins** (if needed):
   ```bash
   npx sanity cors add https://[your-project-name].sanity.studio --credentials
   ```

3. **Share the URL** with your team - they can access it immediately with their Sanity accounts

### Managing Access

1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to "Project members"
4. Invite team members by email

## Option 2: Run Studio Locally

For development or testing, you can run the Studio locally:

```bash
# Start the Studio development server
npx sanity dev
```

This will start the Studio at `http://localhost:3333`

## Environment Variables

Your Next.js app needs these variables to fetch content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here  # For write operations if needed
```

## Content Management Workflow

1. **Edit Content**: Staff logs into the Studio URL
2. **Create/Edit Documents**: Use the Studio interface to manage content
3. **Publish**: Click "Publish" in the Studio
4. **Next.js Fetches**: Your Next.js app fetches the published content via the Sanity client

## Troubleshooting

### Can't access Studio URL
- Ensure you've run `npx sanity deploy`
- Check that your project ID is correct in `sanity.config.ts`

### CORS errors when accessing Studio
- Add CORS origins: `npx sanity cors add [your-studio-url] --credentials`

### Changes not showing in Next.js app
- Check that content is **published** (not just draft) in Studio
- Verify API token has correct permissions
- Clear Next.js cache: `rm -rf .next && npm run build`

## Production Deployment Checklist

- [ ] Deploy Studio: `npx sanity deploy`
- [ ] Configure CORS for Studio domain
- [ ] Set environment variables in Vercel/hosting platform
- [ ] Invite team members to Sanity project
- [ ] Document the Studio URL for your team

## Schema Updates

When you update schemas in `schemas/`:

1. **Local development**:
   ```bash
   # Schema changes are hot-reloaded automatically
   npx sanity dev
   ```

2. **Production**:
   ```bash
   # Deploy updated Studio with new schemas
   npx sanity deploy
   ```

## Additional Resources

- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
- [Managing Projects](https://www.sanity.io/docs/projects)
- [CORS Configuration](https://www.sanity.io/docs/cors)
