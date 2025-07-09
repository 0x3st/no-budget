# No Budget API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/no-budget/releases)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange.svg)](https://workers.cloudflare.com/)
[![Deploy](https://github.com/0x3st/no-budget/workflows/Deploy%20to%20Cloudflare%20Workers/badge.svg)](https://github.com/0x3st/no-budget/actions)

Complete personal finance API system built on Cloudflare Workers with full CRUD operations and comprehensive statistical analysis.

## 📚 Documentation

**[📖 Complete Documentation](https://0x3st.github.io/no-budget/)**

- [📘 Getting Started Guide](https://0x3st.github.io/no-budget/guide/)
- [📋 API Reference](https://0x3st.github.io/no-budget/api/)
- [💡 Examples & Use Cases](https://0x3st.github.io/no-budget/examples/)
- [🚀 Deployment Guide](https://0x3st.github.io/no-budget/deployment/)

## 🚀 Features

- 🧾 **Bills Management** - Complete CRUD operations for accounting records
- 📊 **Statistics** - Comprehensive financial analysis and reporting
- 🏷️ **Tags & Categories** - Flexible organization system
- 🔍 **Advanced Filtering** - Search and filter by multiple criteria
- 📈 **Trend Analysis** - Time-based financial trends
- 💾 **KV Storage** - Reliable serverless data persistence
- 🌍 **Global Edge Network** - Lightning-fast responses worldwide
- 🔒 **Secure** - Built on Cloudflare's secure infrastructure
- 📱 **REST API** - Standard HTTP methods with JSON responses
- 🎯 **Zero Dependencies** - Pure JavaScript implementation

## 📋 Bill Structure

Each bill contains:
- `uuid` - Unique identifier
- `description` - Bill description
- `type` - Either "receive" (income) or "pay" (expense)
- `amount` - Monetary amount (positive number)
- `time` - ISO timestamp
- `tag` - Custom tag for organization
- `category` - Category classification

## Quick Start

```bash
# Install dependencies
npm install

# Local development
npm run dev

# Deploy
npm run deploy
```

## API Endpoints

### Bills Management

- `POST /api/bills` - Create new bill
- `GET /api/bills` - Get all bills (with filtering)
- `GET /api/bills/{uuid}` - Get specific bill
- `PUT /api/bills/{uuid}` - Update bill
- `DELETE /api/bills/{uuid}` - Delete bill

### Statistics

- `GET /api/stats` - General statistics
- `GET /api/stats/overview` - Overview dashboard data
- `GET /api/stats/monthly` - Monthly breakdown
- `GET /api/stats/category` - Category analysis
- `GET /api/stats/trend` - Trend analysis

### Tags & Categories

- `GET /api/tags` - Get all tags and categories
- `POST /api/tags` - Create custom tag

### Basic

- `GET /` - API status
- `GET /health` - Health check

## Usage Examples

### Create Bill

```bash
curl -X POST http://localhost:8787/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Coffee purchase",
    "type": "pay",
    "amount": 4.50,
    "tag": "food",
    "category": "dining"
  }'
```

**Response:**
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

### Get Bills with Filtering

```bash
# Get all bills
curl http://localhost:8787/api/bills

# Filter by type
curl http://localhost:8787/api/bills?type=pay

# Filter by date range
curl "http://localhost:8787/api/bills?start_date=2025-01-01&end_date=2025-12-31"

# Pagination
curl "http://localhost:8787/api/bills?limit
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bills": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "description": "Coffee purchase",
        "type": "pay",
        "amount": 4.50,
        "time": "2025-07-09T10:30:00.000Z",
        "tag": "food",
        "category": "dining"
      },
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440001",
        "description": "Salary payment",
        "type": "receive",
        "amount": 3000.00,
        "time": "2025-07-01T09:00:00.000Z",
        "tag": "work",
        "category": "income"
      }
    ],
    "total": 2,
    "offset": 0,
    "limit": 50
  },
  "timestamp": "2025-07-09T10:35:00.000Z"
}
```

### Update Bill

```bash
curl -X PUT http://localhost:8787/api/bills/{uuid} \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description",
    "type": "pay",
    "amount": 5.00,
    "tag": "food"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "description": "Updated description",
    "type": "pay",
    "amount": 5.00,
    "time": "2025-07-09T10:30:00.000Z",
    "tag": "food",
    "category": "dining"
  },
  "timestamp": "2025-07-09T10:40:00.000Z"
}
```

### Basic API Examples

#### Get API Status
```bash
curl http://localhost:8787/
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "No Budget API",
    "version": "1.0.0",
    "status": "active"
  },
  "timestamp": "2025-07-09T10:50:00.000Z"
}
```

#### Get Specific Bill
```bash
curl http://localhost:8787/api/bills/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
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
  "timestamp": "2025-07-09T10:50:00.000Z"
}
```

#### Delete Bill
```bash
curl -X DELETE http://localhost:8787/api/bills/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Bill deleted successfully",
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2025-07-09T10:55:00.000Z"
}
```

#### Get Tags and Categories
```bash
curl http://localhost:8787/api/tags
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tags": ["food", "work", "transport", "entertainment", "utilities"],
    "categories": ["dining", "income", "transport", "shopping", "bills"]
  },
  "timestamp": "2025-07-09T10:55:00.000Z"
}
```

### Get Statistics

```bash
# Overview stats
curl http://localhost:8787/api/stats/overview

# Monthly stats for specific year
curl http://localhost:8787/api/stats/monthly?year=2025

# Category breakdown
curl http://localhost:8787/api/stats/category

# 30-day trend
curl http://localhost:8787/api/stats/trend?days=30
```

**Overview Stats Response:**
```json
{
  "success": true,
  "data": {
    "currentMonth": {
      "income": 3000.00,
      "expenses": 450.00,
      "balance": 2550.00,
      "transactionCount": 12
    },
    "allTime": {
      "income": 15000.00,
      "expenses": 2800.00,
      "balance": 12200.00,
      "transactionCount": 58
    },
    "topCategories": [
      {
        "category": "dining",
        "amount": 320.00,
        "count": 8
      },
      {
        "category": "transport",
        "amount": 180.00,
        "count": 4
      }
    ]
  },
  "timestamp": "2025-07-09T10:45:00.000Z"
}
```

**Monthly Stats Response:**
```json
{
  "success": true,
  "data": {
    "year": 2025,
    "months": [
      {
        "month": 1,
        "income": 3000.00,
        "expenses": 800.00,
        "balance": 2200.00,
        "transactionCount": 15
      },
      {
        "month": 2,
        "income": 3000.00,
        "expenses": 650.00,
        "balance": 2350.00,
        "transactionCount": 12
      }
    ]
  },
  "timestamp": "2025-07-09T10:45:00.000Z"
}
```

**Category Stats Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "category": "dining",
        "income": 0.00,
        "expenses": 320.00,
        "balance": -320.00,
        "percentage": 35.6,
        "count": 8
      },
      {
        "category": "income",
        "income": 3000.00,
        "expenses": 0.00,
        "balance": 3000.00,
        "percentage": 0.0,
        "count": 1
      }
    ]
  },
  "timestamp": "2025-07-09T10:45:00.000Z"
}
```

**Trend Stats Response:**
```json
{
  "success": true,
  "data": {
    "period": 30,
    "trends": [
      {
        "date": "2025-07-01",
        "income": 3000.00,
        "expenses": 0.00,
        "balance": 3000.00,
        "transactionCount": 1
      },
      {
        "date": "2025-07-02",
        "income": 0.00,
        "expenses": 25.50,
        "balance": -25.50,
        "transactionCount": 2
      }
    ]
  },
  "timestamp": "2025-07-09T10:45:00.000Z"
}
```

## Filtering Options

The `/api/bills` endpoint supports these query parameters:

- `type` - Filter by "receive" or "pay"
- `tag` - Filter by tag
- `category` - Filter by category
- `start_date` - Start date (ISO format)
- `end_date` - End date (ISO format)
- `limit` - Number of results per page
- `offset` - Pagination offset

## Response Format

All endpoints return JSON with consistent structure:

```json
{
  "success": true,
  "data": {...},
  "timestamp": "2025-07-08T..."
}
```

For errors:

```json
{
  "error": "Bill not found",
  "message": "No bill found with UUID: 550e8400-e29b-41d4-a716-446655440999",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

**Common Error Examples:**

```json
{
  "error": "Validation error",
  "message": "Amount must be a positive number",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

```json
{
  "error": "Missing required field",
  "message": "Description is required",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

## Statistics Features

### Overview Stats
- Current month vs all-time comparison
- Top spending categories
- Balance calculations

### Monthly Analysis
- Month-by-month breakdown for any year
- Income vs expense trends
- Transaction count per month

### Category Analysis
- Spending by category with percentages
- Category-wise balance calculations
- Detailed bill lists per category

### Trend Analysis
- Daily trends over configurable periods
- Balance evolution over time
- Transaction frequency patterns

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Language**: JavaScript (ES2022+)
- **Storage**: Cloudflare KV
- **Tools**: Wrangler CLI

## License

MIT