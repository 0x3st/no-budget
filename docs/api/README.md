# API Reference

Complete reference for all No Budget API endpoints.

## Base URL

```
https://your-worker.workers.dev
```

Replace `your-worker` with your actual Cloudflare Worker subdomain.

## Authentication

Currently, No Budget API does not require authentication. It's designed for personal use. For production deployments with multiple users, consider implementing:

- API key authentication
- OAuth 2.0 integration
- Custom middleware for access control

## Request Format

### Content Type
All POST and PUT requests must include:
```
Content-Type: application/json
```

### Request Body
Request bodies should be valid JSON:
```json
{
  "field": "value"
}
```

## Response Format

All API responses follow a consistent structure:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error Type",
  "message": "Detailed error description",
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

Rate limiting is handled by Cloudflare:
- **Free tier**: 100,000 requests per day
- **Paid plans**: Higher limits available

## CORS

All endpoints support CORS with:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Data Types

### Bill Object
```typescript
{
  uuid: string;           // Unique identifier (auto-generated)
  description: string;    // Human-readable description
  type: "receive" | "pay"; // Transaction type
  amount: number;         // Positive monetary value
  time: string;          // ISO 8601 timestamp
  tag: string;           // Custom tag
  category: string;      // Category classification
}
```

### Money Values
- All amounts are positive numbers
- No currency symbol required
- Decimal precision supported (e.g., 4.50)

### Timestamps
- ISO 8601 format: `2025-07-09T10:30:00.000Z`
- UTC timezone
- Auto-generated for new bills

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |
| GET | `/health` | Health check |
| POST | `/api/bills` | Create bill |
| GET | `/api/bills` | List bills |
| GET | `/api/bills/{uuid}` | Get bill |
| PUT | `/api/bills/{uuid}` | Update bill |
| DELETE | `/api/bills/{uuid}` | Delete bill |
| GET | `/api/stats` | General statistics |
| GET | `/api/stats/overview` | Overview dashboard |
| GET | `/api/stats/monthly` | Monthly breakdown |
| GET | `/api/stats/category` | Category analysis |
| GET | `/api/stats/trend` | Trend analysis |
| GET | `/api/tags` | Get tags/categories |
| POST | `/api/tags` | Create custom tag |

## Error Handling

### Validation Errors

When request data is invalid:

```json
{
  "error": "Validation Error",
  "message": "Amount must be a positive number",
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

### Not Found Errors

When a resource doesn't exist:

```json
{
  "error": "Not Found", 
  "message": "No bill found with UUID: 550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

### Server Errors

When an unexpected error occurs:

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

## Pagination

List endpoints support pagination:

### Query Parameters
- `limit`: Number of results per page (default: 50, max: 100)
- `offset`: Number of results to skip (default: 0)

### Response Format
```json
{
  "success": true,
  "data": {
    "bills": [...],
    "total": 150,
    "offset": 0,
    "limit": 50
  },
  "timestamp": "2025-07-09T10:30:00.000Z"
}
```

## Filtering

The `/api/bills` endpoint supports advanced filtering:

### Query Parameters
- `type`: Filter by "receive" or "pay"
- `tag`: Filter by tag
- `category`: Filter by category
- `start_date`: Start date (ISO format)
- `end_date`: End date (ISO format)
- `min_amount`: Minimum amount
- `max_amount`: Maximum amount

### Example
```bash
GET /api/bills?type=pay&category=dining&start_date=2025-01-01&limit=20
```

## Field Validation

### Required Fields (POST /api/bills)
- `description`: 1-200 characters
- `type`: Must be "receive" or "pay"
- `amount`: Positive number

### Optional Fields
- `tag`: 1-50 characters (default: "general")
- `category`: 1-50 characters (default: "other")

### Auto-Generated Fields
- `uuid`: Automatically generated UUID v4
- `time`: Current timestamp in ISO format

## Best Practices

### Request Guidelines
1. Always include `Content-Type: application/json` for POST/PUT
2. Use meaningful descriptions for bills
3. Choose consistent tag and category names
4. Validate data on the client side before sending

### Performance Tips
1. Use pagination for large result sets
2. Filter data server-side rather than client-side
3. Cache frequently accessed data
4. Use appropriate HTTP methods (GET for reading, POST for creating)

### Security Considerations
1. Don't include sensitive information in bill descriptions
2. Validate all user input
3. Use HTTPS for all API calls
4. Consider implementing authentication for production use

## SDK and Libraries

Currently, no official SDKs are available, but the API is designed to be easily consumed by any HTTP client:

### JavaScript/Node.js
```javascript
const response = await fetch('https://your-worker.workers.dev/api/bills', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    description: 'Coffee purchase',
    type: 'pay',
    amount: 4.50,
    tag: 'food',
    category: 'dining'
  })
});

const data = await response.json();
```

### Python
```python
import requests

response = requests.post(
    'https://your-worker.workers.dev/api/bills',
    json={
        'description': 'Coffee purchase',
        'type': 'pay', 
        'amount': 4.50,
        'tag': 'food',
        'category': 'dining'
    }
)

data = response.json()
```

### cURL
```bash
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

## Next Steps

- [Bills API](/api/bills.html) - Detailed bills endpoint documentation
- [Statistics API](/api/statistics.html) - Analytics and reporting endpoints
- [Examples](/examples/) - Practical usage examples
