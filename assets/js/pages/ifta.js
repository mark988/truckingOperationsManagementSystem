/**
 * IFTA quarterly reporting page
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;
  const D = window.TOMS_DATA;

  TOMS.renderLayout('ifta', 'ifta.pageTitle');

  const quarters = Object.keys(D.mileageByState);
  let activeQuarter = 'Q2 2026';

  const root = document.getElementById('tomsContent');
  root.innerHTML = `
    <div class="toolbar">
      <label class="form-label mb-0 me-2">${t('ifta.quarterLabel')}</label>
      <select id="quarterSelect" class="form-select" style="max-width:160px;">
        ${quarters.map(q => `<option value="${q}" ${q === activeQuarter ? 'selected' : ''}>${q}</option>`).join('')}
      </select>
      <div class="toolbar-spacer"></div>
      <button class="btn btn-light" id="exportFuelBtn">${t('common.actions.exportFuel')}</button>
      <button class="btn btn-primary" id="exportIftaBtn">${t('common.actions.exportReport')}</button>
    </div>

    <div class="row g-3 mb-4" id="iftaSummaryCards"></div>

    <div class="section-card">
      <div class="section-header">
        <h5 class="section-title">${t('ifta.mileage.section')}</h5>
        <span class="section-subtitle" id="quarterLabel"></span>
      </div>
      <div class="table-responsive">
        <table class="toms-table">
          <thead>
            <tr>
              <th>${t('ifta.table.state')}</th>
              <th class="text-end">${t('ifta.table.totalMiles')}</th>
              <th class="text-end">${t('ifta.table.taxableMiles')}</th>
              <th class="text-end">${t('ifta.table.gallons')}</th>
              <th class="text-end">${t('ifta.table.mpg')}</th>
              <th class="text-end">${t('ifta.table.taxRate')}</th>
              <th class="text-end">${t('ifta.table.estimatedTax')}</th>
            </tr>
          </thead>
          <tbody id="iftaBody"></tbody>
          <tfoot>
            <tr style="background:#f9fafb; font-weight:600;">
              <td>${t('ifta.table.total')}</td>
              <td class="text-end" id="totalMiles"></td>
              <td class="text-end" id="totalTaxableMiles"></td>
              <td class="text-end" id="totalGallons"></td>
              <td class="text-end" id="avgMpg"></td>
              <td></td>
              <td class="text-end" id="totalTax" style="color:#dc2626;"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <div class="section-card">
      <div class="section-header">
        <h5 class="section-title">${t('ifta.fuel.section')}</h5>
        <span class="section-subtitle">${t('ifta.fuel.subtitle')}</span>
      </div>
      <div class="table-responsive">
        <table class="toms-table">
          <thead>
            <tr>
              <th>${t('expenses.table.date')}</th>
              <th>${t('expenses.table.truck')}</th>
              <th>${t('ifta.table.state')}</th>
              <th>${t('expenses.table.vendor')}</th>
              <th>${t('ifta.fuel.fuelType')}</th>
              <th class="text-end">${t('ifta.table.gallons')}</th>
              <th class="text-end">${t('ifta.fuel.pricePerGal')}</th>
              <th class="text-end">${t('ifta.fuel.total')}</th>
            </tr>
          </thead>
          <tbody id="fuelBody"></tbody>
        </table>
      </div>
    </div>
  `;

  function render() {
    const q = document.getElementById('quarterSelect').value;
    activeQuarter = q;
    document.getElementById('quarterLabel').textContent = q;
    const rows = D.mileageByState[q].slice().sort((a, b) => b.miles - a.miles);

    let totalMiles = 0, totalGallons = 0, totalTax = 0;
    document.getElementById('iftaBody').innerHTML = rows.map(r => {
      const rate = D.iftaTaxRates[r.state] || 0;
      const tax = r.gallons * rate;
      const mpg = r.gallons > 0 ? (r.miles / r.gallons) : 0;
      totalMiles += r.miles; totalGallons += r.gallons; totalTax += tax;
      return `
        <tr>
          <td><strong>${r.state}</strong></td>
          <td class="text-end">${TOMS.formatNumber(r.miles)}</td>
          <td class="text-end">${TOMS.formatNumber(r.miles)}</td>
          <td class="text-end">${TOMS.formatNumber(r.gallons)}</td>
          <td class="text-end">${mpg.toFixed(2)}</td>
          <td class="text-end">$${rate.toFixed(2)}/gal</td>
          <td class="text-end" style="font-weight:600;">${TOMS.formatMoney(tax)}</td>
        </tr>
      `;
    }).join('');

    document.getElementById('totalMiles').textContent = TOMS.formatNumber(totalMiles);
    document.getElementById('totalTaxableMiles').textContent = TOMS.formatNumber(totalMiles);
    document.getElementById('totalGallons').textContent = TOMS.formatNumber(totalGallons);
    document.getElementById('avgMpg').textContent = totalGallons > 0 ? (totalMiles / totalGallons).toFixed(2) : '-';
    document.getElementById('totalTax').textContent = TOMS.formatMoney(totalTax);

    document.getElementById('iftaSummaryCards').innerHTML = `
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="label">${t('ifta.summary.quarter')}</div>
          <div class="value">${q}</div>
          <div class="delta">${t('ifta.summary.quarterHint')}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="label">${t('ifta.summary.totalMiles')}</div>
          <div class="value">${TOMS.formatNumber(totalMiles)}</div>
          <div class="delta">${t('ifta.summary.totalMilesHint')}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="label">${t('ifta.summary.totalGallons')}</div>
          <div class="value">${TOMS.formatNumber(Math.round(totalGallons))}</div>
          <div class="delta">${t('ifta.summary.totalGallonsHint')}</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="label">${t('ifta.summary.estimatedTax')}</div>
          <div class="value" style="color:#dc2626;">${TOMS.formatMoney(totalTax)}</div>
          <div class="delta">${t('ifta.summary.estimatedTaxHint')}</div>
        </div>
      </div>
    `;
  }

  document.getElementById('fuelBody').innerHTML = D.fuelPurchases.slice().reverse().slice(0, 12).map(f => `
    <tr>
      <td>${TOMS.formatDate(f.date)}</td>
      <td><strong>${f.truckId}</strong></td>
      <td>${f.state}</td>
      <td>${f.vendor}</td>
      <td>${f.fuelType}</td>
      <td class="text-end">${f.gallons.toFixed(1)}</td>
      <td class="text-end">$${f.pricePerGal.toFixed(2)}</td>
      <td class="text-end" style="font-weight:600;">${TOMS.formatMoney(f.total)}</td>
    </tr>
  `).join('');

  document.getElementById('quarterSelect').addEventListener('change', render);

  document.getElementById('exportFuelBtn').addEventListener('click', () => {
    const headers = ['Date', 'Truck', 'State', 'Vendor', 'Fuel Type', 'Gallons', 'Price/Gal', 'Total'];
    const rows = D.fuelPurchases.map(f => [f.date, f.truckId, f.state, f.vendor, f.fuelType, f.gallons, f.pricePerGal, f.total]);
    TOMS.downloadCSV(`fuel-purchases-${new Date().toISOString().slice(0,10)}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('ifta.toast.fuelExported'), 'success');
  });

  document.getElementById('exportIftaBtn').addEventListener('click', () => {
    const q = document.getElementById('quarterSelect').value;
    const rows = D.mileageByState[q].map(r => {
      const rate = D.iftaTaxRates[r.state] || 0;
      return [r.state, r.miles, r.miles, r.gallons, (r.gallons > 0 ? (r.miles / r.gallons).toFixed(2) : ''), rate, (r.gallons * rate).toFixed(2)];
    });
    const headers = ['State', 'Total Miles', 'Taxable Miles', 'Gallons', 'MPG', 'Tax Rate', 'Estimated Tax'];
    TOMS.downloadCSV(`ifta-${q.replace(/ /g,'-')}.csv`, TOMS.toCSV(rows, headers));
    TOMS.toast(t('ifta.toast.iftaExported', { q }), 'success');
  });

  render();
})();
