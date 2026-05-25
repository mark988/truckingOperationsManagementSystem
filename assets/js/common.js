/**
 * TOMS Common JS
 * - 登录态检查与登出
 * - 多语言切换 (i18n)
 * - 侧边栏与顶部导航渲染
 * - CSV 导出 / 格式化工具
 */
(function () {
  // ==== i18n ====
  const DEFAULT_LOCALE = 'zh-CN';
  const SUPPORTED = ['zh-CN', 'en-US'];

  function getLocale() {
    const stored = localStorage.getItem('toms_locale');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LOCALE;
  }
  function setLocale(loc) {
    if (!SUPPORTED.includes(loc)) return;
    localStorage.setItem('toms_locale', loc);
    window.location.reload();
  }
  function t(key, params) {
    const dict = (window.TOMS_I18N && window.TOMS_I18N[getLocale()]) || {};
    let s = dict[key];
    if (s == null) {
      // Fallback to en-US, then to the key itself for visibility
      s = (window.TOMS_I18N && window.TOMS_I18N['en-US'] && window.TOMS_I18N['en-US'][key]) || key;
    }
    if (params) {
      Object.keys(params).forEach(k => {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
      });
    }
    return s;
  }
  // 把带 data-i18n / data-i18n-placeholder / data-i18n-title 的节点替换为对应翻译
  function applyTranslations(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
  }

  // 在 head 内联脚本可以先设置 <html lang> + <title>,这里再做一次保险
  function applyDocumentLocale(pageTitleKey) {
    document.documentElement.lang = getLocale();
    if (pageTitleKey) {
      document.title = `${t('app.name')} · ${t(pageTitleKey)}`;
    }
  }

  const NAV = [
    { id: 'dashboard',   labelKey: 'nav.dashboard',   href: 'dashboard.html',
      icon: '<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>' },
    { id: 'drivers',     labelKey: 'nav.drivers',     href: 'drivers.html',
      icon: '<path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.3 0-9.8 1.7-9.8 5v2.8h19.6V19c0-3.3-6.5-5-9.8-5z"/>' },
    { id: 'equipment',   labelKey: 'nav.equipment',   href: 'equipment.html',
      icon: '<path d="M3 17h2.2c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3h4.4c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3H22V9.5L18.5 5H14V3H3v14zm15-9.5h.6L20.5 9H18V7.5zM15 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>' },
    { id: 'expenses',    labelKey: 'nav.expenses',    href: 'expenses.html',
      icon: '<path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-1 16l-4-4 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z"/>' },
    { id: 'ifta',        labelKey: 'nav.ifta',        href: 'ifta.html',
      icon: '<path d="M19 3h-4.2c-.4-1.2-1.5-2-2.8-2s-2.4.8-2.8 2H5C3.9 3 3 3.9 3 5v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-2 16l-4-4 1.4-1.4L10 16.2l6.6-6.6L18 11l-8 8z"/>' },
    { id: 'maintenance', labelKey: 'nav.maintenance', href: 'maintenance.html',
      icon: '<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>' },
  ];

  // ==== Auth ====
  function getUser() {
    try { return JSON.parse(localStorage.getItem('toms_user') || 'null'); } catch (_) { return null; }
  }
  function setUser(u) { localStorage.setItem('toms_user', JSON.stringify(u)); }
  function clearUser() { localStorage.removeItem('toms_user'); }
  function requireAuth() {
    if (!getUser()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }
  function logout() {
    clearUser();
    window.location.href = 'index.html';
  }

  // ==== Layout: render shared sidebar + topbar ====
  function renderLayout(activeId, pageTitleKey) {
    applyDocumentLocale(pageTitleKey);
    const locale = getLocale();
    const user = getUser() || { name: 'Guest', role: 'guest' };
    const initial = user.name ? user.name.charAt(0).toUpperCase() : 'G';
    const pageTitle = pageTitleKey ? t(pageTitleKey) : '';

    const dateStr = new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

    const navItems = NAV.map(item => `
      <a href="${item.href}" class="${item.id === activeId ? 'active' : ''}" data-nav="${item.id}">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">${item.icon}</svg>
        <span>${t(item.labelKey)}</span>
      </a>
    `).join('');

    const shell = `
      <div class="app-shell">
        <aside class="sidebar" id="tomsSidebar">
          <div class="sidebar-header">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 17h2.2c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3h4.4c.4 1.7 1.9 3 3.8 3s3.4-1.3 3.8-3H22V9.5L18.5 5H14V3H3v14zm15-9.5h.6L20.5 9H18V7.5zM15 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM9 17a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
            </svg>
            <span>${t('app.name')}</span>
          </div>
          <nav class="sidebar-nav">
            <div class="nav-section">${t('nav.section.main')}</div>
            ${navItems}
          </nav>
          <div class="sidebar-footer">
            <div>${t('app.version')}</div>
            <div class="text-muted-sm">${t('app.shortDesc')}</div>
          </div>
        </aside>
        <div class="main-area">
          <div class="topbar">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <button class="menu-toggle" id="tomsMenuToggle" aria-label="menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
              </button>
              <h1 class="page-title">${pageTitle}</h1>
            </div>
            <div class="topbar-right">
              <span class="text-muted-sm d-none d-md-inline">${dateStr}</span>
              ${renderLangSwitcher()}
              <div class="dropdown">
                <button class="btn btn-link p-0 dropdown-toggle user-chip text-decoration-none" data-bs-toggle="dropdown">
                  <span class="avatar">${initial}</span>
                  <span class="d-none d-sm-inline">${user.name} (${user.role})</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><span class="dropdown-item-text text-muted small">${user.name}</span></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" id="tomsLogoutBtn">${t('topbar.logout')}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <main class="content" id="tomsContent"></main>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', shell);

    document.getElementById('tomsLogoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
    document.getElementById('tomsMenuToggle').addEventListener('click', () => {
      document.getElementById('tomsSidebar').classList.toggle('show');
    });
    bindLangSwitcher();
  }

  // ==== Language switcher ====
  function renderLangSwitcher() {
    const cur = getLocale();
    return `
      <div class="lang-switcher" role="group" aria-label="Language">
        <button type="button" class="lang-btn ${cur === 'zh-CN' ? 'active' : ''}" data-lang="zh-CN" title="中文">中</button>
        <button type="button" class="lang-btn ${cur === 'en-US' ? 'active' : ''}" data-lang="en-US" title="English">EN</button>
      </div>
    `;
  }
  function bindLangSwitcher() {
    document.querySelectorAll('.lang-switcher .lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== getLocale()) setLocale(lang);
      });
    });
  }

  // ==== Helpers ====
  function formatMoney(n, opts = {}) {
    if (n == null) return '-';
    const { compact = false, currency = 'USD' } = opts;
    if (compact && Math.abs(n) >= 1000) {
      return '$' + (n / 1000).toFixed(1) + 'k';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n);
  }
  function formatNumber(n) {
    if (n == null) return '-';
    return new Intl.NumberFormat('en-US').format(n);
  }
  function formatDate(d) {
    if (!d) return '-';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toISOString().slice(0, 10);
  }
  function daysFromNow(d) {
    if (!d) return null;
    const target = new Date(d).getTime();
    const today = new Date(); today.setHours(0,0,0,0);
    return Math.round((target - today.getTime()) / (1000 * 60 * 60 * 24));
  }
  // status (canonical EN form) -> badge HTML with translated label
  function statusBadge(status) {
    const colorMap = {
      'Active':       'success',
      'In Service':   'success',
      'Available':    'success',
      'Paid':         'success',
      'Completed':    'success',
      'Scheduled':    'info',
      'In Use':       'info',
      'In Progress':  'info',
      'Pending':      'warning',
      'Upcoming':     'warning',
      'On Leave':     'warning',
      'Maintenance':  'warning',
      'Overdue':      'danger',
      'Inactive':     'gray',
    };
    const keyMap = {
      'Active': 'common.status.Active',
      'In Service': 'common.status.InService',
      'Available': 'common.status.Available',
      'Paid': 'common.status.Paid',
      'Completed': 'common.status.Completed',
      'Scheduled': 'common.status.Scheduled',
      'In Use': 'common.status.InUse',
      'In Progress': 'common.status.InProgress',
      'Pending': 'common.status.Pending',
      'Upcoming': 'common.status.Upcoming',
      'On Leave': 'common.status.OnLeave',
      'Maintenance': 'common.status.Maintenance',
      'Overdue': 'common.status.Overdue',
      'Inactive': 'common.status.Inactive',
      'Expiring': 'common.status.Expiring',
    };
    const cls = colorMap[status] || 'gray';
    const label = keyMap[status] ? t(keyMap[status]) : status;
    return `<span class="badge-pill ${cls}">${label}</span>`;
  }

  // CSV
  function toCSV(rows, headers) {
    const esc = (v) => {
      if (v == null) return '';
      const s = String(v);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const lines = [];
    if (headers) lines.push(headers.map(esc).join(','));
    rows.forEach(row => {
      const arr = Array.isArray(row) ? row : headers.map(h => row[h]);
      lines.push(arr.map(esc).join(','));
    });
    return lines.join('\n');
  }
  function downloadCSV(filename, csvString) {
    const blob = new Blob(['﻿' + csvString], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }

  function toast(message, type = 'info') {
    const el = document.createElement('div');
    el.className = `alert alert-${type} position-fixed shadow`;
    el.style.cssText = 'top:1rem;right:1rem;z-index:2000;min-width:240px;';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 2200);
  }

  window.TOMS = {
    // auth
    getUser, setUser, clearUser, requireAuth, logout,
    // i18n
    getLocale, setLocale, t, applyTranslations, applyDocumentLocale,
    // layout
    renderLayout,
    // format
    formatMoney, formatNumber, formatDate, daysFromNow, statusBadge,
    // util
    toCSV, downloadCSV, toast,
  };
})();
