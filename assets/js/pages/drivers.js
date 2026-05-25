/**
 * Drivers page
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;
  const D = window.TOMS_DATA;
  const drivers = D.drivers.slice();

  TOMS.renderLayout('drivers', 'drivers.pageTitle');

  const root = document.getElementById('tomsContent');
  root.innerHTML = `
    <div class="toolbar">
      <input id="searchInput" type="text" class="form-control" placeholder="${t('drivers.toolbar.searchPh')}" style="max-width:280px;">
      <select id="statusFilter" class="form-select" style="max-width:160px;">
        <option value="">${t('common.all.status')}</option>
        <option value="Active">${t('common.status.Active')}</option>
        <option value="On Leave">${t('common.status.OnLeave')}</option>
        <option value="Inactive">${t('common.status.Inactive')}</option>
      </select>
      <select id="classFilter" class="form-select" style="max-width:160px;">
        <option value="">${t('common.all.cdlClass')}</option>
        <option value="A">${t('drivers.toolbar.classA')}</option>
        <option value="B">${t('drivers.toolbar.classB')}</option>
      </select>
      <div class="toolbar-spacer"></div>
      <button class="btn btn-primary" id="addDriverBtn">${t('drivers.toolbar.addBtn')}</button>
    </div>

    <div class="section-card p-0">
      <div class="table-responsive">
        <table class="toms-table" id="driversTable">
          <thead>
            <tr>
              <th>${t('drivers.table.name')}</th>
              <th>${t('drivers.table.cdl')}</th>
              <th>${t('drivers.table.class')}</th>
              <th>${t('drivers.table.phone')}</th>
              <th>${t('drivers.table.truck')}</th>
              <th>${t('drivers.table.hireDate')}</th>
              <th>${t('drivers.table.status')}</th>
            </tr>
          </thead>
          <tbody id="driversBody"></tbody>
        </table>
      </div>
      <div id="emptyState" class="empty-state d-none">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-9.8 1.7-9.8 5v2.8h19.6V19c0-3.3-6.5-5-9.8-5z"/></svg>
        <div>${t('common.empty.noDrivers')}</div>
      </div>
    </div>

    <!-- Add Driver Modal -->
    <div class="modal fade" id="addDriverModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${t('drivers.modal.title')}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form id="addDriverForm">
            <div class="modal-body">
              <div class="mb-2">
                <label class="form-label">${t('drivers.modal.name')}</label>
                <input type="text" class="form-control" id="newName" required>
              </div>
              <div class="row g-2">
                <div class="col-md-7 mb-2">
                  <label class="form-label">${t('drivers.modal.cdl')}</label>
                  <input type="text" class="form-control" id="newCdl" placeholder="CDL-XX-000000" required>
                </div>
                <div class="col-md-5 mb-2">
                  <label class="form-label">${t('drivers.modal.class')}</label>
                  <select class="form-select" id="newClass">
                    <option>A</option><option>B</option>
                  </select>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-md-7 mb-2">
                  <label class="form-label">${t('drivers.modal.phone')}</label>
                  <input type="text" class="form-control" id="newPhone">
                </div>
                <div class="col-md-5 mb-2">
                  <label class="form-label">${t('drivers.modal.hireDate')}</label>
                  <input type="date" class="form-control" id="newHireDate" value="${new Date().toISOString().slice(0,10)}">
                </div>
              </div>
              <div class="mb-2">
                <label class="form-label">${t('drivers.modal.status')}</label>
                <select class="form-select" id="newStatus">
                  <option value="Active">${t('common.status.Active')}</option>
                  <option value="On Leave">${t('common.status.OnLeave')}</option>
                  <option value="Inactive">${t('common.status.Inactive')}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">${t('common.actions.cancel')}</button>
              <button type="submit" class="btn btn-primary">${t('common.actions.save')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Drawer (driver detail) -->
    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <aside class="drawer" id="driverDrawer">
      <div class="drawer-header">
        <h5 class="mb-0" id="drawerTitle"></h5>
        <button class="btn-close" id="drawerClose"></button>
      </div>
      <div class="drawer-body" id="drawerBody"></div>
    </aside>
  `;

  function render() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const st = document.getElementById('statusFilter').value;
    const cls = document.getElementById('classFilter').value;
    const filtered = drivers.filter(d => {
      if (st && d.status !== st) return false;
      if (cls && d.class !== cls) return false;
      if (q) {
        const hay = (d.name + ' ' + d.cdl + ' ' + d.phone).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const body = document.getElementById('driversBody');
    if (!filtered.length) {
      body.innerHTML = '';
      document.getElementById('emptyState').classList.remove('d-none');
      return;
    }
    document.getElementById('emptyState').classList.add('d-none');

    body.innerHTML = filtered.map(d => `
      <tr class="clickable" data-id="${d.id}">
        <td>
          <div style="font-weight:600;">${d.name}</div>
          <div class="text-muted-sm">${d.email || ''}</div>
        </td>
        <td><code>${d.cdl}</code></td>
        <td>Class ${d.class}</td>
        <td>${d.phone}</td>
        <td>${d.truckId ? `<span class="badge-pill info">${d.truckId}</span>` : `<span class="text-muted-sm">${t('common.notAssigned')}</span>`}</td>
        <td>${TOMS.formatDate(d.hireDate)}</td>
        <td>${TOMS.statusBadge(d.status)}</td>
      </tr>
    `).join('');

    body.querySelectorAll('tr').forEach(tr => {
      tr.addEventListener('click', () => openDrawer(tr.dataset.id));
    });
  }

  function openDrawer(driverId) {
    const d = drivers.find(x => x.id === driverId);
    if (!d) return;
    const truck = d.truckId ? D.trucks.find(tr => tr.id === d.truckId) : null;
    const driverIncidents = D.incidents.filter(i => i.driverId === driverId);

    document.getElementById('drawerTitle').textContent = d.name;
    document.getElementById('drawerBody').innerHTML = `
      <div class="drawer-section">
        <h6>${t('drivers.drawer.profile')}</h6>
        <div class="kv-row"><span class="k">${t('drivers.table.cdl')}</span><span class="v"><code>${d.cdl}</code></span></div>
        <div class="kv-row"><span class="k">${t('drivers.table.class')}</span><span class="v">Class ${d.class}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.table.phone')}</span><span class="v">${d.phone}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.drawer.email')}</span><span class="v">${d.email || '-'}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.drawer.hireDate')}</span><span class="v">${TOMS.formatDate(d.hireDate)}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.table.status')}</span><span class="v">${TOMS.statusBadge(d.status)}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.drawer.assignedTruck')}</span><span class="v">${truck ? `${truck.id} - ${truck.makeModel}` : '-'}</span></div>
      </div>

      <div class="drawer-section">
        <h6>${t('drivers.drawer.certifications')}</h6>
        ${certRow(t('drivers.drawer.hazmat'), d.hazmatExp)}
        ${certRow(t('drivers.drawer.medical'), d.medicalExp)}
      </div>

      <div class="drawer-section">
        <h6>${t('drivers.drawer.settlement')}</h6>
        <div class="kv-row"><span class="k">${t('drivers.drawer.latest')}</span><span class="v" style="color:#16a34a;">${TOMS.formatMoney(d.recentSettlement)}</span></div>
        <div class="kv-row"><span class="k">${t('drivers.drawer.paymentStatus')}</span><span class="v">${d.recentSettlement > 0 ? TOMS.statusBadge('Paid') : TOMS.statusBadge('Pending')}</span></div>
      </div>

      <div class="drawer-section">
        <h6>${t('drivers.drawer.incidents')}</h6>
        ${driverIncidents.length === 0
          ? `<div class="text-muted-sm">${t('common.empty.noIncidents')}</div>`
          : driverIncidents.map(i => `
              <div class="border-bottom py-2">
                <div style="font-weight:600; font-size:0.88rem;">${i.type}</div>
                <div class="text-muted-sm">${TOMS.formatDate(i.date)}</div>
                <div style="font-size:0.85rem;">${i.description}</div>
              </div>
            `).join('')
        }
      </div>
    `;
    document.getElementById('drawerBackdrop').classList.add('show');
    document.getElementById('driverDrawer').classList.add('show');
  }
  function certRow(label, expDate) {
    if (!expDate) return `<div class="kv-row"><span class="k">${label}</span><span class="v text-muted-sm">${t('common.noLicense')}</span></div>`;
    const days = TOMS.daysFromNow(expDate);
    const badge = days < 0 ? TOMS.statusBadge('Overdue')
      : days <= 30 ? TOMS.statusBadge('Upcoming')
      : TOMS.statusBadge('Active');
    return `<div class="kv-row"><span class="k">${label}</span><span class="v">${TOMS.formatDate(expDate)} ${badge}</span></div>`;
  }
  function closeDrawer() {
    document.getElementById('drawerBackdrop').classList.remove('show');
    document.getElementById('driverDrawer').classList.remove('show');
  }
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);

  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('statusFilter').addEventListener('change', render);
  document.getElementById('classFilter').addEventListener('change', render);

  const modal = new bootstrap.Modal(document.getElementById('addDriverModal'));
  document.getElementById('addDriverBtn').addEventListener('click', () => modal.show());
  document.getElementById('addDriverForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newId = 'D' + String(drivers.length + 1).padStart(3, '0');
    drivers.unshift({
      id: newId,
      name: document.getElementById('newName').value.trim(),
      cdl: document.getElementById('newCdl').value.trim(),
      class: document.getElementById('newClass').value,
      phone: document.getElementById('newPhone').value.trim() || '-',
      hireDate: document.getElementById('newHireDate').value,
      status: document.getElementById('newStatus').value,
      truckId: null, hazmatExp: null, medicalExp: null, recentSettlement: 0, incidents: 0,
      email: ''
    });
    modal.hide();
    document.getElementById('addDriverForm').reset();
    TOMS.toast(t('drivers.toast.added'), 'success');
    render();
  });

  render();
})();
