# BandMate Documentation Site - Setup Instructions

## Automatic Documentation Deployment

The documentation site at https://grimothy.github.io/BandMate_site/ is configured to automatically redeploy when a new release is created in the main BandMate repository.

### Setup Required in BandMate Repository

To enable automatic documentation updates on new releases, add this workflow file to the main BandMate repository:

**File location:** `.github/workflows/notify-docs-site.yml` (in Grimothy/BandMate repo)

```yaml
name: Notify Documentation Site

on:
  release:
    types: [published]

jobs:
  trigger-docs-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger BandMate_site deployment
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github.v3+json" \
            -H "Authorization: token ${{ secrets.DOCS_DEPLOY_TOKEN }}" \
            https://api.github.com/repos/Grimothy/BandMate_site/dispatches \
            -d '{"event_type":"bandmate-released"}'
```

### GitHub Personal Access Token Setup

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `BandMate Docs Deploy`
4. Expiration: Choose your preference
5. Scopes: Select **only** `public_repo` (under "repo" section)
6. Click "Generate token" and copy the token

7. Go to https://github.com/Grimothy/BandMate/settings/secrets/actions
8. Click "New repository secret"
9. Name: `DOCS_DEPLOY_TOKEN`
10. Value: Paste the token you copied
11. Click "Add secret"

### How It Works

1. When you create a new release in the BandMate repository
2. The `notify-docs-site.yml` workflow triggers
3. It sends a `repository_dispatch` event to BandMate_site
4. BandMate_site workflow automatically runs
5. The site rebuilds, fetching the latest version from GitHub API
6. Documentation site deploys with updated version info

### Manual Deployment

You can also trigger deployment manually:
- Go to https://github.com/Grimothy/BandMate_site/actions
- Click "Deploy to GitHub Pages"
- Click "Run workflow"

## Site Features

✅ Automated version fetching from GitHub releases
✅ Interactive screenshot carousel with lightbox
✅ Ko-fi donation links (navbar, footer, homepage)
✅ Dark theme with custom styling
✅ Fully responsive design
✅ Comprehensive documentation structure

## Local Development

```bash
cd bandmate
npm install
npm run start  # Opens http://localhost:3000/BandMate_site/
```

## Build

```bash
cd bandmate
npm run build  # Output in bandmate/build/
```
