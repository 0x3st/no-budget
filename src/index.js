/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// --- Data Structures ---

// Default categories with IDs and icons
let CATEGORIES = [
  { id: 'cat-food', name: 'Groceries', icon: '🛒', type: 'expense' },
  { id: 'cat-transport', name: 'Transport', icon: '🚗', type: 'expense' },
  { id: 'cat-housing', name: 'Housing', icon: '🏠', type: 'expense' },
  { id: 'cat-shopping', name: 'Shopping', icon: '🛍️', type: 'expense' },
  { id: 'cat-entertainment', name: 'Entertainment', icon: '🎬', type: 'expense' },
  { id: 'cat-health', name: 'Health', icon: '❤️', type: 'expense' },
  { id: 'cat-salary', name: 'Salary', icon: '💰', type: 'income' },
  { id: 'cat-other', name: 'Other', icon: '📦', type: 'expense' },
];

class Category {
  constructor(data) {
    this.id = data.id || `cat-${crypto.randomUUID()}`;
    this.name = data.name;
    this.icon = data.icon || '📁';
    this.type = data.type || 'expense'; // 'income' or 'expense'
  }

  validate() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      throw new Error('Category name is required.');
    }
    if (!['income', 'expense'].includes(this.type)) {
      throw new Error('Invalid category type.');
    }
  }
}

class Transaction {
  constructor(data) {
    this.id = data.id || crypto.randomUUID();
    this.amount = parseFloat(data.amount);
    this.categoryId = data.categoryId;
    this.description = data.description || '';
    this.timestamp = data.timestamp || new Date().toISOString();
  }

  validate(categories) {
    if (!this.amount || isNaN(this.amount) || this.amount <= 0) {
      throw new Error('Transaction amount must be a positive number.');
    }
    if (!this.categoryId) {
      throw new Error('Category is required.');
    }
    if (!categories.find((c) => c.id === this.categoryId)) {
      throw new Error('Invalid category specified.');
    }
  }
}

class DataManager {
  constructor(kv) {
    this.kv = kv;
  }

  async getTransactions() {
    const [transactionsData, categories] = await Promise.all([
      this.kv.get('transactions', 'json'),
      this.getCategories(),
    ]);
    const transactions = transactionsData || [];
    // Populate category details for each transaction
    return transactions.map((t) => ({
      ...t,
      category: categories.find((c) => c.id === t.categoryId) || null,
    }));
  }

  async addTransaction(data) {
    const categories = await this.getCategories();
    const transaction = new Transaction(data);
    transaction.validate(categories);

    const transactionsData = await this.kv.get('transactions', 'json');
    const transactions = transactionsData || [];
    transactions.push(transaction);

    await this.kv.put('transactions', JSON.stringify(transactions));
    return transaction;
  }

  async getCategories() {
    const categoriesData = await this.kv.get('categories', 'json');
    return categoriesData || CATEGORIES;
  }

  async addCategory(data) {
    const newCategory = new Category(data);
    newCategory.validate();

    const categories = await this.getCategories();
    if (categories.find(c => c.name.toLowerCase() === newCategory.name.toLowerCase())) {
      throw new Error('A category with this name already exists.');
    }

    categories.push(newCategory);
    await this.kv.put('categories', JSON.stringify(categories));
    return newCategory;
  }

  async updateCategory(id, data) {
    const categories = await this.getCategories();
    const categoryIndex = categories.findIndex(c => c.id === id);

    if (categoryIndex === -1) {
      throw new Error('Category not found.');
    }

    const updatedCategory = new Category({ ...categories[categoryIndex], ...data, id });
    updatedCategory.validate();

    // Check for name collision, excluding the current category
    if (categories.some(c => c.id !== id && c.name.toLowerCase() === updatedCategory.name.toLowerCase())) {
      throw new Error('A category with this name already exists.');
    }

    categories[categoryIndex] = updatedCategory;
    await this.kv.put('categories', JSON.stringify(categories));
    return updatedCategory;
  }

  async deleteCategory(id) {
    let categories = await this.getCategories();
    const initialCount = categories.length;
    categories = categories.filter(c => c.id !== id);

    if (categories.length === initialCount) {
      throw new Error('Category not found.');
    }

    // Check if category is in use by transactions before deleting
    const transactionsData = await this.kv.get('transactions', 'json');
    const transactions = transactionsData || [];
    if (transactions.some(t => t.categoryId === id)) {
      throw new Error('Cannot delete category as it is currently in use by transactions.');
    }

    await this.kv.put('categories', JSON.stringify(categories));
    return { success: true };
  }
}

class Statistics {
  constructor(transactions, categories) {
    this.transactions = transactions;
    this.categories = categories;
  }

  calculate() {
    const spendingByCategory = {};

    this.transactions.forEach((t) => {
      const category = this.categories.find((c) => c.id === t.categoryId);
      // Only include expense categories in spending stats
      if (category && category.type === 'expense') {
        if (!spendingByCategory[t.categoryId]) {
          spendingByCategory[t.categoryId] = {
            category: category,
            total: 0,
          };
        }
        spendingByCategory[t.categoryId].total += t.amount;
      }
    });

    return {
      spendingByCategory: Object.values(spendingByCategory),
    };
  }
}

// --- Utility Functions ---
const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' },
    status,
  });
};


export default {
  async fetch(request, env, ctx) {
    try {
      // Initialize categories in KV if they don't exist.
      const categories = await env.NO_BUDGET_KV.get('categories');
      if (!categories) {
        await env.NO_BUDGET_KV.put('categories', JSON.stringify(CATEGORIES));
      }

      const url = new URL(request.url);
      const { pathname, searchParams } = url;
      const method = request.method;

      console.log(`${method} ${pathname}`);

      // Route matching
      if (pathname === '/api/statistics' && method === 'GET') {
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const transactions = await dataManager.getTransactions();
          const categories = await dataManager.getCategories();
          const stats = new Statistics(transactions, categories).calculate();
          return jsonResponse(stats);
        } catch (e) {
          return jsonResponse({ error: e.message }, 500);
        }
      }

      if (pathname === '/api/transactions' && method === 'GET') {
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const transactions = await dataManager.getTransactions();
          return jsonResponse(transactions);
        } catch (e) {
          return jsonResponse({ error: e.message }, 500);
        }
      }

      if (pathname === '/api/transactions' && method === 'POST') {
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const body = await request.json();
          const transaction = await dataManager.addTransaction(body);
          return jsonResponse(transaction, 201);
        } catch (e) {
          return jsonResponse({ error: e.message }, 400);
        }
      }

      if (pathname === '/api/categories' && method === 'GET') {
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const categories = await dataManager.getCategories();
          return jsonResponse(categories);
        } catch (e) {
          return jsonResponse({ error: e.message }, 500);
        }
      }

      if (pathname === '/api/categories' && method === 'POST') {
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const body = await request.json();
          const newCategory = await dataManager.addCategory(body);
          return jsonResponse(newCategory, 201);
        } catch (e) {
          return jsonResponse({ error: e.message }, 400);
        }
      }

      if (pathname.match(/^\/api\/categories\/(.+)$/) && method === 'PUT') {
        const id = pathname.split('/').pop();
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          const body = await request.json();
          const updatedCategory = await dataManager.updateCategory(id, body);
          return jsonResponse(updatedCategory);
        } catch (e) {
          if (e.message.includes('not found')) {
            return jsonResponse({ error: e.message }, 404);
          }
          return jsonResponse({ error: e.message }, 400);
        }
      }

      if (pathname.match(/^\/api\/categories\/(.+)$/) && method === 'DELETE') {
        const id = pathname.split('/').pop();
        const dataManager = new DataManager(env.NO_BUDGET_KV);
        try {
          await dataManager.deleteCategory(id);
          return new Response(null, { status: 204 });
        } catch (e) {
          if (e.message.includes('not found')) {
            return jsonResponse({ error: e.message }, 404);
          }
          if (e.message.includes('in use')) {
            return jsonResponse({ error: e.message }, 409);
          }
          return jsonResponse({ error: e.message }, 500);
        }
      }

      // Handle static assets
      if (pathname.startsWith('/api/')) {
        return jsonResponse({ error: 'API endpoint not found' }, 404);
      }

      // Serve static assets
      return await env.ASSETS.fetch(request);

    } catch (err) {
      console.error('Caught in fetch handler:', err);
      return jsonResponse({ 
        error: 'Internal Server Error', 
        details: err.message,
        stack: err.stack 
      }, 500);
    }
  },
};