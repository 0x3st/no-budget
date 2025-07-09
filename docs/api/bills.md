# Bills API

Complete reference for bills management endpoints.

## Overview

The Bills API provides full CRUD (Create, Read, Update, Delete) operations for managing financial transactions. Each bill represents either income ("receive") or expense ("pay") with detailed metadata.

## Bill Object Schema

```typescript
interface Bill {
  uuid: string;           // Unique identifier (auto-generated)
  description: string;    // Human-readable description (1-200 chars)
  type: "receive" | "pay"; // Transaction type
  amount: number;         // Positive monetary value
  time: string;          // ISO 8601 timestamp (auto-generated)
  tag: string;           // Custom tag (1-50 chars)
  category: string;      // Category classification (1-50 chars)
}
```

## Endpoints

### Create Bill

Create a new financial transaction.

**POST** `/api/bills`

#### Request Body

```json
{
  "description": "Coffee purchase",
  "type": "pay",
  "amount": 4.50,
  "tag": "food",
  "category": "dining"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| description | string | Yes | Bill description (1-200 characters) |
| type | string | Yes | Either "receive" or "pay" |
| amount | number | Yes | Positive monetary amount |
| tag | string | No | Custom tag (default: "general") |
| category | string | No | Category (default: "other") |

#### Response

**Status: 201 Created**

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

#### Example

```bash
curl -X POST https://your-worker.workers.dev/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Grocery shopping",
    "type": "pay", 
    "amount": 85.50,
    "tag": "food",
    "category": "groceries"
  }'
```

### Get All Bills

Retrieve bills with optional filtering and pagination.

**GET** `/api/bills`

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| type | string | Filter by "receive" or "pay" | `type=pay` |
| tag | string | Filter by tag | `tag=food` |
| category | string | Filter by category | `category=dining` |
| start_date | string | Start date (ISO format) | `start_date=2025-01-01` |
| end_date | string | End date (ISO format) | `end_date=2025-12-31` |
| min_amount | number | Minimum amount | `min_amount=10.00` |
| max_amount | number | Maximum amount | `max_amount=100.00` |
| limit | number | Results per page (max 100) | `limit=20` |
| offset | number | Results to skip | `offset=40` |

#### Response

**Status: 200 OK**

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
      }
    ],
    "total": 150,
    "offset": 0,
    "limit": 50
  },
  "timestamp": "2025-07-09T10:35:00.000Z"
}
```

#### Examples

```bash
# Get all bills
curl https://your-worker.workers.dev/api/bills

# Get expenses only
curl "https://your-worker.workers.dev/api/bills?type=pay"

# Get bills from last month
curl "https://your-worker.workers.dev/api/bills?start_date=2025-06-01&end_date=2025-06-30"

# Get dining expenses over $20
curl "https://your-worker.workers.dev/api/bills?type=pay&category=dining&min_amount=20"

# Pagination
curl "https://your-worker.workers.dev/api/bills?limit=10&offset=20"
```

### Get Single Bill

Retrieve a specific bill by UUID.

**GET** `/api/bills/{uuid}`

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| uuid | string | Bill UUID |

#### Response

**Status: 200 OK**

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

#### Example

```bash
curl https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000
```

### Update Bill

Update an existing bill. All fields except UUID and time can be modified.

**PUT** `/api/bills/{uuid}`

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| uuid | string | Bill UUID |

#### Request Body

```json
{
  "description": "Updated description",
  "type": "pay",
  "amount": 5.00,
  "tag": "food",
  "category": "dining"
}
```

All fields are optional. Only provided fields will be updated.

#### Response

**Status: 200 OK**

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

#### Example

```bash
curl -X PUT https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated grocery shopping",
    "amount": 92.75
  }'
```

### Delete Bill

Permanently delete a bill.

**DELETE** `/api/bills/{uuid}`

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| uuid | string | Bill UUID |

#### Response

**Status: 200 OK**

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

#### Example

```bash
curl -X DELETE https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000
```

## Error Responses

### Validation Errors

**Status: 400 Bad Request**

```json
{
  "error": "Validation Error",
  "message": "Amount must be a positive number",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

Common validation errors:
- Missing required fields
- Invalid amount (negative or non-numeric)
- Invalid type (not "receive" or "pay")
- Description too long (>200 characters)
- Tag/category too long (>50 characters)

### Not Found Errors

**Status: 404 Not Found**

```json
{
  "error": "Not Found",
  "message": "No bill found with UUID: 550e8400-e29b-41d4-a716-446655440999",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

### Server Errors

**Status: 500 Internal Server Error**

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "timestamp": "2025-07-09T11:00:00.000Z"
}
```

## Best Practices

### Creating Bills

1. **Use descriptive descriptions**: Make it easy to identify transactions later
2. **Choose consistent tags and categories**: This improves analytics and filtering
3. **Validate amounts**: Ensure positive numbers only
4. **Use appropriate types**: "receive" for income, "pay" for expenses

### Updating Bills

1. **Only update necessary fields**: Partial updates are supported
2. **Preserve historical accuracy**: Consider if updates change financial history
3. **Use meaningful descriptions**: Keep descriptions current and accurate

### Querying Bills

1. **Use appropriate pagination**: Don't request more data than needed
2. **Filter server-side**: Use query parameters instead of client-side filtering
3. **Cache results**: Store frequently accessed data locally
4. **Handle errors gracefully**: Always check response status

### Performance Tips

1. **Limit result sets**: Use `limit` parameter for large datasets
2. **Use date ranges**: Filter by date to reduce response size
3. **Batch operations**: Group multiple changes when possible
4. **Monitor usage**: Keep track of API usage patterns

## SDK Examples

### JavaScript/TypeScript

```typescript
interface CreateBillRequest {
  description: string;
  type: 'receive' | 'pay';
  amount: number;
  tag?: string;
  category?: string;
}

class BillsAPI {
  constructor(private baseUrl: string) {}

  async createBill(bill: CreateBillRequest): Promise<Bill> {
    const response = await fetch(`${this.baseUrl}/api/bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill)
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  }

  async getBills(filters?: BillFilters): Promise<BillsResponse> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }

    const response = await fetch(`${this.baseUrl}/api/bills?${params}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  }
}
```

### Python

```python
import requests
from typing import Optional, Dict, Any

class BillsAPI:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def create_bill(self, description: str, bill_type: str, amount: float, 
                   tag: Optional[str] = None, category: Optional[str] = None) -> Dict[str, Any]:
        bill_data = {
            'description': description,
            'type': bill_type,
            'amount': amount
        }
        
        if tag:
            bill_data['tag'] = tag
        if category:
            bill_data['category'] = category

        response = requests.post(
            f"{self.base_url}/api/bills",
            json=bill_data
        )
        
        data = response.json()
        if not data['success']:
            raise Exception(data['message'])
        
        return data['data']

    def get_bills(self, **filters) -> Dict[str, Any]:
        response = requests.get(
            f"{self.base_url}/api/bills",
            params=filters
        )
        
        data = response.json()
        if not data['success']:
            raise Exception(data['message'])
        
        return data['data']
```
