/**
 * No Budget API - Complete Accounting System
 * A lightweight personal finance API built on Cloudflare Workers
 * 
 * @version 1.0.0
 * @author No Budget API Contributors
 * @license MIT
 */

export default {
    async fetch(request, env, ctx) {
        try {
            // Get URL and path
            const url = new URL(request.url);
            const path = url.pathname;
            const method = request.method;
            
            console.log(`[INFO] ${method} ${path}`);
            
            // Health check endpoint
            if (path === '/health') {
                return new Response(
                    JSON.stringify({
                        success: true,
                        data: {
                            status: 'healthy',
                            service: 'no-budget-api',
                            version: '1.0.0',
                            timestamp: new Date().toISOString()
                        },
                        timestamp: new Date().toISOString()
                    }),
                    {
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    }
                );
            }
            
            // Serve frontend for root path and non-API routes
            if (path === '/' || path === '' || (!path.startsWith('/api') && !path.startsWith('/health'))) {
                try {
                    // Try to serve static assets first
                    if (env.ASSETS && (path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.ico') || path.includes('.'))) {
                        return env.ASSETS.fetch(request);
                    }
                    
                    // For all other routes, serve the main HTML file (SPA routing)
                    const indexRequest = new Request(new URL('/index.html', request.url), request);
                    return env.ASSETS ? env.ASSETS.fetch(indexRequest) : new Response('Frontend not available', { status: 404 });
                } catch (error) {
                    console.log('[INFO] Static assets not available, serving API info');
                    // Fallback to API info if static assets are not available
                    return new Response(
                        JSON.stringify({
                            success: true,
                            data: {
                                message: "No Budget API",
                                version: "1.0.0",
                                status: "active",
                                endpoints: {
                                    health: "/health",
                                    bills: "/api/bills",
                                    statistics: "/api/stats",
                                    tags: "/api/tags"
                                }
                            },
                            timestamp: new Date().toISOString()
                        }),
                        {
                            headers: { 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            }
                        }
                    );
                }
            }
            
            // CORS preflight handling
            if (method === 'OPTIONS') {
                return new Response(null, {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        'Access-Control-Max-Age': '86400'
                    }
                });
            }
            
            // Bills API - Main feature
            if (path.startsWith('/api/bills')) {
                return handleBillsApi(request, env, method, path, url);
            }
            
            // Statistics API
            if (path.startsWith('/api/stats')) {
                return handleStatsApi(request, env, method, path, url);
            }
            
            // Tags/Categories API
            if (path.startsWith('/api/tags')) {
                return handleTagsApi(request, env, method, path, url);
            }
            
            // Default 404 response
            return new Response(
                JSON.stringify({
                    error: 'Not Found',
                    message: `Endpoint ${path} not found`,
                    available_endpoints: [
                        'GET /',
                        'GET /health',
                        'GET /api/bills',
                        'POST /api/bills',
                        'GET /api/bills/{uuid}',
                        'PUT /api/bills/{uuid}',
                        'DELETE /api/bills/{uuid}',
                        'GET /api/stats',
                        'GET /api/stats/overview',
                        'GET /api/stats/monthly',
                        'GET /api/stats/category',
                        'GET /api/stats/trend',
                        'GET /api/tags',
                        'POST /api/tags'
                    ],
                    timestamp: new Date().toISOString()
                }),
                {
                    status: 404,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            
        } catch (error) {
            console.error(`[ERROR] Unhandled exception: ${error.message}`);
            console.error(`[ERROR] Stack: ${error.stack}`);
            
            return new Response(
                JSON.stringify({
                    error: 'Internal Server Error',
                    message: 'An unexpected error occurred',
                    timestamp: new Date().toISOString()
                }),
                {
                    status: 500,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }
    }
};

/**
 * Handle Bills API - Main CRUD operations
 */
async function handleBillsApi(request, env, method, path, url) {
    try {
        const pathParts = path.split('/');
        const billId = pathParts[3]; // /api/bills/{uuid}
        
        switch (method) {
            case 'GET':
                if (billId) {
                    // Get single bill by UUID
                    return getBillById(env, billId);
                } else {
                    // Get all bills with optional filtering
                    return getBills(env, url.searchParams);
                }
                
            case 'POST':
                if (path === '/api/bills') {
                    // Create new bill
                    const billData = await request.json();
                    return createBill(env, billData);
                }
                break;
                
            case 'PUT':
                if (billId) {
                    // Update existing bill
                    const billData = await request.json();
                    return updateBill(env, billId, billData);
                }
                break;
                
            case 'DELETE':
                if (billId) {
                    // Delete bill
                    return deleteBill(env, billId);
                }
                break;
        }
        
        return new Response(
            JSON.stringify({ error: 'Method not allowed or invalid path' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Bills API error', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

/**
 * Handle Statistics API
 */
async function handleStatsApi(request, env, method, path, url) {
    try {
        if (method !== 'GET') {
            return new Response(
                JSON.stringify({ error: 'Only GET method allowed for stats' }),
                { status: 405, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        const pathParts = path.split('/');
        const statsType = pathParts[3]; // /api/stats/{type}
        
        switch (statsType) {
            case 'overview':
                return getOverviewStats(env, url.searchParams);
            case 'monthly':
                return getMonthlyStats(env, url.searchParams);
            case 'category':
                return getCategoryStats(env, url.searchParams);
            case 'trend':
                return getTrendStats(env, url.searchParams);
            default:
                return getAllStats(env, url.searchParams);
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Stats API error', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

/**
 * Handle Tags/Categories API
 */
async function handleTagsApi(request, env, method, path, url) {
    try {
        const pathParts = path.split('/');
        const tagId = pathParts[3]; // /api/tags/{id}
        
        switch (method) {
            case 'GET':
                return getAllTags(env);
            case 'POST':
                const tagData = await request.json();
                return createTag(env, tagData);
            case 'PUT':
                if (tagId) {
                    const tagData = await request.json();
                    return updateTag(env, tagId, tagData);
                }
                break;
            case 'DELETE':
                if (tagId) {
                    return deleteTag(env, tagId);
                }
                break;
            default:
                return new Response(
                    JSON.stringify({ 
                        success: false,
                        error: 'Method not allowed' 
                    }),
                    { 
                        status: 405, 
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        } 
                    }
                );
        }
        
        return new Response(
            JSON.stringify({ 
                success: false,
                error: 'Invalid request' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ 
                success: false,
                error: 'Tags API error', 
                message: error.message 
            }),
            { 
                status: 500, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
}

// Utility Functions
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Bills CRUD Operations
async function createBill(env, billData) {
    // Validate required fields
    if (!billData.description || typeof billData.description !== 'string') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Description is required and must be a string' 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
    
    if (!billData.type || !['income', 'expense', 'receive', 'pay'].includes(billData.type)) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Type must be either "income", "expense", "receive", or "pay"' 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
    
    if (!billData.amount || typeof billData.amount !== 'number') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Amount is required and must be a number' 
            }),
            { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
    }
    
    const bills = await getAllBillsFromStorage(env);
    
    // Convert frontend format to backend format
    const backendType = billData.type === 'income' ? 'receive' : billData.type === 'expense' ? 'pay' : billData.type;
    
    const newBill = {
        uuid: generateUUID(),
        id: generateUUID(), // Also add id for frontend compatibility
        description: billData.description,
        type: backendType,
        amount: Math.abs(billData.amount), // Store as positive number
        time: billData.date ? `${billData.date}T12:00:00.000Z` : new Date().toISOString(),
        date: billData.date || new Date().toISOString().split('T')[0],
        tag: billData.tag || null,
        category: billData.category || billData.tag || 'general',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    
    bills.push(newBill);
    await env.KV.put('bills', JSON.stringify(bills));
    
    // Transform back to frontend format
    const frontendBill = {
        id: newBill.uuid,
        description: newBill.description,
        amount: newBill.type === 'receive' ? newBill.amount : -newBill.amount,
        type: newBill.type === 'receive' ? 'income' : 'expense',
        tag: newBill.tag,
        date: newBill.date,
        created_at: newBill.created_at,
        updated_at: newBill.updated_at
    };
    
    return new Response(
        JSON.stringify({
            success: true,
            data: frontendBill,
            timestamp: new Date().toISOString()
        }),
        { 
            status: 201, 
            headers: { 
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*' 
            } 
        }
    );
}

async function getBills(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    let filteredBills = bills;
    
    // Apply filters
    const type = searchParams.get('type');
    const tag = searchParams.get('tag');
    const category = searchParams.get('category');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    const limit = parseInt(searchParams.get('limit')) || null;
    const offset = parseInt(searchParams.get('offset')) || 0;
    
    if (type) {
        filteredBills = filteredBills.filter(bill => bill.type === type);
    }
    
    if (tag) {
        filteredBills = filteredBills.filter(bill => bill.tag === tag);
    }
    
    if (category) {
        filteredBills = filteredBills.filter(bill => bill.category === category);
    }
    
    if (startDate) {
        filteredBills = filteredBills.filter(bill => new Date(bill.time || bill.date) >= new Date(startDate));
    }
    
    if (endDate) {
        filteredBills = filteredBills.filter(bill => new Date(bill.time || bill.date) <= new Date(endDate));
    }
    
    // Sort by time (newest first)
    filteredBills.sort((a, b) => new Date(b.time || b.date) - new Date(a.time || a.date));
    
    // Apply pagination
    const total = filteredBills.length;
    if (limit) {
        filteredBills = filteredBills.slice(offset, offset + limit);
    }
    
    // Transform to frontend format
    const transformedBills = filteredBills.map(bill => ({
        id: bill.uuid || bill.id,
        description: bill.description,
        amount: bill.amount,
        type: bill.type === 'receive' ? 'income' : bill.type === 'pay' ? 'expense' : bill.type,
        tag: bill.tag,
        date: (bill.time || bill.date || '').split('T')[0], // Extract date part
        created_at: bill.created_at,
        updated_at: bill.updated_at
    }));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: transformedBills,
            meta: {
                total: total,
                offset: offset,
                limit: limit
            },
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function getBillById(env, billId) {
    const bills = await getAllBillsFromStorage(env);
    const bill = bills.find(b => b.uuid === billId);
    
    if (!bill) {
        return new Response(
            JSON.stringify({ error: 'Bill not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    return new Response(
        JSON.stringify(bill),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function updateBill(env, billId, billData) {
    const bills = await getAllBillsFromStorage(env);
    const billIndex = bills.findIndex(b => b.uuid === billId || b.id === billId);
    
    if (billIndex === -1) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Bill not found' 
            }),
            { 
                status: 404, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    // Validate required fields
    if (!billData.description || typeof billData.description !== 'string') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Description is required and must be a string' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    if (!billData.type || !['income', 'expense', 'receive', 'pay'].includes(billData.type)) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Type must be either "income", "expense", "receive", or "pay"' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    if (!billData.amount || typeof billData.amount !== 'number') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Amount is required and must be a number' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    // Convert frontend format to backend format
    const backendType = billData.type === 'income' ? 'receive' : billData.type === 'expense' ? 'pay' : billData.type;
    
    // Update bill
    bills[billIndex] = {
        ...bills[billIndex],
        description: billData.description,
        type: backendType,
        amount: Math.abs(billData.amount),
        time: billData.date ? `${billData.date}T12:00:00.000Z` : bills[billIndex].time,
        date: billData.date || bills[billIndex].date,
        tag: billData.tag || null,
        category: billData.category || billData.tag || bills[billIndex].category,
        updated_at: new Date().toISOString()
    };
    
    await env.KV.put('bills', JSON.stringify(bills));
    
    // Transform back to frontend format
    const updatedBill = bills[billIndex];
    const frontendBill = {
        id: updatedBill.uuid || updatedBill.id,
        description: updatedBill.description,
        amount: updatedBill.type === 'receive' ? updatedBill.amount : -updatedBill.amount,
        type: updatedBill.type === 'receive' ? 'income' : 'expense',
        tag: updatedBill.tag,
        date: updatedBill.date,
        created_at: updatedBill.created_at,
        updated_at: updatedBill.updated_at
    };
    
    return new Response(
        JSON.stringify({
            success: true,
            data: frontendBill,
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function deleteBill(env, billId) {
    const bills = await getAllBillsFromStorage(env);
    const billIndex = bills.findIndex(b => b.uuid === billId || b.id === billId);
    
    if (billIndex === -1) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Bill not found' 
            }),
            { 
                status: 404, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    const deletedBill = bills.splice(billIndex, 1)[0];
    await env.KV.put('bills', JSON.stringify(bills));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: { message: 'Bill deleted successfully', bill: deletedBill },
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

// Statistics Functions
async function getAllStats(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    const month = searchParams.get('month'); // Format: YYYY-MM
    
    let filteredBills = bills;
    
    // Filter by month if provided
    if (month) {
        filteredBills = bills.filter(bill => {
            const billDate = bill.time || bill.date;
            return billDate && billDate.startsWith(month);
        });
    }
    
    const totalIncome = filteredBills
        .filter(bill => bill.type === 'receive')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const totalExpense = filteredBills
        .filter(bill => bill.type === 'pay')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const netBalance = totalIncome - totalExpense;
    
    // Category statistics for expenses only
    const categoryStats = {};
    filteredBills
        .filter(bill => bill.type === 'pay' && bill.tag)
        .forEach(bill => {
            if (!categoryStats[bill.tag]) {
                categoryStats[bill.tag] = 0;
            }
            categoryStats[bill.tag] += bill.amount;
        });
    
    const categoryStatsArray = Object.entries(categoryStats)
        .map(([tag, amount]) => ({ tag, amount: -amount })) // Make expenses negative for display
        .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: {
                totalIncome,
                totalExpense: -totalExpense, // Make negative for display
                netBalance,
                billsCount: filteredBills.length,
                categoryStats: categoryStatsArray
            },
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function getOverviewStats(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    
    // Current month stats
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthBills = bills.filter(bill => new Date(bill.time) >= currentMonthStart);
    
    const monthlyReceive = currentMonthBills
        .filter(bill => bill.type === 'receive')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const monthlyPay = currentMonthBills
        .filter(bill => bill.type === 'pay')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    // All time stats
    const totalReceive = bills
        .filter(bill => bill.type === 'receive')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const totalPay = bills
        .filter(bill => bill.type === 'pay')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    // Top categories
    const categoryStats = {};
    bills.forEach(bill => {
        if (!categoryStats[bill.category]) {
            categoryStats[bill.category] = { receive: 0, pay: 0, count: 0 };
        }
        categoryStats[bill.category][bill.type] += bill.amount;
        categoryStats[bill.category].count += 1;
    });
    
    return new Response(
        JSON.stringify({
            current_month: {
                receive: monthlyReceive,
                pay: monthlyPay,
                balance: monthlyReceive - monthlyPay,
                count: currentMonthBills.length
            },
            all_time: {
                receive: totalReceive,
                pay: totalPay,
                balance: totalReceive - totalPay,
                count: bills.length
            },
            top_categories: Object.entries(categoryStats)
                .sort(([,a], [,b]) => (b.receive + b.pay) - (a.receive + a.pay))
                .slice(0, 5)
                .map(([category, stats]) => ({ category, ...stats }))
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function getMonthlyStats(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    const year = parseInt(searchParams.get('year')) || new Date().getFullYear();
    
    const monthlyData = {};
    
    for (let month = 0; month < 12; month++) {
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);
        
        const monthBills = bills.filter(bill => {
            const billDate = new Date(bill.time);
            return billDate >= monthStart && billDate <= monthEnd;
        });
        
        const receive = monthBills
            .filter(bill => bill.type === 'receive')
            .reduce((sum, bill) => sum + bill.amount, 0);
        
        const pay = monthBills
            .filter(bill => bill.type === 'pay')
            .reduce((sum, bill) => sum + bill.amount, 0);
        
        monthlyData[month + 1] = {
            month: month + 1,
            receive: receive,
            pay: pay,
            balance: receive - pay,
            count: monthBills.length
        };
    }
    
    return new Response(
        JSON.stringify({
            year: year,
            monthly_data: monthlyData
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function getCategoryStats(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');
    
    let filteredBills = bills;
    if (startDate) {
        filteredBills = filteredBills.filter(bill => new Date(bill.time) >= new Date(startDate));
    }
    if (endDate) {
        filteredBills = filteredBills.filter(bill => new Date(bill.time) <= new Date(endDate));
    }
    
    const categoryStats = {};
    filteredBills.forEach(bill => {
        if (!categoryStats[bill.category]) {
            categoryStats[bill.category] = {
                receive: 0,
                pay: 0,
                count: 0,
                bills: []
            };
        }
        categoryStats[bill.category][bill.type] += bill.amount;
        categoryStats[bill.category].count += 1;
        categoryStats[bill.category].bills.push({
            uuid: bill.uuid,
            description: bill.description,
            amount: bill.amount,
            type: bill.type,
            time: bill.time
        });
    });
    
    // Calculate percentages
    const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
    
    Object.keys(categoryStats).forEach(category => {
        const categoryTotal = categoryStats[category].receive + categoryStats[category].pay;
        categoryStats[category].percentage = totalAmount > 0 ? (categoryTotal / totalAmount * 100).toFixed(2) : 0;
        categoryStats[category].balance = categoryStats[category].receive - categoryStats[category].pay;
    });
    
    return new Response(
        JSON.stringify({
            categories: categoryStats,
            summary: {
                total_categories: Object.keys(categoryStats).length,
                period: {
                    start: startDate || 'all time',
                    end: endDate || 'all time'
                }
            }
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function getTrendStats(env, searchParams) {
    const bills = await getAllBillsFromStorage(env);
    const days = parseInt(searchParams.get('days')) || 30;
    
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const dailyStats = {};
    
    // Initialize all days
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toISOString().split('T')[0];
        dailyStats[dateKey] = { receive: 0, pay: 0, count: 0 };
    }
    
    // Populate with actual data
    bills.forEach(bill => {
        const billDate = new Date(bill.time);
        if (billDate >= startDate && billDate <= endDate) {
            const dateKey = billDate.toISOString().split('T')[0];
            if (dailyStats[dateKey]) {
                dailyStats[dateKey][bill.type] += bill.amount;
                dailyStats[dateKey].count += 1;
            }
        }
    });
    
    // Convert to array and add balance
    const trendData = Object.entries(dailyStats).map(([date, stats]) => ({
        date,
        receive: stats.receive,
        pay: stats.pay,
        balance: stats.receive - stats.pay,
        count: stats.count
    }));
    
    return new Response(
        JSON.stringify({
            period_days: days,
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0],
            trend_data: trendData
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

// Tags/Categories Functions
async function getAllTags(env) {
    const existingTags = await env.KV.get('custom_tags');
    const customTags = existingTags ? JSON.parse(existingTags) : [];
    
    return new Response(
        JSON.stringify({
            success: true,
            data: customTags,
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function createTag(env, tagData) {
    if (!tagData.name || typeof tagData.name !== 'string') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag name is required and must be a string' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }

    const existingTags = await env.KV.get('custom_tags');
    const tags = existingTags ? JSON.parse(existingTags) : [];
    
    // Check if tag already exists
    if (tags.find(tag => tag.name.toLowerCase() === tagData.name.toLowerCase())) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag with this name already exists' 
            }),
            { 
                status: 409, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    const newTag = {
        id: generateUUID(),
        name: tagData.name.trim(),
        color: tagData.color || '#667eea',
        description: tagData.description || '',
        created_at: new Date().toISOString()
    };
    
    tags.push(newTag);
    await env.KV.put('custom_tags', JSON.stringify(tags));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: newTag,
            timestamp: new Date().toISOString()
        }),
        { 
            status: 201, 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function updateTag(env, tagId, tagData) {
    if (!tagData.name || typeof tagData.name !== 'string') {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag name is required and must be a string' 
            }),
            { 
                status: 400, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }

    const existingTags = await env.KV.get('custom_tags');
    const tags = existingTags ? JSON.parse(existingTags) : [];
    
    const tagIndex = tags.findIndex(tag => tag.id === tagId);
    if (tagIndex === -1) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag not found' 
            }),
            { 
                status: 404, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    // Check if another tag with same name exists
    const existingTag = tags.find((tag, index) => 
        index !== tagIndex && tag.name.toLowerCase() === tagData.name.toLowerCase()
    );
    
    if (existingTag) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag with this name already exists' 
            }),
            { 
                status: 409, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    // Update tag
    tags[tagIndex] = {
        ...tags[tagIndex],
        name: tagData.name.trim(),
        color: tagData.color || tags[tagIndex].color,
        description: tagData.description || tags[tagIndex].description,
        updated_at: new Date().toISOString()
    };
    
    await env.KV.put('custom_tags', JSON.stringify(tags));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: tags[tagIndex],
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

async function deleteTag(env, tagId) {
    const existingTags = await env.KV.get('custom_tags');
    const tags = existingTags ? JSON.parse(existingTags) : [];
    
    const tagIndex = tags.findIndex(tag => tag.id === tagId);
    if (tagIndex === -1) {
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: 'Tag not found' 
            }),
            { 
                status: 404, 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                } 
            }
        );
    }
    
    const deletedTag = tags.splice(tagIndex, 1)[0];
    await env.KV.put('custom_tags', JSON.stringify(tags));
    
    // Also remove the tag from any bills that use it
    const bills = await getAllBillsFromStorage(env);
    const updatedBills = bills.map(bill => {
        if (bill.tag === deletedTag.name) {
            return { ...bill, tag: null };
        }
        return bill;
    });
    await env.KV.put('bills', JSON.stringify(updatedBills));
    
    return new Response(
        JSON.stringify({
            success: true,
            data: { message: 'Tag deleted successfully', tag: deletedTag },
            timestamp: new Date().toISOString()
        }),
        { 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            } 
        }
    );
}

// Data access helper
async function getAllBillsFromStorage(env) {
    const billsData = await env.KV.get('bills');
    return billsData ? JSON.parse(billsData) : [];
}
