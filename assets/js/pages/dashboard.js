/**
 * Dashboard page renderer
 */
(function () {
  if (!TOMS.requireAuth()) return;
  const t = TOMS.t;

  const D = window.TOMS_DATA;

  // ===== Fleet Overview 统计 =====
  const totalTrucks = D.trucks.length;
  const activeDrivers = D.drivers.filter(d => d.status === 'Active').length;
  const availableTrailers = D.trailers.filter(tr => tr.status === 'Available').length;
  const trucksInMaint = D.trucks.filter(tr => tr.status === 'Maintenance').length;

  // ===== Financial Summary (5 月) =====
  const may = (s) => s.date && s.date.startsWith('2026-05');
  const monthRevenue = D.incomes.filter(may).reduce((s, x) => s + x.amount, 0);
  const monthFuel = D.expenses.filter(e => may(e) && e.category === 'Fuel').reduce((s, x) => s + x.amount, 0);
  const monthMaint = D.expenses.filter(e => may(e) && (e.category === 'Maintenance' || e.category === 'Repairs')).reduce((s, x) => s + x.amount, 0);
  const monthDriverPay = D.expenses.filter(e => may(e) && e.category === 'Driver Payments').reduce((s, x) => s + x.amount, 0);

  // ===== IFTA Summary (当前季度 Q2 2026) =====
  const iftaQ = D.mileageByState['Q2 2026'];
  const iftaGallons = iftaQ.reduce((s, x) => s + x.gallons, 0);
  const iftaMiles = iftaQ.reduce((s, x) => s + x.miles, 0);
  const iftaTax = iftaQ.reduce((s, x) => s + x.gallons * (D.iftaTaxRates[x.state] || 0), 0);

  TOMS.renderLayout('dashboard', 'dashboard.pageTitle');

  const root = document.getElementById('tomsContent');
  root.innerHTML = `
    <!-- ===== Fleet Overview ===== -->
    <h5 class="mb-3 fw-semibold">${t('dashboard.fleet.section')}</h5>
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('dashboard.fleet.totalTrucks')}</div>
              <div class="value">${totalTrucks}</div>
              <div class="delta">${t('dashboard.fleet.totalTrucksHint')}</div>
            </div>
            <div class="stat-icon blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h2.2c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3h4.4c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3H22V9.5L18.5 5H14V3H3v14zM15 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('dashboard.fleet.activeDrivers')}</div>
              <div class="value">${activeDrivers}</div>
              <div class="delta up">${t('dashboard.fleet.activeDriversHint')}</div>
            </div>
            <div class="stat-icon green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-9.8 1.7-9.8 5v2.8h19.6V19c0-3.3-6.5-5-9.8-5z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('dashboard.fleet.availableTrailers')}</div>
              <div class="value">${availableTrailers}</div>
              <div class="delta">${t('dashboard.fleet.availableTrailersHint')}</div>
            </div>
            <div class="stat-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v12H3z M5 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0z M15 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" fill-rule="evenodd"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-icon-wrap">
            <div>
              <div class="label">${t('dashboard.fleet.inMaintenance')}</div>
              <div class="value">${trucksInMaint}</div>
              <div class="delta down">${t('dashboard.fleet.inMaintenanceHint')}</div>
            </div>
            <div class="stat-icon amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <!-- ===== Financial Summary ===== -->
      <div class="col-12 col-lg-8">
        <div class="section-card">
          <div class="section-header">
            <h5 class="section-title">${t('dashboard.financial.section')} <span class="section-subtitle">${t('dashboard.financial.period')}</span></h5>
            <a href="expenses.html" class="text-decoration-none small">${t('common.actions.viewDetails')}</a>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-6 col-md-3">
              <div class="mini-stat">
                <div class="label">${t('dashboard.financial.revenue')}</div>
                <div class="value" style="font-size:1.25rem; color:#16a34a;">${TOMS.formatMoney(monthRevenue)}</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="mini-stat">
                <div class="label">${t('dashboard.financial.fuel')}</div>
                <div class="value" style="font-size:1.25rem;">${TOMS.formatMoney(monthFuel)}</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="mini-stat">
                <div class="label">${t('dashboard.financial.maintenance')}</div>
                <div class="value" style="font-size:1.25rem;">${TOMS.formatMoney(monthMaint)}</div>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="mini-stat">
                <div class="label">${t('dashboard.financial.driverPay')}</div>
                <div class="value" style="font-size:1.25rem;">${TOMS.formatMoney(monthDriverPay)}</div>
              </div>
            </div>
          </div>
          <div style="position:relative; height:260px;">
            <canvas id="financeChart"></canvas>
          </div>
        </div>
      </div>

      <!-- ===== Alerts ===== -->
      <div class="col-12 col-lg-4">
        <div class="section-card" style="height:100%;">
          <div class="section-header">
            <h5 class="section-title">${t('dashboard.alerts.section')}</h5>
            <span class="badge bg-danger">${D.alerts.filter(a => a.severity === 'danger').length}</span>
          </div>
          <div id="alertsList"></div>
        </div>
      </div>
    </div>

    <!-- ===== IFTA Summary ===== -->
    <div class="section-card">
      <div class="section-header">
        <h5 class="section-title">${t('dashboard.ifta.section')} <span class="section-subtitle">${t('dashboard.ifta.period')}</span></h5>
        <a href="ifta.html" class="text-decoration-none small">${t('common.actions.fullReport')}</a>
      </div>
      <div class="row g-3">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="label">${t('dashboard.ifta.quarterlyFuel')}</div>
            <div class="value">${TOMS.formatNumber(Math.round(iftaGallons))} <span style="font-size:1rem; color:#6b7280;">gal</span></div>
            <div class="delta">${t('dashboard.ifta.quarterlyFuelHint')}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="label">${t('dashboard.ifta.totalMiles')}</div>
            <div class="value">${TOMS.formatNumber(iftaMiles)}</div>
            <div class="delta">${t('dashboard.ifta.totalMilesHint')}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="label">${t('dashboard.ifta.estimatedTax')}</div>
            <div class="value" style="color:#dc2626;">${TOMS.formatMoney(iftaTax)}</div>
            <div class="delta">${t('dashboard.ifta.estimatedTaxHint')}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="label">${t('dashboard.ifta.jurisdictions')}</div>
            <div class="value">${iftaQ.length}</div>
            <div class="delta">${t('dashboard.ifta.jurisdictionsHint')}</div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <table class="toms-table">
          <thead><tr>
            <th>${t('dashboard.ifta.table.state')}</th>
            <th class="text-end">${t('dashboard.ifta.table.miles')}</th>
            <th class="text-end">${t('dashboard.ifta.table.gallons')}</th>
            <th class="text-end">${t('dashboard.ifta.table.taxRate')}</th>
            <th class="text-end">${t('dashboard.ifta.table.estimatedTax')}</th>
          </tr></thead>
          <tbody>
            ${iftaQ.slice().sort((a,b) => b.miles - a.miles).slice(0, 6).map(s => `
              <tr>
                <td><strong>${s.state}</strong></td>
                <td class="text-end">${TOMS.formatNumber(s.miles)}</td>
                <td class="text-end">${TOMS.formatNumber(s.gallons)}</td>
                <td class="text-end">$${(D.iftaTaxRates[s.state] || 0).toFixed(2)}/gal</td>
                <td class="text-end">${TOMS.formatMoney(s.gallons * (D.iftaTaxRates[s.state] || 0))}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // ===== Render alerts list =====
  const alertTitleKey = {
    'license': 'alert.title.license',
    'medical': 'alert.title.medical',
    'insurance': 'alert.title.insurance',
    'dot': 'alert.title.dot',
    'maintenance.upcoming': 'alert.title.maintenance.upcoming',
    'maintenance.overdue': 'alert.title.maintenance.overdue',
    'hazmat': 'alert.title.hazmat',
  };
  const alertHtml = D.alerts.slice(0, 6).map(a => {
    const days = TOMS.daysFromNow(a.date);
    const dayText = days == null ? ''
      : days < 0 ? `<span class="badge-pill danger">${t('common.days.overdue', { n: Math.abs(days) })}</span>`
      : days <= 7 ? `<span class="badge-pill warning">${t('common.days.after', { n: days })}</span>`
      : `<span class="badge-pill info">${t('common.days.after', { n: days })}</span>`;
    // Determine title key
    let titleKey = alertTitleKey[a.type];
    if (a.type === 'maintenance') {
      titleKey = a.severity === 'danger' ? 'alert.title.maintenance.overdue' : 'alert.title.maintenance.upcoming';
    }
    const title = titleKey ? t(titleKey) : a.title.split(' / ')[0]; // fallback
    return `
      <div class="d-flex align-items-start gap-2 py-2 border-bottom">
        <div class="flex-shrink-0 mt-1">
          <span class="badge-pill ${a.severity}" style="padding:0.3rem 0.4rem;">●</span>
        </div>
        <div class="flex-grow-1" style="min-width:0;">
          <div style="font-size:0.88rem; font-weight:600;">${title}</div>
          <div class="text-muted-sm" style="margin:2px 0;">${a.subject}</div>
          <div class="text-muted-sm">${a.detail}</div>
        </div>
        <div>${dayText}</div>
      </div>
    `;
  }).join('');
  document.getElementById('alertsList').innerHTML = alertHtml;

  // ===== Chart.js: Revenue vs Expenses =====
  // Make chart labels respect locale
  const chartLabels = TOMS.getLocale() === 'en-US'
    ? ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
    : ['12月', '1月', '2月', '3月', '4月', '5月'];

  const ctx = document.getElementById('financeChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: t('dashboard.chart.revenue'),
          data: D.monthlyTrend.revenue,
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
          tension: 0.35,
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
        },
        {
          label: t('dashboard.chart.expenses'),
          data: D.monthlyTrend.expenses,
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.35,
          fill: true,
          borderWidth: 2,
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: (c) => `${c.dataset.label}: $${c.raw.toLocaleString()}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => '$' + (v / 1000) + 'k' }
        }
      }
    }
  });
})();
