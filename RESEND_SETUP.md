# Resend Email Setup Instructions

## Quick Setup (5 minutes)

### 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### 2. Get Your API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it something like "AMS Law Website"
4. Copy the API key (starts with `re_`)

### 3. Create Environment Variables File

Create a file named `.env.local` in the root of your project:

```bash
# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Email address where contact form submissions will be sent
CONTACT_EMAIL=anna@schneiderlaw.com
```

**Important:** Replace the values with:
- Your actual Resend API key
- The email address where you want to receive contact form submissions

### 4. Verify Your Domain (Optional but Recommended)

For the free tier, you can use Resend's default sending domain (`onboarding@resend.dev`), but emails will be more professional from your own domain.

To use your own domain:

1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `schneiderlaw.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)
6. Update the API route to use your domain:

In `src/app/api/contact/route.ts`, change:
```typescript
from: 'AMS Law Contact Form <onboarding@resend.dev>',
```
to:
```typescript
from: 'AMS Law Contact Form <contact@yourdomain.com>',
```

### 5. Test It Out

1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email!

## Troubleshooting

### "Failed to send email" error
- Check that your `.env.local` file exists and has the correct API key
- Restart your dev server after creating/updating `.env.local`
- Verify your API key is active in the Resend dashboard

### Not receiving emails
- Check your spam folder
- Verify the `CONTACT_EMAIL` in `.env.local` is correct
- Check the Resend dashboard [Emails](https://resend.com/emails) to see if they're being sent

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add the environment variables in your hosting provider's dashboard
2. Don't commit `.env.local` to git (it's already in .gitignore)
3. Make sure you've verified your domain for better deliverability

## Cost

- **Free tier**: 100 emails/day, 3,000 emails/month
- For a law firm contact form, this should be more than enough
- If you need more, paid plans start at $20/month for 50,000 emails

## Security Notes

- Never commit your `.env.local` file to git
- The API key is server-side only (Next.js API route)
- Users cannot see or access your API key from the browser

