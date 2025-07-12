# No-Budget

A lightweight personal finance API built on Cloudflare Workers with comprehensive accounting features. Track your income and expenses with a modern web interface and RESTful API.

[![Demo](https://img.shields.io/badge/Demo-demo.gnu.do-green.svg)](https://demo.gnu.do)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-0x3st%2Fno--budget-blue.svg)](https://github.com/0x3st/no-budget)

## 🌟 Features

- **Transaction Management**: Add, view, and categorize your financial transactions
- **Category Management**: Create custom income and expense categories with icons
- **Statistics Dashboard**: Visualize your spending patterns by category
- **Modern Web Interface**: Clean, responsive UI built with Tailwind CSS
- **REST API**: Full API access for integration with other tools
- **Serverless Architecture**: Powered by Cloudflare Workers for global performance
- **KV Storage**: Persistent data storage using Cloudflare KV

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- A Cloudflare account
- Wrangler CLI installed globally

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0x3st/no-budget.git
cd no-budget
```

2. Install dependencies:
```bash
npm install
```

3. Configure Wrangler:
```bash
wrangler login
```

4. Create a KV namespace:
```bash
wrangler kv:namespace create "NO_BUDGET_KV"
```

5. Update `wrangler.jsonc` with your KV namespace ID

6. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8787`

## 📊 API Endpoints

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Statistics

- `GET /api/statistics` - Get spending statistics by category

## 💡 Usage Examples

### Create a Transaction

```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 25.50,
    "categoryId": "cat-food",
    "description": "Grocery shopping"
  }'
```

### Create a Custom Category

```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Coffee",
    "icon": "☕",
    "type": "expense"
  }'
```

## 🏗️ Project Structure

```
no-budget/
├── src/
│   └── index.js          # Main Cloudflare Worker script
├── public/
│   ├── index.html        # Web interface
│   ├── script.js         # Frontend JavaScript
│   └── style.css         # Custom styles
├── package.json          # Node.js dependencies
├── wrangler.jsonc        # Cloudflare Workers configuration
└── README.md             # This file
```

## 🔧 Configuration

The application uses the following environment variables and bindings:

- `NO_BUDGET_KV` - KV namespace binding for data storage
- `ASSETS` - Static assets binding for serving the web interface

## 🎨 Default Categories

The application comes with pre-configured categories:

**Expenses:**
- 🛒 Groceries
- 🚗 Transport  
- 🏠 Housing
- 🛍️ Shopping
- 🎬 Entertainment
- ❤️ Health
- 📦 Other

**Income:**
- 💰 Salary

You can add, edit, or delete categories through the web interface or API.

## 🔒 Data Storage

All data is stored in Cloudflare KV with the following structure:

- `transactions` - Array of transaction objects
- `categories` - Array of category objects

Data persists across deployments and is globally distributed through Cloudflare's edge network.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Deployment

The application is designed to be deployed on Cloudflare Workers:

1. **Zero cold start** - Instant response times globally
2. **Edge computing** - Runs close to your users worldwide  
3. **Automatic scaling** - Handles traffic spikes seamlessly
4. **Cost effective** - Pay only for what you use

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues page](https://github.com/0x3st/no-budget/issues).

## 📊 Statistics Features

The statistics dashboard provides:

- **Spending by Category** - Visual breakdown of expenses
- **Chart Visualization** - Interactive charts using Chart.js
- **Real-time Updates** - Statistics update automatically with new transactions

---

Built with ❤️ using Cloudflare Workers
