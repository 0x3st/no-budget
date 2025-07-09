---
home: true
heroImage: /hero.png
heroText: No Budget API
tagline: Complete personal finance API built on Cloudflare Workers
actions:
  - text: Get Started →
    link: /guide/
    type: primary
  - text: View API Reference
    link: /api/
    type: secondary
features:
  - title: 🧾 Bills Management
    details: Complete CRUD operations for accounting records with advanced filtering and search capabilities.
  - title: 📊 Comprehensive Statistics
    details: Rich analytics including monthly trends, category breakdowns, and financial insights.
  - title: 🚀 Serverless & Fast
    details: Built on Cloudflare Workers for global edge deployment and lightning-fast responses.
  - title: 🔒 Secure by Design
    details: Leverages Cloudflare's security infrastructure with proper error handling and data validation.
  - title: 📱 REST API
    details: Standard HTTP methods with consistent JSON responses and comprehensive documentation.
  - title: 🎯 Zero Dependencies
    details: Pure JavaScript implementation with no external dependencies for maximum reliability.
footer: MIT Licensed | Copyright © 2025 No Budget API Contributors
---

## Quick Example

```bash
# Create a new bill
curl -X POST https://your-worker.workers.dev/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Coffee purchase",
    "type": "pay",
    "amount": 4.50,
    "tag": "food",
    "category": "dining"
  }'
```

```json
{
  "success": true,
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "description": "Coffee purchase",
    "type": "pay",
    "amount": 4.50,
    "time": "2025-07-09T10:30:00.000Z",
    "tag": "food",
    "category": "dining"
  },
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

## Features Overview

### 💰 Financial Management
- Create, read, update, and delete bills/transactions
- Support for both income and expenses
- Flexible categorization with tags and categories
- Advanced filtering by date, amount, type, and more

### 📈 Analytics & Insights
- Monthly and yearly financial summaries
- Category-wise spending analysis
- Trend analysis over configurable time periods
- Overview dashboard with key metrics

### 🌍 Global Performance
- Deployed on Cloudflare's global edge network
- Sub-millisecond response times worldwide
- Automatic scaling and high availability
- Built-in DDoS protection and security

### 🛠️ Developer Friendly
- RESTful API design with consistent responses
- Comprehensive error handling and validation
- Detailed documentation with examples
- Easy deployment with Wrangler CLI

## Why Choose No Budget API?

- **Lightweight**: No external dependencies, pure JavaScript
- **Scalable**: Serverless architecture that scales automatically
- **Secure**: Built on Cloudflare's security-first platform
- **Fast**: Global edge deployment for optimal performance
- **Simple**: Clear API design with comprehensive documentation
- **Free**: Deploy on Cloudflare Workers free tier

## Get Started in Minutes

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/no-budget.git
   cd no-budget
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Cloudflare Workers**
   ```bash
   npx wrangler login
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

That's it! Your personal finance API is now running globally on Cloudflare's edge network.

## Community

- 📋 [Report Issues](https://github.com/your-username/no-budget/issues)
- 💡 [Request Features](https://github.com/your-username/no-budget/issues/new?template=feature_request.md)
- 🤝 [Contributing Guide](/guide/contributing.html)
- 🔒 [Security Policy](/guide/security.html)
