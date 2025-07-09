// No Budget Frontend Application
class NoBudgetApp {
    constructor() {
        this.apiBaseUrl = window.location.origin;
        this.currentTab = 'dashboard';
        this.bills = [];
        this.tags = [];
        this.stats = {};
        this.editingBill = null;
        this.editingTag = null;
        
        this.init();
    }

    async init() {
        this.bindEvents();
        this.setCurrentDate();
        await this.loadInitialData();
        this.showTab('dashboard');
    }

    bindEvents() {
        // 导航按钮
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.showTab(tab);
            });
        });

        // 月份选择器
        document.getElementById('monthSelector').addEventListener('change', () => {
            this.loadStats();
        });

        // 账单相关事件
        document.getElementById('addBillBtn').addEventListener('click', () => {
            this.showBillModal();
        });

        document.getElementById('billForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveBill();
        });

        document.getElementById('cancelBillBtn').addEventListener('click', () => {
            this.hideBillModal();
        });

        // 标签相关事件
        document.getElementById('addTagBtn').addEventListener('click', () => {
            this.showTagModal();
        });

        document.getElementById('tagForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTag();
        });

        document.getElementById('cancelTagBtn').addEventListener('click', () => {
            this.hideTagModal();
        });

        // 模态框关闭事件
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                modal.classList.remove('active');
            });
        });

        // 点击模态框外部关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // 搜索和筛选
        document.getElementById('searchInput').addEventListener('input', () => {
            this.filterBills();
        });

        document.getElementById('typeFilter').addEventListener('change', () => {
            this.filterBills();
        });

        document.getElementById('tagFilter').addEventListener('change', () => {
            this.filterBills();
        });
    }

    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('billDate').value = today;
    }

    async loadInitialData() {
        await Promise.all([
            this.loadTags(),
            this.loadBills(),
            this.loadStats()
        ]);
    }

    showTab(tabName) {
        // 更新导航状态
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // 显示对应内容
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // 根据标签页加载对应数据
        if (tabName === 'dashboard') {
            this.loadStats();
        } else if (tabName === 'bills') {
            this.loadBills();
        } else if (tabName === 'tags') {
            this.loadTags();
        }
    }

    async apiRequest(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            this.showToast('网络请求失败，请稍后重试', 'error');
            throw error;
        }
    }

    async loadStats() {
        try {
            const monthSelector = document.getElementById('monthSelector');
            const selectedMonth = monthSelector.value;
            
            let endpoint = '/api/stats';
            if (selectedMonth) {
                endpoint += `?month=${selectedMonth}`;
            }

            const response = await this.apiRequest(endpoint);
            this.stats = response.data;
            this.renderStats();
            this.renderCategoryChart();
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    renderStats() {
        const { totalIncome = 0, totalExpense = 0, netBalance = 0, billsCount = 0 } = this.stats;

        document.getElementById('totalIncome').textContent = this.formatCurrency(totalIncome);
        document.getElementById('totalExpense').textContent = this.formatCurrency(Math.abs(totalExpense));
        document.getElementById('netBalance').textContent = this.formatCurrency(netBalance);
        document.getElementById('billsCount').textContent = billsCount;

        // 更新净余额颜色
        const balanceElement = document.getElementById('netBalance');
        balanceElement.style.color = netBalance >= 0 ? '#10b981' : '#ef4444';
    }

    renderCategoryChart() {
        const chartContainer = document.getElementById('categoryChart');
        const { categoryStats = [] } = this.stats;

        if (categoryStats.length === 0) {
            chartContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-pie"></i>
                    <h3>暂无数据</h3>
                    <p>开始添加账单来查看分类统计</p>
                </div>
            `;
            return;
        }

        const chartHtml = categoryStats.map(item => {
            const tag = this.tags.find(t => t.name === item.tag) || { color: '#667eea' };
            return `
                <div class="category-item">
                    <div class="category-info">
                        <div class="category-color" style="background-color: ${tag.color}"></div>
                        <div class="category-name">${item.tag || '未分类'}</div>
                    </div>
                    <div class="category-amount">${this.formatCurrency(Math.abs(item.amount))}</div>
                </div>
            `;
        }).join('');

        chartContainer.innerHTML = `<div class="category-chart">${chartHtml}</div>`;
    }

    async loadBills() {
        try {
            document.getElementById('billsList').innerHTML = '<div class="loading">加载中...</div>';
            
            const response = await this.apiRequest('/api/bills');
            this.bills = response.data || [];
            this.renderBills();
        } catch (error) {
            document.getElementById('billsList').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>加载失败</h3>
                    <p>无法加载账单数据，请刷新重试</p>
                </div>
            `;
        }
    }

    renderBills(billsToRender = this.bills) {
        const billsList = document.getElementById('billsList');

        if (billsToRender.length === 0) {
            billsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>暂无账单</h3>
                    <p>开始添加你的第一笔账单吧</p>
                </div>
            `;
            return;
        }

        const billsHtml = billsToRender.map(bill => {
            const tag = this.tags.find(t => t.name === bill.tag);
            const amountClass = bill.type === 'income' ? 'income' : 'expense';
            const amountPrefix = bill.type === 'income' ? '+' : '-';
            
            return `
                <div class="bill-item">
                    <div class="bill-info">
                        <div class="bill-description">${bill.description}</div>
                        <div class="bill-meta">
                            <span><i class="fas fa-calendar"></i> ${this.formatDate(bill.date)}</span>
                            <span><i class="fas fa-tag"></i> ${bill.tag || '未分类'}</span>
                            <span><i class="fas fa-${bill.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i> ${bill.type === 'income' ? '收入' : '支出'}</span>
                        </div>
                    </div>
                    <div class="bill-amount ${amountClass}">
                        ${amountPrefix}${this.formatCurrency(Math.abs(bill.amount))}
                    </div>
                    <div class="bill-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.editBill('${bill.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteBill('${bill.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        billsList.innerHTML = billsHtml;
    }

    filterBills() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value;
        const tagFilter = document.getElementById('tagFilter').value;

        const filteredBills = this.bills.filter(bill => {
            const matchesSearch = bill.description.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilter || bill.type === typeFilter;
            const matchesTag = !tagFilter || bill.tag === tagFilter;
            
            return matchesSearch && matchesType && matchesTag;
        });

        this.renderBills(filteredBills);
    }

    async loadTags() {
        try {
            document.getElementById('tagsList').innerHTML = '<div class="loading">加载中...</div>';
            
            const response = await this.apiRequest('/api/tags');
            this.tags = response.data || [];
            this.renderTags();
            this.updateTagSelectors();
        } catch (error) {
            document.getElementById('tagsList').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>加载失败</h3>
                    <p>无法加载标签数据，请刷新重试</p>
                </div>
            `;
        }
    }

    renderTags() {
        const tagsList = document.getElementById('tagsList');

        if (this.tags.length === 0) {
            tagsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tags"></i>
                    <h3>暂无标签</h3>
                    <p>创建标签来更好地分类你的账单</p>
                </div>
            `;
            return;
        }

        const tagsHtml = this.tags.map(tag => {
            const billCount = this.bills.filter(bill => bill.tag === tag.name).length;
            
            return `
                <div class="tag-item">
                    <div class="tag-color" style="background-color: ${tag.color}"></div>
                    <div class="tag-name">${tag.name}</div>
                    <div class="tag-stats">${billCount} 个账单</div>
                    <div class="tag-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.editTag('${tag.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteTag('${tag.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        tagsList.innerHTML = tagsHtml;
    }

    updateTagSelectors() {
        const billTagSelect = document.getElementById('billTag');
        const tagFilterSelect = document.getElementById('tagFilter');

        const tagOptions = this.tags.map(tag => 
            `<option value="${tag.name}">${tag.name}</option>`
        ).join('');

        billTagSelect.innerHTML = '<option value="">选择标签</option>' + tagOptions;
        tagFilterSelect.innerHTML = '<option value="">所有标签</option>' + tagOptions;
    }

    showBillModal(bill = null) {
        this.editingBill = bill;
        const modal = document.getElementById('billModal');
        const title = document.getElementById('billModalTitle');
        const form = document.getElementById('billForm');

        title.textContent = bill ? '编辑账单' : '添加账单';

        if (bill) {
            document.getElementById('billDescription').value = bill.description;
            document.getElementById('billAmount').value = Math.abs(bill.amount);
            document.getElementById('billType').value = bill.type;
            document.getElementById('billTag').value = bill.tag || '';
            document.getElementById('billDate').value = bill.date;
        } else {
            form.reset();
            this.setCurrentDate();
        }

        modal.classList.add('active');
        document.getElementById('billDescription').focus();
    }

    hideBillModal() {
        document.getElementById('billModal').classList.remove('active');
        this.editingBill = null;
    }

    async saveBill() {
        const description = document.getElementById('billDescription').value.trim();
        const amount = parseFloat(document.getElementById('billAmount').value);
        const type = document.getElementById('billType').value;
        const tag = document.getElementById('billTag').value;
        const date = document.getElementById('billDate').value;

        if (!description || !amount || !type || !date) {
            this.showToast('请填写所有必填字段', 'error');
            return;
        }

        try {
            const billData = {
                description,
                amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
                type,
                tag: tag || null,
                date
            };

            if (this.editingBill) {
                await this.apiRequest(`/api/bills/${this.editingBill.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(billData)
                });
                this.showToast('账单更新成功', 'success');
            } else {
                await this.apiRequest('/api/bills', {
                    method: 'POST',
                    body: JSON.stringify(billData)
                });
                this.showToast('账单添加成功', 'success');
            }

            this.hideBillModal();
            await this.loadBills();
            await this.loadStats();
        } catch (error) {
            this.showToast('保存失败，请重试', 'error');
        }
    }

    async editBill(billId) {
        const bill = this.bills.find(b => b.id === billId);
        if (bill) {
            this.showBillModal(bill);
        }
    }

    async deleteBill(billId) {
        if (!confirm('确定要删除这个账单吗？')) {
            return;
        }

        try {
            await this.apiRequest(`/api/bills/${billId}`, {
                method: 'DELETE'
            });
            this.showToast('账单删除成功', 'success');
            await this.loadBills();
            await this.loadStats();
        } catch (error) {
            this.showToast('删除失败，请重试', 'error');
        }
    }

    showTagModal(tag = null) {
        this.editingTag = tag;
        const modal = document.getElementById('tagModal');
        const title = document.getElementById('tagModalTitle');
        const form = document.getElementById('tagForm');

        title.textContent = tag ? '编辑标签' : '添加标签';

        if (tag) {
            document.getElementById('tagName').value = tag.name;
            document.getElementById('tagColor').value = tag.color;
        } else {
            form.reset();
            document.getElementById('tagColor').value = '#007bff';
        }

        modal.classList.add('active');
        document.getElementById('tagName').focus();
    }

    hideTagModal() {
        document.getElementById('tagModal').classList.remove('active');
        this.editingTag = null;
    }

    async saveTag() {
        const name = document.getElementById('tagName').value.trim();
        const color = document.getElementById('tagColor').value;

        if (!name) {
            this.showToast('请输入标签名称', 'error');
            return;
        }

        try {
            const tagData = { name, color };

            if (this.editingTag) {
                await this.apiRequest(`/api/tags/${this.editingTag.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(tagData)
                });
                this.showToast('标签更新成功', 'success');
            } else {
                await this.apiRequest('/api/tags', {
                    method: 'POST',
                    body: JSON.stringify(tagData)
                });
                this.showToast('标签添加成功', 'success');
            }

            this.hideTagModal();
            await this.loadTags();
        } catch (error) {
            this.showToast('保存失败，请重试', 'error');
        }
    }

    async editTag(tagId) {
        const tag = this.tags.find(t => t.id === tagId);
        if (tag) {
            this.showTagModal(tag);
        }
    }

    async deleteTag(tagId) {
        if (!confirm('确定要删除这个标签吗？相关账单的标签将被清除。')) {
            return;
        }

        try {
            await this.apiRequest(`/api/tags/${tagId}`, {
                method: 'DELETE'
            });
            this.showToast('标签删除成功', 'success');
            await this.loadTags();
            await this.loadBills();
        } catch (error) {
            this.showToast('删除失败，请重试', 'error');
        }
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
            minimumFractionDigits: 2
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化应用
const app = new NoBudgetApp();

// 导出到全局作用域供HTML使用
window.app = app;
