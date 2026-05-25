/**
 * Income & Expense page
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;
  const D = window.TOMS_DATA;

  TOMS.renderLayout('expenses', 'expenses.pageTitle');

  const truckOptions = D.trucks.map(tr => `<option value="${tr.id}">${tr.id}</option>`).join('');
  const driverOptions = D.drivers.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
  const categories = ['Fuel', 'Maintenance', 'Insurance', 'Toll Fees', 'Repairs', 'Driver Payments', 'Miscellaneous'];
  const categoryKey = (c) => 'category.' + c.replace(/\s+/g, '');
  const categoryLabel = (c) => t(categoryKey(c));
  const categoryOptions = categories.map(c => `<option value="${c}">${categoryLabel(c)}</option>`).join('');

  const root = document.getElementById('tomsContent');
  root.innerHTML = `
    <ul class="nav nav-tabs mb-3" id="finTabs" role="tablist">
      <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#expensePane" id="tab-expense">${t('expenses.tab.expense')} (${D.expenses.length})</button></li>
      <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#incomePane" id="tab-income">${t('expenses.tab.income')} (${D.incomes.length})</button></li>
    </ul>

    <div class="tab-content">
      <!-- ============ Expense ============ -->
      <div class="tab-pane fade show active" id="expensePane">
        <div class="toolbar">
          <input type="date" class="form-control" id="expFrom" title="${t('expenses.filter.from')}">
          <input type="date" class="form-control" id="expTo" title="${t('expenses.filter.to')}">
          <select class="form-select" id="expCategory" style="max-width:160px;">
            <option value="">${t('common.all.category')}</option>${categoryOptions}
          </select>
          <select class="form-select" id="expTruck" style="max-width:140px;">
            <option value="">${t('common.all.truck')}</option>${truckOptions}
          </select>
          <select class="form-select" id="expDriver" style="max-width:160px;">
            <option value="">${t('common.all.driver')}</option>${driverOptions}
          </select>
          <div class="toolbar-spacer"></div>
          <button class="btn btn-light" id="exportExpBtn">${t('common.actions.export')}</button>
        </div>

        <div class="section-card p-0">
          <div class="table-responsive">
            <table class="toms-table">
              <thead>
                <tr>
                  <th>${t('expenses.table.date')}</th>
                  <th>${t('expenses.table.category')}</th>
                  <th>${t('expenses.table.vendor')}</th>
                  <th>${t('expenses.table.truck')}</th>
                  <th>${t('expenses.table.driver')}</th>
                  <th class="text-end">${t('expenses.table.amount')}</th>
                </tr>
              </thead>
              <tbody id="expBody"></tbody>
              <tfoot>
                <tr style="background:#f9fafb; font-weight:600;">
                  <td colspan="5" class="text-end">${t('expenses.totalExpense')}</td>
                  <td class="text-end" id="expTotal" style="color:#dc2626;"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <!-- ============ Income ============ -->
      <div class="tab-pane fade" id="incomePane">
        <div class="toolbar">
          <input type="date" class="form-control" id="incFrom" title="${t('expenses.filter.from')}">
          <input type="date" class="form-control" id="incTo" title="${t('expenses.filter.to')}">
          <select class="form-select" id="incCustomer" style="max-width:200px;">
            <option value="">${t('common.all.customer')}</option>
            ${D.customers.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <select class="form-select" id="incTruck" style="max-width:140px;">
            <option value="">${t('common.all.truck')}</option>${truckOptions}
          </select>
          <select class="form-select" id="incStatus" style="max-width:140px;">
            <option value="">${t('common.all.status')}</option>
            <option value="Paid">${t('common.status.Paid')}</option>
            <option value="Pending">${t('common.status.Pending')}</option>
            <option value="Overdue">${t('common.status.Overdue')}</option>
          </select>
          <div class="toolbar-spacer"></div>
          <button class="btn btn-light" id="exportIncBtn">${t('common.actions.export')}</button>
        </div>

        <div class="section-card p-0">
          <div class="table-responsive">
            <table class="toms-table">
              <thead>
                <tr>
                  <th>${t('expenses.table.date')}</th>
                  <th>${t('expenses.table.loadId')}</th>
                  <th>${t('expenses.table.customer')}</th>
                  <th>${t('expenses.table.truck')}</th>
                  <th>${t('expenses.table.driver')}</th>
                  <th>${t('expenses.table.status')}</th>
                  <th class="text-end">${t('expenses.table.amount')}</th>
                </tr>
              </thead>
              <tbody id="incBody"></tbody>
              <tfoot>
                <tr style="background:#f9fafb; font-weight:600;">
                  <td colspan="6" class="text-end">${t('expenses.totalRevenue')}</td>
                  <td class="text-end" id="incTotal" style="color:#16a34a;"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom summary -->
    <div class="row g-3 mt-3">
      <div class="col-md-4">
        <div class="stat-card">
          <div class="label">${t('expenses.summary.revenue')}</div>
          <div class="value" style="color:#16a34a;" id="sumRevenue">-</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stat-card">
          <div class="label">${t('expenses.summary.expense')}</div>
          <div class="value" style="color:#dc2626;" id="sumExpense">-</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stat-card">
          <div class="label">${t('expenses.summary.net')}</div>
          <div class="value" id="sumNet">-</div>
        </div>
      </div>
    </div>
  `;

  const driverName = (id) => {
    if (!id) return '<span class="text-muted-sm">-</span>';
    const d = D.drivers.find(x => x.id === id);
    return d ? d.name : id;
  };

  function filteredExpenses() {
    const from = document.getElementById('expFrom').value;
    const to = document.getElementById('expTo').value;
    const cat = document.getElementById('expCategory').value;
    const truck = document.getElementById('expTruck').value;
    const driver = document.getElementById('expDriver').value;
    return D.expenses.filter(e => {
      if (from && e.date < from) return false;
      if (to && e.date > to) return false;
      if (cat && e.category !== cat) return false;
      if (truck && e.truckId !== truck) return false;
      if (driver && e.driverId !== driver) return false;
      return true;
    });
  }
  function renderExpenses() {
    const list = filteredExpenses();
    const body = document.getElementById('expBody');
    if (!list.length) {
      body.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">${t('common.empty.noExpenses')}</td></tr>`;
    } else {
      body.innerHTML = list.map(e => `
        <tr>
          <td>${TOMS.formatDate(e.date)}</td>
          <td><span class="badge-pill ${categoryColor(e.category)}">${categoryLabel(e.category)}</span></td>
          <td>${e.vendor}</td>
          <td>${e.truckId || '<span class="text-muted-sm">-</span>'}</td>
          <td>${driverName(e.driverId)}</td>
          <td class="text-end" style="color:#dc2626; font-weight:600;">${TOMS.formatMoney(e.amount)}</td>
        </tr>
      `).join('');
    }
    const total = list.reduce((s, e) => s + e.amount, 0);
    document.getElementById('expTotal').textContent = TOMS.formatMoney(total);
    updateSummary();
  }

  function filteredIncomes() {
    const from = document.getElementById('incFrom').value;
    const to = document.getElementById('incTo').value;
    const customer = document.getElementById('incCustomer').value;
    const truck = document.getElementById('incTruck').value;
    const status = document.getElementById('incStatus').value;
    return D.incomes.filter(i => {
      if (from && i.date < from) return false;
      if (to && i.date > to) return false;
      if (customer && i.customer !== customer) return false;
      if (truck && i.truckId !== truck) return false;
      if (status && i.status !== status) return false;
      return true;
    });
  }
  function renderIncomes() {
    const list = filteredIncomes();
    const body = document.getElementById('incBody');
    if (!list.length) {
      body.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">${t('common.empty.noIncomes')}</td></tr>`;
    } else {
      body.innerHTML = list.map(i => `
        <tr>
          <td>${TOMS.formatDate(i.date)}</td>
          <td><code>${i.loadId}</code></td>
          <td>${i.customer}</td>
          <td>${i.truckId}</td>
          <td>${driverName(i.driverId)}</td>
          <td>${TOMS.statusBadge(i.status)}</td>
          <td class="text-end" style="color:#16a34a; font-weight:600;">${TOMS.formatMoney(i.amount)}</td>
        </tr>
      `).join('');
    }
    const total = list.reduce((s, i) => s + i.amount, 0);
    document.getElementById('incTotal').textContent = TOMS.formatMoney(total);
    updateSummary();
  }

  function updateSummary() {
    const rev = filteredIncomes().reduce((s, x) => s + x.amount, 0);
    const exp = filteredExpenses().reduce((s, x) => s + x.amount, 0);
    document.getElementById('sumRevenue').textContent = TOMS.formatMoney(rev);
    document.getElementById('sumExpense').textContent = TOMS.formatMoney(exp);
    const net = rev - exp;
    const el = document.getElementById('sumNet');
    el.textContent = TOMS.formatMoney(net);
    el.style.color = net >= 0 ? '#16a34a' : '#dc2626';
  }

  function categoryColor(c) {
    return ({
      'Fuel': 'info',
      'Maintenance': 'warning',
      'Repairs': 'danger',
      'Insurance': 'purple',
      'Toll Fees': 'gray',
      'Driver Payments': 'success',
      'Miscellaneous': 'gray',
    })[c] || 'gray';
  }

  ['expFrom', 'expTo', 'expCategory', 'expTruck', 'expDriver'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderExpenses);
  });
  ['incFrom', 'incTo', 'incCustomer', 'incTruck', 'incStatus'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderIncomes);
  });

  document.getElementById('exportExpBtn').addEventListener('click', () => {
    const list = filteredExpenses();
    const headers = ['Date', 'Category', 'Vendor', 'Truck', 'Driver', 'Amount'];
    const rows = list.map(e => [e.date, e.category, e.vendor, e.truckId || '', e.driverId || '', e.amount.toFixed(2)]);
    TOMS.downloadCSV(`expenses-${new Date().toISOString().slice(0,10)}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('common.toast.exportedN', { n: list.length }), 'success');
  });
  document.getElementById('exportIncBtn').addEventListener('click', () => {
    const list = filteredIncomes();
    const headers = ['Date', 'Load ID', 'Customer', 'Truck', 'Driver', 'Status', 'Amount'];
    const rows = list.map(i => [i.date, i.loadId, i.customer, i.truckId, i.driverId || '', i.status, i.amount.toFixed(2)]);
    TOMS.downloadCSV(`incomes-${new Date().toISOString().slice(0,10)}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('common.toast.exportedN', { n: list.length }), 'success');
  });

  renderExpenses();
  renderIncomes();
})();
