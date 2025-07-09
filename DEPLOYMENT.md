# Deployment Guide

This guide walks you through deploying No Budget API to Cloudflare Workers.

## Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI (included in dependencies)

## Quick Deploy

1. **Clone and setup**
   ```bash
   git clone https://github.com/your-username/no-budget.git
   cd no-budget
   npm install
   ```

2. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Detailed Setup

### Step 1: Cloudflare Account Setup

1. Create a [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. Get your Account ID from the dashboard sidebar
3. Create an API token (optional, for CI/CD)

### Step 2: KV Namespace

The project requires a KV namespace for data storage:

1. **Create KV namespace**
   ```bash
   npx wrangler kv:namespace create "KV"
   ```

2. **Update wrangler.jsonc**
   Replace the `id` in `kv_namespaces`:
   ```jsonc
   "kv_namespaces": [
     {
       "binding": "KV",
       "id": "your-kv-namespace-id"
     }
   ]
   ```

### Step 3: Configuration

Update `wrangler.jsonc` if needed:

```jsonc
{
  "name": "no-budget",          // Your worker name
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### Step 4: Deploy

```bash
npm run deploy
```

## Environment Setup

### Development Environment

```bash
# Start local development server
npm run dev

# Your API will be available at:
# http://localhost:8787
```

### Production Environment

After deployment, your API will be available at:
```
https://no-budget.your-subdomain.workers.dev
```

## Custom Domain (Optional)

1. **Add custom domain in Cloudflare dashboard**
   - Go to Workers & Pages
   - Select your worker
   - Go to Settings → Triggers
   - Add custom domain

2. **Update DNS**
   - Add AAAA record: `100::`
   - Or CNAME to `your-worker.workers.dev`

## Environment Variables

Currently, the API doesn't require environment variables. For future enhancements:

```bash
# Set production variables
npx wrangler secret put SECRET_NAME
```

## CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm install
        
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### Required Secrets

Add these to your GitHub repository secrets:
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token

## Monitoring and Logs

### View Logs
```bash
npx wrangler tail
```

### Metrics
- Check Cloudflare dashboard
- Workers & Pages → Your worker → Metrics

## Troubleshooting

### Common Issues

1. **KV namespace not found**
   - Verify KV namespace ID in wrangler.jsonc
   - Ensure namespace exists in your account

2. **Permission errors**
   - Check Cloudflare account permissions
   - Verify API token has correct scopes

3. **Deployment fails**
   - Check wrangler.jsonc syntax
   - Verify account ID and zone settings

### Debug Mode

Enable debug logging:
```bash
npx wrangler dev --debug
```

### Reset KV Data

To clear all stored data:
```bash
npx wrangler kv:key list --namespace-id=your-namespace-id
npx wrangler kv:key delete "bills" --namespace-id=your-namespace-id
```

## Scaling Considerations

### Limits
- Free tier: 100,000 requests/day
- KV operations: 1,000/day (free tier)
- Paid plans available for higher limits

### Performance
- Edge locations worldwide
- Sub-millisecond response times
- Automatic scaling

## Backup Strategy

### Export Data
```bash
# Get all bills
curl https://your-worker.workers.dev/api/bills > backup.json

# Or use KV CLI
npx wrangler kv:key get "bills" --namespace-id=your-namespace-id > backup.json
```

### Import Data
```bash
# Upload via API
curl -X POST https://your-worker.workers.dev/api/bills \
  -H "Content-Type: application/json" \
  -d @backup.json
```

## Security

### Production Checklist
- [ ] Update worker name to something unique
- [ ] Consider adding authentication for public deployments  
- [ ] Monitor access logs
- [ ] Set up custom domain with SSL
- [ ] Review KV data regularly

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Project Issues](https://github.com/your-username/no-budget/issues)
