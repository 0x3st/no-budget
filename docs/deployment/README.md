# Deployment Guide

Complete guide for deploying No Budget API to Cloudflare Workers.

## Overview

No Budget API is designed to run on Cloudflare Workers, providing:
- Global edge deployment
- Automatic scaling
- High availability
- Built-in security
- Free tier support

## Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Node.js](https://nodejs.org/) 18+
- [Git](https://git-scm.com/)
- Project cloned and dependencies installed

## Quick Deployment

### 1. Prepare Your Environment

```bash
# Clone the repository
git clone https://github.com/your-username/no-budget.git
cd no-budget

# Install dependencies
npm install

# Login to Cloudflare
npx wrangler login
```

### 2. Configure KV Namespace

```bash
# Create production KV namespace
npx wrangler kv:namespace create "KV"

# Note the output - you'll need the namespace ID
```

Update `wrangler.jsonc` with your namespace ID:

```jsonc
{
  "name": "no-budget-prod",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-namespace-id-here"
    }
  ]
}
```

### 3. Deploy

```bash
npm run deploy
```

Your API will be available at:
```
https://no-budget-prod.your-subdomain.workers.dev
```

## Environment-Specific Deployment

### Development Environment

```bash
# Create development namespace
npx wrangler kv:namespace create "KV" --env dev

# Deploy to development
npx wrangler deploy --env dev
```

### Staging Environment

```bash
# Create staging namespace
npx wrangler kv:namespace create "KV" --env staging

# Deploy to staging
npx wrangler deploy --env staging
```

### Production Environment

```bash
# Create production namespace
npx wrangler kv:namespace create "KV" --env production

# Deploy to production
npx wrangler deploy --env production
```

## Multi-Environment Configuration

Update `wrangler.jsonc` for multiple environments:

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  
  "env": {
    "dev": {
      "name": "no-budget-dev",
      "kv_namespaces": [
        {
          "binding": "KV",
          "id": "dev-namespace-id"
        }
      ]
    },
    "staging": {
      "name": "no-budget-staging", 
      "kv_namespaces": [
        {
          "binding": "KV",
          "id": "staging-namespace-id"
        }
      ]
    },
    "production": {
      "name": "no-budget-prod",
      "kv_namespaces": [
        {
          "binding": "KV",
          "id": "production-namespace-id"
        }
      ]
    }
  }
}
```

## Custom Domain Setup

### 1. Add Domain to Cloudflare

1. Log into Cloudflare Dashboard
2. Add your domain to Cloudflare
3. Update nameservers at your domain registrar

### 2. Configure Worker Route

Option A: Via Dashboard
1. Go to Workers & Pages
2. Select your worker
3. Go to Settings → Triggers
4. Add custom domain: `api.yourdomain.com`

Option B: Via Configuration
```jsonc
{
  "name": "no-budget-prod",
  "main": "src/index.js",
  "routes": [
    {
      "pattern": "api.yourdomain.com/*",
      "zone_name": "yourdomain.com"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-namespace-id"
    }
  ]
}
```

### 3. SSL Certificate

Cloudflare automatically provides SSL certificates for custom domains.

## CI/CD with GitHub Actions

### 1. Set Up Repository Secrets

In your GitHub repository settings, add:
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### 2. Create API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create Custom Token with permissions:
   - Zone:Zone:Read
   - Zone:Zone Settings:Edit
   - Account:Cloudflare Workers:Edit

### 3. GitHub Actions Workflow

The project includes `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

## Monitoring and Logging

### Real-time Logs

```bash
# View live logs
npx wrangler tail

# View logs for specific environment
npx wrangler tail --env production
```

### Cloudflare Analytics

1. Go to Workers & Pages in Cloudflare Dashboard
2. Select your worker
3. View Metrics tab for:
   - Request volume
   - Error rates
   - Response times
   - CPU usage

### Custom Logging

Add custom logging to your worker:

```javascript
// In your worker code
console.log('Custom log message', { 
  endpoint: path, 
  method: method,
  timestamp: new Date().toISOString()
});
```

## Performance Optimization

### Smart Placement

Enable Smart Placement for better performance:

```jsonc
{
  "name": "no-budget",
  "placement": { "mode": "smart" },
  "kv_namespaces": [...]
}
```

### CPU Limits

Set appropriate CPU limits:

```jsonc
{
  "name": "no-budget",
  "limits": {
    "cpu_ms": 50
  },
  "kv_namespaces": [...]
}
```

### KV Performance

- Use KV for data that doesn't change frequently
- Implement caching strategies for frequently accessed data
- Consider KV read performance (eventual consistency)

## Security Best Practices

### Worker Security

1. **Input Validation**: Always validate request data
2. **Error Handling**: Don't expose sensitive information in errors
3. **Rate Limiting**: Use Cloudflare's built-in rate limiting
4. **CORS**: Configure appropriate CORS headers

### KV Security

1. **Data Isolation**: Use different namespaces for different environments
2. **Access Control**: Limit KV access to specific workers
3. **Data Encryption**: Consider encrypting sensitive data before storing

### Network Security

1. **HTTPS Only**: Always use HTTPS for API calls
2. **Custom Domains**: Use custom domains for production
3. **Access Logs**: Monitor access patterns

## Backup and Recovery

### Data Export

```bash
# Export all bills data
npx wrangler kv:key get "bills" --namespace-id=your-namespace-id > backup.json

# List all keys
npx wrangler kv:key list --namespace-id=your-namespace-id
```

### Data Import

```bash
# Import bills data
npx wrangler kv:key put "bills" --path=backup.json --namespace-id=your-namespace-id
```

### Automated Backups

Consider setting up automated backups:

```bash
#!/bin/bash
# backup-script.sh

DATE=$(date +%Y%m%d_%H%M%S)
NAMESPACE_ID="your-namespace-id"

# Export data
npx wrangler kv:key get "bills" --namespace-id=$NAMESPACE_ID > "backup_$DATE.json"

# Upload to cloud storage (example with AWS S3)
aws s3 cp "backup_$DATE.json" s3://your-backup-bucket/
```

## Troubleshooting

### Common Deployment Issues

**"Namespace not found"**
- Verify namespace ID in wrangler.jsonc
- Ensure namespace exists in correct account
- Check environment-specific configuration

**"Permission denied"**
- Verify API token permissions
- Check account ID is correct
- Ensure Workers are enabled on your account

**"Deployment failed"**
- Check wrangler.jsonc syntax
- Verify all required fields are present
- Review error logs with `npx wrangler tail`

### Performance Issues

**High CPU usage**
- Review code for inefficient operations
- Implement caching
- Consider breaking down large operations

**KV timeout errors**
- Implement retry logic
- Check KV namespace configuration
- Monitor KV usage limits

### Debugging Tips

1. **Local Testing**: Always test locally first with `npm run dev`
2. **Staged Deployment**: Use staging environment before production
3. **Monitoring**: Set up alerts for error rates and response times
4. **Logging**: Add comprehensive logging for debugging

## Scaling Considerations

### Free Tier Limits

- 100,000 requests per day
- 1,000 KV operations per day
- 10ms CPU time per request

### Paid Tier Benefits

- Higher request limits
- More KV operations
- Longer CPU time
- Additional features (Smart Placement, etc.)

### Architecture for Scale

For high-traffic applications:
1. Implement caching strategies
2. Use multiple KV namespaces for data partitioning
3. Consider external databases for complex queries
4. Implement rate limiting and authentication

## Next Steps

After deployment:

1. [Monitor your application](/deployment/monitoring.html)
2. [Set up custom domain](/deployment/custom-domain.html)
3. [Configure environment-specific settings](/deployment/environment-setup.html)
4. [Implement backup strategies](#backup-and-recovery)
