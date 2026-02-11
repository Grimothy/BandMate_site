# Custom Domain Setup for bandmate.me

## GitHub Pages Configuration ✅

Your GitHub Pages site is now configured to use **bandmate.me** as the custom domain.

## DNS Configuration Required

To complete the setup, you need to configure DNS records for **bandmate.me** at your domain registrar.

### Option 1: Using A Records (Recommended for Root Domain)

Add these **A records** to point `bandmate.me` to GitHub Pages:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### Option 2: Using CNAME Record (For www subdomain)

If you want to support www.bandmate.me as well:

```
Type: CNAME
Name: www
Value: grimothy.github.io
```

### Verification

Add this **TXT record** for domain verification (if not already added):

```
Type: TXT
Name: _github-pages-challenge-Grimothy
Value: [GitHub will provide this value]
```

## After DNS Configuration

1. **Wait for DNS propagation** (can take 15 minutes to 48 hours)
   - Check status: `dig bandmate.me` or https://dnschecker.org

2. **HTTPS Certificate** will be automatically provisioned by GitHub
   - This happens after DNS propagates (usually 15-60 minutes)
   - You'll see "HTTPS enforced" option become available in GitHub Pages settings

3. **Verify your site** is accessible:
   - http://bandmate.me → Should redirect to https://bandmate.me
   - https://bandmate.me → Your documentation site

## Current Status

✅ CNAME file created in repository
✅ Docusaurus configured for bandmate.me
✅ GitHub Pages custom domain set to bandmate.me
✅ Domain verified in GitHub
⏳ DNS configuration (needs to be done at your registrar)
⏳ HTTPS certificate (will auto-provision after DNS propagates)

## GitHub Pages Settings

View your GitHub Pages configuration:
https://github.com/Grimothy/BandMate_site/settings/pages

## Troubleshooting

### DNS Not Propagating
- Check DNS: `dig bandmate.me +short`
- Should return GitHub's IPs: 185.199.108-111.153

### HTTPS Not Working
- Wait 15-60 minutes after DNS propagates
- GitHub needs time to provision the SSL certificate
- Go to Settings > Pages and check "Enforce HTTPS" option

### Site Not Loading
1. Verify DNS records are correct
2. Check GitHub Actions deployment succeeded
3. Verify CNAME file exists in the deployed site
4. Clear browser cache

## Where to Configure DNS

Configure these DNS records at your domain registrar where you purchased **bandmate.me**. Common registrars include:
- Namecheap
- GoDaddy
- Cloudflare
- Google Domains
- Domain.com

Once DNS is configured, your documentation site will be live at:
🌐 **https://bandmate.me**
