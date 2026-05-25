/**
 * Maintenance schedule page
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;
  const D = window.TOMS_DATA;

  const urlParams = new URLSearchParams(window.location.search);
  const truckFilter = urlParams.get('truck');

  TOMS.renderLayout('maintenance', 'maintenance.pageTitle');

  function computeStatus(rec) {
    if (rec.status === 'In Progress') return 'In Progress';
    const days = TOMS.daysFromNow(rec.nextDue);
    if (days == null) return rec.status;
    if (days < 0) return 'Overdue';
    if (days <= 7) return 'Upcoming';
    return 'Scheduled';
  }
  const enriched = D.maintenanceRecords.map(r => ({ ...r, computedStatus: computeStatus(r) }));

  const upcomingCount = enriched.filter(r => r.computedStatus === 'Upcoming').length;
  const overdueCount = enriched.filter(r => r.computedStatus === 'Overdue').length;
  const inProgressCount = enriched.filter(r => r.computedStatus === 'In Progress').length;
  const scheduledCount = enriched.filter(r => r.computedStatus === 'Scheduled').length;

  const root = document.getElementById('tomsContent');

  const filterBanner = truckFilter ? `
    <div class="alert alert-info d-flex justify-content-between align-items-center mb-3">
      <div>${t('maintenance.filterBanner', { truck: `<strong>${truckFilter}</strong>` })}</div>
      <a href="maintenance.html" class="btn btn-sm btn-outline-secondary">${t('common.actions.clearFilter')}</a>
    </div>
  ` : '';

  root.innerHTML = `
    ${filterBanner}

    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('maintenance.stat.overdue')}</div>
              <div class="value" style="color:#dc2626;">${overdueCount}</div>
            </div>
            <div class="stat-icon red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-1.2-9h2.4l-.3 7h-1.8l-.3-7z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('maintenance.stat.upcoming')}</div>
              <div class="value" style="color:#d97706;">${upcomingCount}</div>
              <div class="delta">${t('maintenance.stat.upcomingHint')}</div>
            </div>
            <div class="stat-icon amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.7 5h-1.4v6l5.2 3.1.7-1.2-4.5-2.7V7z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('maintenance.stat.inProgress')}</div>
              <div class="value" style="color:#2563eb;">${inProgressCount}</div>
            </div>
            <div class="stat-icon blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('maintenance.stat.scheduled')}</div>
              <div class="value" style="color:#16a34a;">${scheduledCount}</div>
            </div>
            <div class="stat-icon green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.2c-.4-1.2-1.5-2-2.8-2s-2.4.8-2.8 2H5C3.9 3 3 3.9 3 5v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17l-4-4 1.4-1.4L10 14.2l6.6-6.6L18 9l-8 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toolbar">
      <input id="searchInput" type="text" class="form-control" placeholder="${t('maintenance.toolbar.searchPh')}" style="max-width:280px;">
      <select id="statusFilter" class="form-select" style="max-width:160px;">
        <option value="">${t('common.all.status')}</option>
        <option value="Overdue">${t('common.status.Overdue')}</option>
        <option value="Upcoming">${t('common.status.Upcoming')}</option>
        <option value="In Progress">${t('common.status.InProgress')}</option>
        <option value="Scheduled">${t('common.status.Scheduled')}</option>
      </select>
      <select id="serviceFilter" class="form-select" style="max-width:180px;">
        <option value="">${t('common.all.serviceType')}</option>
        <option value="Oil Change">Oil Change</option>
        <option value="Tire Rotation">Tire Rotation</option>
        <option value="Tire Replacement">Tire Replacement</option>
        <option value="Brake Service">Brake Service</option>
        <option value="DOT Inspection">DOT Inspection</option>
        <option value="Engine Repair">Engine Repair</option>
      </select>
      <div class="toolbar-spacer"></div>
      <button class="btn btn-light" id="exportBtn">${t('common.actions.export')}</button>
      <button class="btn btn-primary" id="scheduleBtn">${t('maintenance.toolbar.addBtn')}</button>
    </div>

    <div class="section-card p-0">
      <div class="table-responsive">
        <table class="toms-table">
          <thead>
            <tr>
              <th>${t('maintenance.table.truck')}</th>
              <th>${t('maintenance.table.serviceType')}</th>
              <th>${t('maintenance.table.lastService')}</th>
              <th>${t('maintenance.table.nextDue')}</th>
              <th class="text-end">${t('maintenance.table.mileage')}</th>
              <th>${t('maintenance.table.days')}</th>
              <th>${t('maintenance.table.status')}</th>
              <th class="text-end">${t('maintenance.table.action')}</th>
            </tr>
          </thead>
          <tbody id="maintBody"></tbody>
        </table>
      </div>
    </div>
  `;

  function render() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const st = document.getElementById('statusFilter').value;
    const svc = document.getElementById('serviceFilter').value;

    let list = enriched.slice();
    if (truckFilter) list = list.filter(r => r.truckId === truckFilter);
    if (st) list = list.filter(r => r.computedStatus === st);
    if (svc) list = list.filter(r => r.serviceType === svc);
    if (q) {
      list = list.filter(r => (r.truckId + ' ' + r.serviceType).toLowerCase().includes(q));
    }

    const order = { 'Overdue': 0, 'Upcoming': 1, 'In Progress': 2, 'Scheduled': 3 };
    list.sort((a, b) => {
      const oa = order[a.computedStatus] ?? 99;
      const ob = order[b.computedStatus] ?? 99;
      if (oa !== ob) return oa - ob;
      return a.nextDue.localeCompare(b.nextDue);
    });

    const body = document.getElementById('maintBody');
    if (!list.length) {
      body.innerHTML = `<tr><td colspan="8" class="text-center text-muted py-4">${t('common.empty.noMaintenance')}</td></tr>`;
      return;
    }

    body.innerHTML = list.map(r => {
      const days = TOMS.daysFromNow(r.nextDue);
      let rowCls = '';
      if (r.computedStatus === 'Overdue') rowCls = 'overdue';
      else if (r.computedStatus === 'Upcoming') rowCls = 'upcoming';
      const daysText = days == null ? '-'
        : days < 0 ? `<span style="color:#dc2626; font-weight:600;">${t('common.days.overdue', { n: Math.abs(days) })}</span>`
        : days === 0 ? `<span style="color:#d97706; font-weight:600;">${t('common.days.today')}</span>`
        : days <= 7 ? `<span style="color:#d97706; font-weight:600;">${t('common.days.after', { n: days })}</span>`
        : t('common.days.after', { n: days });
      return `
        <tr class="${rowCls}">
          <td><strong>${r.truckId}</strong></td>
          <td>${r.serviceType}</td>
          <td>${TOMS.formatDate(r.lastService)}</td>
          <td>${TOMS.formatDate(r.nextDue)}</td>
          <td class="text-end">${TOMS.formatNumber(r.mileageAtService)} mi</td>
          <td>${daysText}</td>
          <td>${TOMS.statusBadge(r.computedStatus)}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-success" data-action="complete" data-id="${r.id}">${t('common.actions.markComplete')}</button>
          </td>
        </tr>
      `;
    }).join('');

    body.querySelectorAll('button[data-action="complete"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const rec = enriched.find(r => r.id === id);
        if (rec) {
          rec.computedStatus = 'Completed';
          TOMS.toast(t('maintenance.toast.completed', { truck: rec.truckId, service: rec.serviceType }), 'success');
          render();
        }
      });
    });
  }

  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('statusFilter').addEventListener('change', render);
  document.getElementById('serviceFilter').addEventListener('change', render);

  document.getElementById('exportBtn').addEventListener('click', () => {
    const headers = ['Truck', 'Service Type', 'Last Service', 'Next Due', 'Mileage', 'Status'];
    const rows = enriched.map(r => [r.truckId, r.serviceType, r.lastService, r.nextDue, r.mileageAtService, r.computedStatus]);
    TOMS.downloadCSV(`maintenance-${new Date().toISOString().slice(0,10)}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('common.toast.exported'), 'success');
  });

  document.getElementById('scheduleBtn').addEventListener('click', () => {
    TOMS.toast(t('maintenance.toast.demoMsg'), 'info');
  });

  render();
})();
