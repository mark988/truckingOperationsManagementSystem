/**
 * Equipment page (Trucks / Trailers)
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;
  const D = window.TOMS_DATA;

  TOMS.renderLayout('equipment', 'equipment.pageTitle');

  const root = document.getElementById('tomsContent');
  root.innerHTML = `
    <ul class="nav nav-tabs mb-3" id="equipTabs" role="tablist">
      <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#trucksPane">${t('equipment.tab.trucks')} (${D.trucks.length})</button></li>
      <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#trailersPane">${t('equipment.tab.trailers')} (${D.trailers.length})</button></li>
    </ul>

    <div class="tab-content">
      <!-- ============ TRUCKS ============ -->
      <div class="tab-pane fade show active" id="trucksPane">
        <div class="toolbar">
          <input id="truckSearch" type="text" class="form-control" placeholder="${t('equipment.trucks.searchPh')}" style="max-width:280px;">
          <select id="truckStatusFilter" class="form-select" style="max-width:160px;">
            <option value="">${t('common.all.status')}</option>
            <option value="In Service">${t('common.status.InService')}</option>
            <option value="Available">${t('common.status.Available')}</option>
            <option value="Maintenance">${t('common.status.Maintenance')}</option>
          </select>
          <div class="toolbar-spacer"></div>
          <button class="btn btn-light" id="exportTrucksBtn">${t('common.actions.export')}</button>
        </div>

        <div class="section-card p-0">
          <div class="table-responsive">
            <table class="toms-table" id="trucksTable">
              <thead>
                <tr>
                  <th>${t('equipment.table.truckNo')}</th>
                  <th>${t('equipment.table.vin')}</th>
                  <th>${t('equipment.table.makeModel')}</th>
                  <th>${t('equipment.table.year')}</th>
                  <th>${t('equipment.table.plate')}</th>
                  <th class="text-end">${t('equipment.table.mileage')}</th>
                  <th>${t('equipment.table.insuranceExp')}</th>
                  <th>${t('equipment.table.dotExp')}</th>
                  <th>${t('equipment.table.status')}</th>
                  <th class="text-end">${t('equipment.table.action')}</th>
                </tr>
              </thead>
              <tbody id="trucksBody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ============ TRAILERS ============ -->
      <div class="tab-pane fade" id="trailersPane">
        <div class="toolbar">
          <input id="trailerSearch" type="text" class="form-control" placeholder="${t('equipment.trailers.searchPh')}" style="max-width:260px;">
          <select id="trailerStatusFilter" class="form-select" style="max-width:160px;">
            <option value="">${t('common.all.status')}</option>
            <option value="Available">${t('common.status.Available')}</option>
            <option value="In Use">${t('common.status.InUse')}</option>
            <option value="Maintenance">${t('common.status.Maintenance')}</option>
          </select>
        </div>

        <div class="section-card p-0">
          <div class="table-responsive">
            <table class="toms-table">
              <thead>
                <tr>
                  <th>${t('equipment.table.trailerNo')}</th>
                  <th>${t('equipment.table.type')}</th>
                  <th>${t('equipment.table.capacity')}</th>
                  <th>${t('equipment.table.status')}</th>
                </tr>
              </thead>
              <tbody id="trailersBody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  function renderTrucks() {
    const q = document.getElementById('truckSearch').value.trim().toLowerCase();
    const st = document.getElementById('truckStatusFilter').value;
    const filtered = D.trucks.filter(tr => {
      if (st && tr.status !== st) return false;
      if (q) {
        const hay = (tr.id + ' ' + tr.vin + ' ' + tr.plate + ' ' + tr.makeModel).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    document.getElementById('trucksBody').innerHTML = filtered.map(tr => {
      const insDays = TOMS.daysFromNow(tr.insuranceExp);
      const dotDays = TOMS.daysFromNow(tr.dotExp);
      const insBadge = insDays < 0 ? `<span class="badge-pill danger">${t('common.status.Overdue')}</span>`
        : insDays <= 30 ? `<span class="badge-pill warning">${t('common.status.Expiring')}</span>` : '';
      const dotBadge = dotDays < 0 ? `<span class="badge-pill danger">${t('common.status.Overdue')}</span>`
        : dotDays <= 30 ? `<span class="badge-pill warning">${t('common.status.Expiring')}</span>` : '';
      return `
        <tr>
          <td><strong>${tr.id}</strong></td>
          <td><code style="font-size:0.78rem;">${tr.vin}</code></td>
          <td>${tr.makeModel}</td>
          <td>${tr.year}</td>
          <td>${tr.plate}</td>
          <td class="text-end">${TOMS.formatNumber(tr.mileage)} mi</td>
          <td>${TOMS.formatDate(tr.insuranceExp)} ${insBadge}</td>
          <td>${TOMS.formatDate(tr.dotExp)} ${dotBadge}</td>
          <td>${TOMS.statusBadge(tr.status)}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-secondary" href="maintenance.html?truck=${encodeURIComponent(tr.id)}">${t('common.actions.viewMaintenance')}</a>
          </td>
        </tr>
      `;
    }).join('');

    if (!filtered.length) {
      document.getElementById('trucksBody').innerHTML = `<tr><td colspan="10" class="text-center text-muted py-4">${t('common.empty.noTrucks')}</td></tr>`;
    }
  }

  function renderTrailers() {
    const q = document.getElementById('trailerSearch').value.trim().toLowerCase();
    const st = document.getElementById('trailerStatusFilter').value;
    const filtered = D.trailers.filter(tr => {
      if (st && tr.status !== st) return false;
      if (q) {
        const hay = (tr.id + ' ' + tr.type).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    document.getElementById('trailersBody').innerHTML = filtered.map(tr => `
      <tr>
        <td><strong>${tr.id}</strong></td>
        <td>${tr.type}</td>
        <td>${tr.capacity}</td>
        <td>${TOMS.statusBadge(tr.status)}</td>
      </tr>
    `).join('');

    if (!filtered.length) {
      document.getElementById('trailersBody').innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">${t('common.empty.noTrailers')}</td></tr>`;
    }
  }

  document.getElementById('truckSearch').addEventListener('input', renderTrucks);
  document.getElementById('truckStatusFilter').addEventListener('change', renderTrucks);
  document.getElementById('trailerSearch').addEventListener('input', renderTrailers);
  document.getElementById('trailerStatusFilter').addEventListener('change', renderTrailers);

  document.getElementById('exportTrucksBtn').addEventListener('click', () => {
    const headers = ['Truck #', 'VIN', 'Make/Model', 'Year', 'Plate', 'Mileage', 'Insurance Exp', 'DOT Exp', 'Status'];
    const rows = D.trucks.map(tr => [tr.id, tr.vin, tr.makeModel, tr.year, tr.plate, tr.mileage, tr.insuranceExp, tr.dotExp, tr.status]);
    TOMS.downloadCSV(`trucks-${new Date().toISOString().slice(0,10)}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('common.toast.exported'), 'success');
  });

  renderTrucks();
  renderTrailers();
})();
