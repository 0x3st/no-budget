document.addEventListener('DOMContentLoaded', () => {
    // API configuration
    const API_BASE_URL = '/api';
    const API_TOKEN = 'development-token'; // Use a placeholder for development

    // DOM Elements
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    const addTransactionButton = document.getElementById('add-transaction-button');
    const transactionsList = document.getElementById('transactions-list');
    const statsChartCanvas = document.getElementById('stats-chart');

    // Category Modal Elements
    const manageCategoriesButton = document.getElementById('manage-categories-button');
    const categoryModal = document.getElementById('category-modal');
    const closeCategoryModalButton = document.getElementById('close-category-modal-button');
    const categoryList = document.getElementById('category-list');
    const categoryForm = document.getElementById('category-form');
    const categoryIdInput = document.getElementById('category-id');
    const categoryNameInput = document.getElementById('category-name');
    const categoryIconInput = document.getElementById('category-icon');
    const categoryTypeSelect = document.getElementById('category-type');
    const saveCategoryButton = document.getElementById('save-category-button');
    const cancelEditCategoryButton = document.getElementById('cancel-edit-category-button');
    const categoryFormTitle = document.getElementById('category-form-title');


    let statsChart = null;
    let allCategories = [];

    // --- API Functions ---

    async function apiFetch(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${API_TOKEN}` // Skipping auth for now
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers,
            });

            if (!response.ok) {
                let errorMessage = 'API request failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (jsonError) {
                    // If response is not JSON, try to get text
                    try {
                        const errorText = await response.text();
                        errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
                    } catch (textError) {
                        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                    }
                }
                throw new Error(errorMessage);
            }
            
            return await response.json();
        } catch (error) {
            if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
                throw new Error('Server returned invalid response. Please check server logs.');
            }
            throw error;
        }
    }

    const getTransactions = () => apiFetch('/transactions');
    const addTransaction = (transaction) => apiFetch('/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
    });
    const getCategories = () => apiFetch('/categories');
    const addCategory = (category) => apiFetch('/categories', { method: 'POST', body: JSON.stringify(category) });
    const updateCategory = (id, category) => apiFetch(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(category) });
    const deleteCategory = (id) => apiFetch(`/categories/${id}`, { method: 'DELETE' });
    const getStatistics = () => apiFetch('/statistics');

    // --- Rendering Functions ---

    function renderTransactions(transactions) {
        transactionsList.innerHTML = ''; // Clear existing list
        if (!transactions || transactions.length === 0) {
            transactionsList.innerHTML = '<p class="text-center text-gray-500 px-4">No transactions yet.</p>';
            return;
        }

        transactions.forEach((t) => {
            const transactionDate = new Date(t.timestamp);
            const formattedDate = transactionDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });

            const element = document.createElement('div');
            element.className = 'flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg';
            const amountColor = t.category.type === 'income' ? 'text-green-500' : 'text-red-500';
            const amountPrefix = t.category.type === 'income' ? '+' : '-';

            element.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl">
            <span>${t.category.icon || '💰'}</span>
          </div>
          <div>
            <p class="font-medium text-[#101418]">${t.description}</p>
            <p class="text-sm text-gray-500">${t.category.name}</p>
          </div>
        </div>
        <div class="text-right">
            <p class="font-medium ${amountColor}">${amountPrefix}$${t.amount.toFixed(2)}</p>
            <p class="text-sm text-gray-500">${formattedDate}</p>
        </div>
      `;
            transactionsList.appendChild(element);
        });
    }

    function renderCategories() {
        categorySelect.innerHTML = ''; // Clear existing options
        
        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a category...';
        categorySelect.appendChild(defaultOption);
        
        // Group categories by type
        const expenseCategories = allCategories.filter(c => c.type === 'expense');
        const incomeCategories = allCategories.filter(c => c.type === 'income');
        
        // Add expense categories group
        if (expenseCategories.length > 0) {
            const expenseGroup = document.createElement('optgroup');
            expenseGroup.label = 'Expenses (支出)';
            expenseCategories.forEach((c) => {
                const option = document.createElement('option');
                option.value = c.id;
                option.textContent = `${c.icon} ${c.name}`;
                expenseGroup.appendChild(option);
            });
            categorySelect.appendChild(expenseGroup);
        }
        
        // Add income categories group
        if (incomeCategories.length > 0) {
            const incomeGroup = document.createElement('optgroup');
            incomeGroup.label = 'Income (收入)';
            incomeCategories.forEach((c) => {
                const option = document.createElement('option');
                option.value = c.id;
                option.textContent = `${c.icon} ${c.name}`;
                incomeGroup.appendChild(option);
            });
            categorySelect.appendChild(incomeGroup);
        }
    }

    function renderCategoryManagementList(categories) {
        categoryList.innerHTML = '';
        
        if (categories.length === 0) {
            categoryList.innerHTML = '<p class="text-gray-500 text-sm text-center py-3">No categories yet. Add one below!</p>';
            return;
        }
        
        categories.forEach(c => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 bg-white';
            item.innerHTML = `
                <div class="flex items-center min-w-0 flex-1">
                    <span class="text-lg mr-2 w-6 text-center flex-shrink-0">${c.icon || '📝'}</span>
                    <div class="min-w-0 flex-1">
                        <span class="font-medium text-[#101418] text-sm block truncate">${c.name}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${c.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${c.type === 'income' ? '💰' : '💸'}</span>
                    </div>
                </div>
                <div class="flex gap-1 flex-shrink-0 ml-2">
                    <button data-id="${c.id}" class="edit-category-btn p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </button>
                    <button data-id="${c.id}" class="delete-category-btn p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            `;
            categoryList.appendChild(item);
        });

        document.querySelectorAll('.edit-category-btn').forEach(btn => {
            btn.addEventListener('click', handleEditCategory);
        });
        document.querySelectorAll('.delete-category-btn').forEach(btn => {
            btn.addEventListener('click', handleDeleteCategory);
        });
    }

    function renderStatistics(stats) {
        if (statsChart) {
            statsChart.destroy();
        }

        const ctx = statsChartCanvas.getContext('2d');
        statsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: stats.spendingByCategory.map((item) => item.category.name),
                datasets: [
                    {
                        label: 'Spending by Category',
                        data: stats.spendingByCategory.map((item) => item.total),
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                        ],
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                        }
                    },
                },
            },
        });
    }

    // --- Event Handlers ---

    async function handleAddTransaction() {
        const amount = parseFloat(amountInput.value);
        const categoryId = categorySelect.value;
        const description = descriptionInput.value.trim();

        if (!amount || !categoryId || !description) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            addTransactionButton.disabled = true;
            addTransactionButton.textContent = 'Adding...';

            await addTransaction({ amount, categoryId, description }); // Backend should infer type from category

            // Clear form
            amountInput.value = '';
            descriptionInput.value = '';
            categorySelect.selectedIndex = 0;

            // Refresh data
            await loadAppData();
        } catch (error) {
            console.error('Failed to add transaction:', error);
            alert(`Error: ${error.message}`);
        } finally {
            addTransactionButton.disabled = false;
            addTransactionButton.textContent = 'Add Transaction';
        }
    }

    function openCategoryModal() {
        categoryModal.classList.remove('hidden');
        resetCategoryForm();
        renderCategoryManagementList(allCategories);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }

    function closeCategoryModal() {
        categoryModal.classList.add('hidden');
        // Restore body scroll
        document.body.style.overflow = '';
    }

    function resetCategoryForm() {
        categoryForm.reset();
        categoryIdInput.value = '';
        categoryFormTitle.textContent = 'Add New Category';
        saveCategoryButton.textContent = 'Save Category';
        cancelEditCategoryButton.classList.add('hidden');
    }

    async function handleCategoryFormSubmit(event) {
        event.preventDefault();
        const id = categoryIdInput.value;
        const categoryData = {
            name: categoryNameInput.value,
            icon: categoryIconInput.value,
            type: categoryTypeSelect.value,
        };

        try {
            if (id) {
                await updateCategory(id, categoryData);
            } else {
                await addCategory(categoryData);
            }
            resetCategoryForm();
            // Refresh categories
            const categories = await getCategories();
            allCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
            renderCategoryManagementList(allCategories);
            renderCategories();
        } catch (error) {
            console.error('Failed to save category:', error);
            alert(`Error: ${error.message}`);
        }
    }

    function handleEditCategory(event) {
        const id = event.target.dataset.id;
        const category = allCategories.find(c => c.id == id);
        if (category) {
            categoryIdInput.value = category.id;
            categoryNameInput.value = category.name;
            categoryIconInput.value = category.icon;
            categoryTypeSelect.value = category.type;
            categoryFormTitle.textContent = 'Edit Category';
            saveCategoryButton.textContent = 'Update Category';
            cancelEditCategoryButton.classList.remove('hidden');
        }
    }

    async function handleDeleteCategory(event) {
        const id = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
                // Refresh categories
                const categories = await getCategories();
                allCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
                renderCategoryManagementList(allCategories);
                renderCategories();
            } catch (error) {
                console.error('Failed to delete category:', error);
                alert(`Error: ${error.message}`);
            }
        }
    }


    // --- Initialization ---

    async function loadAppData() {
        try {
            const [transactions, categories, statistics] = await Promise.all([
                getTransactions(),
                getCategories(),
                getStatistics(),
            ]);
            allCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
            renderTransactions(transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            renderCategories();
            renderStatistics(statistics);
        } catch (error) {
            console.error('Failed to load app data:', error);
            transactionsList.innerHTML = `<p class="text-center text-red-500 px-4">Failed to load data: ${error.message}</p>`;
        }
    }

    // Attach event listeners
    addTransactionButton.addEventListener('click', handleAddTransaction);
    manageCategoriesButton.addEventListener('click', openCategoryModal);
    closeCategoryModalButton.addEventListener('click', closeCategoryModal);
    categoryForm.addEventListener('submit', handleCategoryFormSubmit);
    cancelEditCategoryButton.addEventListener('click', resetCategoryForm);

    // Close modal when clicking on backdrop
    categoryModal.addEventListener('click', (e) => {
        if (e.target === categoryModal) {
            closeCategoryModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !categoryModal.classList.contains('hidden')) {
            closeCategoryModal();
        }
    });


    // Initial data load
    loadAppData();
});
