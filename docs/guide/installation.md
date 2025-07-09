# Installation

This guide walks you through installing and setting up No Budget API for development and deployment.

## System Requirements

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (comes with Node.js)
- **Git** for version control
- **Cloudflare account** (free tier sufficient)

## Quick Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/no-budget.git
cd no-budget
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- **Wrangler CLI** - Cloudflare Workers development tool
- All necessary development dependencies

### 3. Verify Installation

```bash
# Check Node.js version
node --version
# Should output v18.0.0 or higher

# Check npm version
npm --version
# Should output 8.0.0 or higher

# Check Wrangler installation
npx wrangler --version
# Should output the Wrangler version
```

## Cloudflare Setup

### 1. Create Cloudflare Account

If you don't have one already:
1. Go to [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Sign up for a free account
3. Verify your email address

### 2. Login with Wrangler

```bash
npx wrangler login
```

This will:
1. Open your browser
2. Prompt you to authorize Wrangler
3. Save your authentication token locally

### 3. Verify Authentication

```bash
npx wrangler whoami
```

Should display your Cloudflare account email.

## KV Namespace Setup

The API requires a Cloudflare KV namespace for data storage.

### 1. Create KV Namespace

```bash
npx wrangler kv:namespace create "KV"
```

This command will output something like:
```
🌀 Creating namespace with title "no-budget-KV"
✨ Success! Created KV namespace for you!
Add the following to your wrangler.toml file:

kv_namespaces = [
  { binding = "KV", id = "your-namespace-id-here" }
]
```

### 2. Update Configuration

Copy the namespace ID and update `wrangler.jsonc`:

```jsonc
{
  "name": "no-budget",
  "main": "src/index.js",
  "compatibility_date": "2025-07-08",
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "your-namespace-id-here"  // Replace with your actual ID
    }
  ]
}
```

### 3. Create Preview Namespace (Optional)

For local development with real KV storage:

```bash
npx wrangler kv:namespace create "KV" --preview
```

Add the preview ID to your configuration:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "production-namespace-id",
      "preview_id": "preview-namespace-id"
    }
  ]
}
```

## Development Environment

### 1. Start Development Server

```bash
npm run dev
```

This starts a local server at `http://localhost:8787`

### 2. Test the API

```bash
# Health check
curl http://localhost:8787/health

# API status
curl http://localhost:8787/
```

Expected response:
```json
{
  "success": true,
  "data": {
    "message": "No Budget API",
    "version": "1.0.0",
    "status": "active"
  },
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

## Project Structure

After installation, your project structure should look like:

```
no-budget/
├── src/
│   └── index.js          # Main API code
├── docs/                 # Documentation (VuePress)
├── examples/             # Configuration examples
├── .github/              # GitHub templates and workflows
├── package.json          # Dependencies and scripts
├── wrangler.jsonc        # Cloudflare Workers config
├── README.md            # Project overview
└── ...                  # Other documentation files
```

## Environment Scripts

The project includes several npm scripts:

```bash
# Development
npm run dev              # Start local development server

# Deployment
npm run deploy           # Deploy to Cloudflare Workers

# Documentation
npm run docs:dev         # Start documentation server
npm run docs:build       # Build documentation for production

# Maintenance
npm run test             # Run tests (placeholder)
npm run lint             # Code linting (placeholder)
```

## Troubleshooting

### Common Issues

#### "wrangler: command not found"
```bash
# Install Wrangler globally (optional)
npm install -g wrangler

# Or use npx (recommended)
npx wrangler --version
```

#### "Failed to authenticate"
```bash
# Re-authenticate with Cloudflare
npx wrangler logout
npx wrangler login
```

#### "KV namespace not found"
- Verify the namespace ID in `wrangler.jsonc`
- Ensure the namespace exists in your Cloudflare account
- Check that you're using the correct account

#### "Permission denied"
- Verify your Cloudflare account has Workers enabled
- Check that your API token has the correct permissions

### Getting Help

If you encounter issues:

1. Check the [Deployment Guide](/deployment/) for detailed setup instructions
2. Review [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
3. Open an issue on [GitHub](https://github.com/your-username/no-budget/issues)

## Next Steps

Now that you have the API installed:

1. [Quick Start Guide](/guide/quick-start.html) - Create your first bills
2. [Configuration](/guide/configuration.html) - Customize your setup
3. [API Reference](/api/) - Explore all available endpoints

## Development Tips

- Use `npx wrangler tail` to view live logs during development
- The local dev server supports hot reloading
- KV data persists between development sessions
- Use `npx wrangler kv:key list --namespace-id=YOUR_ID` to inspect stored data
