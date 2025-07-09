# Examples

Practical examples and use cases for No Budget API.

## Basic Usage Examples

### Creating Your First Bill

```bash
# Income example
curl -X POST https://your-worker.workers.dev/api/bills \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Salary payment",
    "type": "receive",
    "amount": 3000.00,
    "tag": "work",
    "category": "income"
  }'
```

```bash
# Expense example  
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

### Retrieving Bills

```bash
# Get all bills
curl https://your-worker.workers.dev/api/bills

# Get bills with pagination
curl "https://your-worker.workers.dev/api/bills?limit=10&offset=0"

# Filter by type
curl "https://your-worker.workers.dev/api/bills?type=pay"

# Filter by date range
curl "https://your-worker.workers.dev/api/bills?start_date=2025-01-01&end_date=2025-12-31"
```

### Updating Bills

```bash
curl -X PUT https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated grocery shopping",
    "amount": 92.75,
    "tag": "food",
    "category": "groceries"
  }'
```

### Getting Statistics

```bash
# Overview dashboard
curl https://your-worker.workers.dev/api/stats/overview

# Monthly breakdown for 2025
curl "https://your-worker.workers.dev/api/stats/monthly?year=2025"

# Category analysis
curl https://your-worker.workers.dev/api/stats/category

# 30-day trend
curl "https://your-worker.workers.dev/api/stats/trend?days=30"
```

## JavaScript Integration

### Simple Budget Tracker

```javascript
class BudgetTracker {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async addExpense(description, amount, category = 'other') {
    const response = await fetch(`${this.apiUrl}/api/bills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        type: 'pay',
        amount,
        category,
        tag: category
      })
    });
    
    return await response.json();
  }

  async addIncome(description, amount, source = 'work') {
    const response = await fetch(`${this.apiUrl}/api/bills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        type: 'receive',
        amount,
        category: 'income',
        tag: source
      })
    });
    
    return await response.json();
  }

  async getMonthlyOverview() {
    const response = await fetch(`${this.apiUrl}/api/stats/overview`);
    return await response.json();
  }

  async getExpensesByCategory() {
    const response = await fetch(`${this.apiUrl}/api/stats/category`);
    return await response.json();
  }
}

// Usage
const tracker = new BudgetTracker('https://your-worker.workers.dev');

// Add some transactions
await tracker.addIncome('Salary', 3000, 'work');
await tracker.addExpense('Coffee', 4.50, 'dining');
await tracker.addExpense('Gas', 45.00, 'transport');

// Get overview
const overview = await tracker.getMonthlyOverview();
console.log('Current month balance:', overview.data.currentMonth.balance);
```

### React Hook for Budget Data

```jsx
import { useState, useEffect } from 'react';

function useBudgetData(apiUrl) {
  const [bills, setBills] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBills = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/bills`);
      const data = await response.json();
      setBills(data.success ? data.data.bills : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/stats/overview`);
      const data = await response.json();
      setOverview(data.success ? data.data : null);
    } catch (err) {
      setError(err.message);
    }
  };

  const addBill = async (billData) => {
    try {
      const response = await fetch(`${apiUrl}/api/bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData)
      });
      
      if (response.ok) {
        await fetchBills();
        await fetchOverview();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchBills(), fetchOverview()]);
      setLoading(false);
    };
    
    loadData();
  }, [apiUrl]);

  return {
    bills,
    overview,
    loading,
    error,
    addBill,
    refresh: () => Promise.all([fetchBills(), fetchOverview()])
  };
}

// Usage in component
function BudgetDashboard() {
  const { bills, overview, loading, addBill } = useBudgetData('https://your-worker.workers.dev');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Budget Overview</h1>
      {overview && (
        <div>
          <p>Income: ${overview.currentMonth.income}</p>
          <p>Expenses: ${overview.currentMonth.expenses}</p>
          <p>Balance: ${overview.currentMonth.balance}</p>
        </div>
      )}
      
      <h2>Recent Transactions</h2>
      <ul>
        {bills.slice(0, 10).map(bill => (
          <li key={bill.uuid}>
            {bill.description}: ${bill.amount} ({bill.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Python Integration

### Personal Finance Analyzer

```python
import requests
from datetime import datetime, timedelta
import pandas as pd

class FinanceAnalyzer:
    def __init__(self, api_url):
        self.api_url = api_url
    
    def get_bills(self, start_date=None, end_date=None, bill_type=None):
        """Fetch bills with optional filtering"""
        params = {}
        if start_date:
            params['start_date'] = start_date
        if end_date:
            params['end_date'] = end_date
        if bill_type:
            params['type'] = bill_type
            
        response = requests.get(f"{self.api_url}/api/bills", params=params)
        data = response.json()
        
        return data['data']['bills'] if data['success'] else []
    
    def add_bill(self, description, amount, bill_type, category='other', tag='general'):
        """Add a new bill"""
        bill_data = {
            'description': description,
            'type': bill_type,
            'amount': amount,
            'category': category,
            'tag': tag
        }
        
        response = requests.post(
            f"{self.api_url}/api/bills",
            json=bill_data
        )
        
        return response.json()
    
    def get_spending_by_category(self):
        """Get spending breakdown by category"""
        response = requests.get(f"{self.api_url}/api/stats/category")
        return response.json()
    
    def analyze_spending_trends(self, days=30):
        """Analyze spending trends over time"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        bills = self.get_bills(
            start_date=start_date.isoformat(),
            end_date=end_date.isoformat(),
            bill_type='pay'
        )
        
        # Convert to pandas DataFrame for analysis
        df = pd.DataFrame(bills)
        if df.empty:
            return {}
            
        df['time'] = pd.to_datetime(df['time'])
        df['date'] = df['time'].dt.date
        
        # Daily spending
        daily_spending = df.groupby('date')['amount'].sum()
        
        # Category breakdown
        category_spending = df.groupby('category')['amount'].sum()
        
        return {
            'daily_spending': daily_spending.to_dict(),
            'category_breakdown': category_spending.to_dict(),
            'total_spent': df['amount'].sum(),
            'average_daily': daily_spending.mean(),
            'max_daily': daily_spending.max()
        }

# Usage example
analyzer = FinanceAnalyzer('https://your-worker.workers.dev')

# Add some sample data
analyzer.add_bill('Morning coffee', 4.50, 'pay', 'dining', 'coffee')
analyzer.add_bill('Lunch', 12.99, 'pay', 'dining', 'food')
analyzer.add_bill('Freelance payment', 500.00, 'receive', 'income', 'work')

# Analyze trends
trends = analyzer.analyze_spending_trends(30)
print(f"Total spent in last 30 days: ${trends['total_spent']:.2f}")
print(f"Average daily spending: ${trends['average_daily']:.2f}")

# Get category breakdown
categories = analyzer.get_spending_by_category()
if categories['success']:
    for cat in categories['data']['categories']:
        print(f"{cat['category']}: ${cat['expenses']:.2f}")
```

## Mobile App Integration (React Native)

```javascript
// BudgetService.js
class BudgetService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async addExpense(description, amount, category) {
    return this.makeRequest('/api/bills', {
      method: 'POST',
      body: JSON.stringify({
        description,
        type: 'pay',
        amount: parseFloat(amount),
        category,
        tag: category
      })
    });
  }

  async getRecentTransactions(limit = 20) {
    return this.makeRequest(`/api/bills?limit=${limit}`);
  }

  async getOverview() {
    return this.makeRequest('/api/stats/overview');
  }
}

// Usage in React Native component
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const budgetService = new BudgetService('https://your-worker.workers.dev');

export default function BudgetApp() {
  const [overview, setOverview] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [overviewData, transactionsData] = await Promise.all([
        budgetService.getOverview(),
        budgetService.getRecentTransactions()
      ]);

      setOverview(overviewData.data);
      setTransactions(transactionsData.data.bills);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const addExpense = async () => {
    if (!description || !amount) return;

    try {
      await budgetService.addExpense(description, amount, 'other');
      setDescription('');
      setAmount('');
      loadData(); // Refresh data
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Budget Tracker</Text>
      
      {overview && (
        <View style={{ marginBottom: 20 }}>
          <Text>Current Balance: ${overview.currentMonth.balance}</Text>
          <Text>This Month Income: ${overview.currentMonth.income}</Text>
          <Text>This Month Expenses: ${overview.currentMonth.expenses}</Text>
        </View>
      )}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      
      <Button title="Add Expense" onPress={addExpense} />

      <Text style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
        Recent Transactions
      </Text>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.description}</Text>
            <Text>${item.amount} - {item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

## Command Line Tool

```bash
#!/bin/bash
# budget-cli.sh - Simple command line interface

API_URL="https://your-worker.workers.dev"

case "$1" in
  "add-expense")
    curl -X POST "$API_URL/api/bills" \
      -H "Content-Type: application/json" \
      -d "{
        \"description\": \"$2\",
        \"type\": \"pay\",
        \"amount\": $3,
        \"category\": \"${4:-other}\"
      }"
    ;;
  "add-income")
    curl -X POST "$API_URL/api/bills" \
      -H "Content-Type: application/json" \
      -d "{
        \"description\": \"$2\",
        \"type\": \"receive\",
        \"amount\": $3,
        \"category\": \"income\"
      }"
    ;;
  "overview")
    curl "$API_URL/api/stats/overview" | jq '.data'
    ;;
  "recent")
    curl "$API_URL/api/bills?limit=${2:-10}" | jq '.data.bills'
    ;;
  *)
    echo "Usage: $0 {add-expense|add-income|overview|recent}"
    echo "Examples:"
    echo "  $0 add-expense \"Coffee\" 4.50 dining"
    echo "  $0 add-income \"Salary\" 3000"
    echo "  $0 overview"
    echo "  $0 recent 5"
    ;;
esac
```

## More Examples

For more advanced examples and integrations:

- [Advanced Filtering](/examples/advanced-filtering.html)
- [Statistics Dashboard](/examples/statistics-dashboard.html)
- [Third-party Integrations](/examples/integration.html)
