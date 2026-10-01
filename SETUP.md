# Going live: setup checklist

Everything is built. These are the accounts and settings only you can create. Do them in order. Each one takes about 5 to 15 minutes.

You will paste a handful of keys into **Vercel → your project → Settings → Environment Variables**. The full list, with what each one is, is in `.env.example`. Never paste keys into chat or into the code.

---

## 1. Supabase (database and logins)

1. Go to **supabase.com**, sign in, click **New project**. Pick a name and a strong database password (save it somewhere).
2. When it is ready, open **SQL Editor → New query**. Paste the entire contents of `supabase/migrations/20261001000000_init.sql` and click **Run**. You should see "Success".
3. Open **Project Settings → API**. Copy these into Vercel:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon / publishable key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role / secret key → `SUPABASE_SERVICE_ROLE_KEY` (keep this one private)
4. Open **Authentication → URL Configuration**:
   - Site URL: your live address, for example `https://yourdomain.com`
   - Redirect URLs: add `https://yourdomain.com/auth/callback` (and your `vercel.app` address with `/auth/callback` too)

### Google sign in

1. In **Google Cloud Console**, create a project, then **APIs & Services → Credentials → Create credentials → OAuth client ID** (type: Web application).
2. Under Authorized redirect URIs, add the callback URL Supabase shows you in **Authentication → Sign In / Providers → Google** (it looks like `https://xxxx.supabase.co/auth/v1/callback`).
3. Paste the Google Client ID and Client Secret into that Supabase Google screen and turn it on.

### Password reset emails

Supabase sends these. Its built-in sender is limited to a few emails an hour, which is fine to start. For real volume, go to **Authentication → Emails → SMTP Settings** and enter your Resend SMTP details (Resend shows them under SMTP).

## 2. Stripe (payments)

1. In **stripe.com**, finish activating your account so you can take real payments.
2. **Developers → API keys**: copy the Secret key into Vercel as `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint**:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed` and `checkout.session.async_payment_succeeded`
   - Copy the Signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`.
4. You do not need to create products in Stripe. The two prices come from `src/config/site.ts` (`PRICES`). Change them there and every screen and checkout follows.

Tip: do a full test first with your **test mode** keys and Stripe's test card `4242 4242 4242 4242`, then swap in the live keys.

## 3. Resend (email)

1. In **resend.com**, add and verify your domain (it gives you DNS records to add where you bought the domain).
2. Create an API key and put it in Vercel as `RESEND_API_KEY`.
3. Set `EMAIL_FROM`, for example `Dominique Jenkins <hello@yourdomain.com>` (must be on the verified domain).

Emails the site sends: purchase receipt, welcome (with a "Create my account" link if they paid before signing up), a new purchase alert to you, every contact or premium message to you (hit reply to answer directly), and your replies from the admin panel.

## 4. The rest of the Vercel variables

| Variable | What to put |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live address, no trailing slash |
| `CLAIM_SECRET` | Any long random string, 32+ characters |
| `ADMIN_EMAILS` | `dsjjenk@gmail.com` (the account that gets the admin panel) |
| `OWNER_EMAIL` | Where messages and purchase alerts go |
| `NEXT_PUBLIC_BOOK_LINK` | Your Calendly link for kickoff calls |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional. Your domain, after you add it in plausible.io |

After adding variables, go to **Deployments** and click **Redeploy** so they take effect.

## 5. Your admin account

Your own account needs access like anyone else's. In the admin panel's **Access codes** tab you can make codes, but you need to be in first. The simplest way: once everything above is set, go to **Supabase → SQL Editor** and run:

```sql
insert into public.access_codes (code, tier, note) values ('HRB-OWNER-0001', 'premium', 'Dominique');
```

Then enter `HRB-OWNER-0001` on the plans page, create your account with the email in `ADMIN_EMAILS`, and you will see **Admin panel** at the bottom of the sidebar (or go to `/admin`).

## 6. Install it on a phone

- **iPhone (Safari):** open the site, tap Share, then **Add to Home Screen**.
- **Android (Chrome):** open the site, tap the menu, then **Install app** (or accept the install banner).

It opens full screen like an app. Steps you have opened before still load with no signal, and anything typed offline syncs when the signal comes back.
