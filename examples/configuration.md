# Example Environment Configuration

This file shows example configurations for different deployment scenarios.

## Local Development

For local development with `wrangler dev`:

```bash
# No special environment variables needed
npm run dev
```

## Production Deployment

### Basic Deployment

```jsonc
// wrangler.jsonc
{
  "name": "no-budget-prod",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-production-kv-namespace-id"
    }
  ]
}
```

### Multi-Environment Setup

For different environments (dev, staging, prod):

```jsonc
// wrangler.jsonc
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
          "id": "dev-kv-namespace-id"
        }
      ]
    },
    "staging": {
      "name": "no-budget-staging",
      "kv_namespaces": [
        {
          "binding": "KV",
          "id": "staging-kv-namespace-id"
        }
      ]
    },
    "production": {
      "name": "no-budget-prod",
      "kv_namespaces": [
        {
          "binding": "KV",
          "id": "prod-kv-namespace-id"
        }
      ]
    }
  }
}
```

Deploy to specific environment:
```bash
npx wrangler deploy --env staging
npx wrangler deploy --env production
```

## Custom Domain Setup

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "routes": [
    {
      "pattern": "api.yourdomain.com/*",
      "zone_name": "yourdomain.com"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

## Advanced Configuration

### With Environment Variables

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "vars": {
    "ENVIRONMENT": "production",
    "API_VERSION": "1.0.0"
  },
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### With Secrets (for future authentication)

```bash
# Set secrets
npx wrangler secret put API_SECRET
npx wrangler secret put JWT_SECRET
```

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
  // Secrets are automatically available as environment variables
}
```

## KV Namespace Setup

### Create Namespaces

```bash
# Development
npx wrangler kv:namespace create "KV" --env dev

# Staging  
npx wrangler kv:namespace create "KV" --env staging

# Production
npx wrangler kv:namespace create "KV" --env production
```

### Preview Namespaces (for local development)

```bash
npx wrangler kv:namespace create "KV" --preview
```

Add preview namespace to wrangler.jsonc:
```jsonc
{
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "production-id",
      "preview_id": "preview-id"
    }
  ]
}
```

## Monitoring and Observability

### Enable Enhanced Monitoring

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "observability": {
    "enabled": true
  },
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### Logpush (Enterprise feature)

```jsonc
{
  "name": "no-budget",
  "logpush": true,
  "kv_namespaces": [
    {
      "binding": "KV", 
      "id": "your-kv-namespace-id"
    }
  ]
}
```

## Performance Optimization

### Smart Placement

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "placement": { 
    "mode": "smart" 
  },
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

### CPU Limits

```jsonc
{
  "name": "no-budget",
  "limits": {
    "cpu_ms": 50
  },
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-kv-namespace-id"
    }
  ]
}
```

## Notes

- Replace `your-kv-namespace-id` with actual KV namespace IDs
- Environment names must be alphanumeric (no spaces or special chars)
- Custom domains require DNS configuration
- Some features require paid Cloudflare plans
