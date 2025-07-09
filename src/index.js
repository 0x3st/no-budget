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
            
            // Root path - API status
            if (path === '/' || path === '') {
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
        switch (method) {
            case 'GET':
                return getAllTags(env);
            case 'POST':
                const tagData = await request.json();
                return createTag(env, tagData);
            default:
                return new Response(
                    JSON.stringify({ error: 'Method not allowed' }),
                    { status: 405, headers: { 'Content-Type': 'application/json' } }
                );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Tags API error', message: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
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

function validateBillData(data) {
    const errors = [];
    
    if (!data.description || typeof data.description !== 'string') {
        errors.push('Description is required and must be a string');
    }
    
    if (!data.type || !['receive', 'pay'].includes(data.type)) {
        errors.push('Type must be either "receive" or "pay"');
    }
    
    if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
        errors.push('Amount is required and must be a positive number');
    }
    
    if (data.time && isNaN(new Date(data.time))) {
        errors.push('Time must be a valid ISO date string');
    }
    
    return errors;
}

// Bills CRUD Operations
async function createBill(env, billData) {
    const errors = validateBillData(billData);
    if (errors.length > 0) {
        return new Response(
            JSON.stringify({ error: 'Validation failed', details: errors }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    const bills = await getAllBillsFromStorage(env);
    const newBill = {
        uuid: generateUUID(),
        description: billData.description,
        type: billData.type, // 'receive' or 'pay'
        amount: billData.amount,
        time: billData.time || new Date().toISOString(),
        tag: billData.tag || 'general',
        category: billData.category || billData.tag || 'general',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    
    bills.push(newBill);
    await env.KV.put('bills', JSON.stringify(bills));
    
    return new Response(
        JSON.stringify(newBill),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
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
        filteredBills = filteredBills.filter(bill => new Date(bill.time) >= new Date(startDate));
    }
    
    if (endDate) {
        filteredBills = filteredBills.filter(bill => new Date(bill.time) <= new Date(endDate));
    }
    
    // Sort by time (newest first)
    filteredBills.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Apply pagination
    const total = filteredBills.length;
    if (limit) {
        filteredBills = filteredBills.slice(offset, offset + limit);
    }
    
    return new Response(
        JSON.stringify({
            bills: filteredBills,
            total: total,
            offset: offset,
            limit: limit
        }),
        { headers: { 'Content-Type': 'application/json' } }
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
    const billIndex = bills.findIndex(b => b.uuid === billId);
    
    if (billIndex === -1) {
        return new Response(
            JSON.stringify({ error: 'Bill not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    const errors = validateBillData(billData);
    if (errors.length > 0) {
        return new Response(
            JSON.stringify({ error: 'Validation failed', details: errors }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    // Update bill
    bills[billIndex] = {
        ...bills[billIndex],
        description: billData.description,
        type: billData.type,
        amount: billData.amount,
        time: billData.time || bills[billIndex].time,
        tag: billData.tag || bills[billIndex].tag,
        category: billData.category || billData.tag || bills[billIndex].category,
        updated_at: new Date().toISOString()
    };
    
    await env.KV.put('bills', JSON.stringify(bills));
    
    return new Response(
        JSON.stringify(bills[billIndex]),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function deleteBill(env, billId) {
    const bills = await getAllBillsFromStorage(env);
    const billIndex = bills.findIndex(b => b.uuid === billId);
    
    if (billIndex === -1) {
        return new Response(
            JSON.stringify({ error: 'Bill not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    const deletedBill = bills.splice(billIndex, 1)[0];
    await env.KV.put('bills', JSON.stringify(bills));
    
    return new Response(
        JSON.stringify({ message: 'Bill deleted successfully', bill: deletedBill }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

// Statistics Functions
async function getAllStats(env, searchParams) {
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
    
    const totalReceive = filteredBills
        .filter(bill => bill.type === 'receive')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const totalPay = filteredBills
        .filter(bill => bill.type === 'pay')
        .reduce((sum, bill) => sum + bill.amount, 0);
    
    const balance = totalReceive - totalPay;
    
    return new Response(
        JSON.stringify({
            total_bills: filteredBills.length,
            total_receive: totalReceive,
            total_pay: totalPay,
            balance: balance,
            period: {
                start: startDate || 'all time',
                end: endDate || 'all time'
            }
        }),
        { headers: { 'Content-Type': 'application/json' } }
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
    const bills = await getAllBillsFromStorage(env);
    const tags = [...new Set(bills.map(bill => bill.tag))];
    const categories = [...new Set(bills.map(bill => bill.category))];
    
    return new Response(
        JSON.stringify({
            tags: tags,
            categories: categories,
            combined: [...new Set([...tags, ...categories])]
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}

async function createTag(env, tagData) {
    const existingTags = await env.KV.get('custom_tags');
    const tags = existingTags ? JSON.parse(existingTags) : [];
    
    const newTag = {
        id: generateUUID(),
        name: tagData.name,
        color: tagData.color || '#007bff',
        description: tagData.description || '',
        created_at: new Date().toISOString()
    };
    
    tags.push(newTag);
    await env.KV.put('custom_tags', JSON.stringify(tags));
    
    return new Response(
        JSON.stringify(newTag),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
}

// Data access helper
async function getAllBillsFromStorage(env) {
    const billsData = await env.KV.get('bills');
    return billsData ? JSON.parse(billsData) : [];
}
