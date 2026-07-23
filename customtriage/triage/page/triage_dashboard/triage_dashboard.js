frappe.pages['triage-dashboard'].on_page_load = function (wrapper) {
	if (!document.getElementById('td-css')) {
		const s = document.createElement('style'); s.id = 'td-css';
		s.textContent = TD_CSS; document.head.appendChild(s);
	}
	const page = frappe.ui.make_app_page({ parent: wrapper, title: 'Triage Dashboard', single_column: true });
	$(wrapper).find('.page-head').hide();
	$(page.main).css({ padding: 0, background: '#f0f4fa' }).html(TD_HTML);
	['td-modal-overlay','td-nmodal-overlay','td-smodal-overlay','td-sharemodal-overlay','td-fab']
		.forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
	document.body.insertAdjacentHTML('beforeend', TD_MODALS);
	setTimeout(() => { if (window.TD) TD.init(); }, 150);
};

/* ═══════════════════════════════════════════════════════════
   HTML
═══════════════════════════════════════════════════════════ */
const TD_HTML = `<div id="td-app">

<div class="td-header">
  <div class="td-header-main">
    <div class="td-header-left">
      <div class="td-header-logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div>
        <h1 class="td-header-title">Community Health Intelligence Center</h1>
        <p class="td-header-sub">Real-time patient monitoring · risk detection · nurse performance · community analytics</p>
      </div>
    </div>
    <div class="td-header-right">
      <a class="td-addpatient-btn" href="/app/nurse-interventions/new-nurse-interventions">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        Add Patient
      </a>
      <div id="td-role-badge" class="td-role-badge">Loading…</div>
      <div class="td-updated-pill"><span class="td-live-dot"></span><span id="td-updated-text">—</span></div>
      <a class="td-workspace-btn" href="/app/triage-home">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
        <span id="td-workspace-label">Open Workspace</span>
      </a>
    </div>
  </div>
  <div class="td-trust-strip">
    <span class="td-trust-item">🔒 Role-based access</span>
    <span class="td-trust-dot">·</span>
    <span class="td-trust-item">⚡ Live sync from field records</span>
    <span class="td-trust-dot">·</span>
    <span class="td-trust-item">🏥 Built for clinical leadership</span>
  </div>
</div>

<div class="td-filters-wrap">
  <button class="td-filter-toggle" id="td-filter-toggle" onclick="TD.toggleFilters()">
    <span class="td-filter-toggle-left">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      Filters
    </span>
    <span style="display:flex;align-items:center;gap:8px">
      <span class="td-filter-toggle-count" id="td-filter-toggle-count"></span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="td-filter-chev"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
  </button>
  <div class="td-filter-card" id="td-filter-card">
    <div class="td-filter-head">
      <span class="td-filter-head-title"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Analytics Filters</span>
      <span class="td-filter-hint">Select one or more · then Apply</span>
    </div>
    <div class="td-filters">
      <div class="td-fgroup"><label>Start Date</label><input type="date" id="td-from"></div>
      <div class="td-fgroup"><label>End Date</label><input type="date" id="td-to"></div>
      <div class="td-fgroup">
        <label>Community</label>
        <div class="td-ms" data-field="community">
          <button type="button" class="td-ms-btn" onclick="TD.toggleMs('community')">
            <span class="td-ms-label-wrap" id="td-ms-wrap-community"><span class="td-ms-placeholder">All Communities</span></span>
            <svg class="td-ms-chev" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="td-ms-panel" id="td-ms-panel-community">
            <input class="td-ms-search" placeholder="Search…" oninput="TD.filterMs('community',this.value)">
            <div class="td-ms-options" id="td-ms-opts-community"></div>
            <div class="td-ms-foot"><button type="button" onclick="TD.clearMs('community')">Clear</button></div>
          </div>
        </div>
      </div>
      <div class="td-fgroup" id="td-nurse-filter-wrap" style="display:none">
        <label>Nurse</label>
        <div class="td-ms" data-field="nurse">
          <button type="button" class="td-ms-btn" onclick="TD.toggleMs('nurse')">
            <span class="td-ms-label-wrap" id="td-ms-wrap-nurse"><span class="td-ms-placeholder">All Nurses</span></span>
            <svg class="td-ms-chev" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="td-ms-panel" id="td-ms-panel-nurse">
            <input class="td-ms-search" placeholder="Search…" oninput="TD.filterMs('nurse',this.value)">
            <div class="td-ms-options" id="td-ms-opts-nurse"></div>
            <div class="td-ms-foot"><button type="button" onclick="TD.clearMs('nurse')">Clear</button></div>
          </div>
        </div>
      </div>
      <div class="td-fgroup">
        <label>Gender</label>
        <div class="td-ms" data-field="gender">
          <button type="button" class="td-ms-btn" onclick="TD.toggleMs('gender')">
            <span class="td-ms-label-wrap" id="td-ms-wrap-gender"><span class="td-ms-placeholder">All Genders</span></span>
            <svg class="td-ms-chev" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="td-ms-panel" id="td-ms-panel-gender">
            <div class="td-ms-options" id="td-ms-opts-gender"></div>
            <div class="td-ms-foot"><button type="button" onclick="TD.clearMs('gender')">Clear</button></div>
          </div>
        </div>
      </div>
      <div class="td-factions">
        <button class="td-btn td-btn-apply" onclick="TD.load()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Apply Filters
        </button>
        <button class="td-btn td-btn-reset" onclick="TD.clearAll()">Reset</button>
      </div>
    </div>
    <div id="td-active-filters" class="td-chips-row"></div>
  </div>
</div>

<div id="td-error-box"></div>

<div class="td-section">
  <div class="td-cards" id="td-cards">
    <div class="td-card-skel"></div><div class="td-card-skel"></div>
    <div class="td-card-skel"></div><div class="td-card-skel"></div>
    <div class="td-card-skel"></div><div class="td-card-skel"></div>
  </div>
</div>

<div class="td-section" id="td-quickactions-section" style="display:none">
  <div class="td-section-label"><span class="td-dot" style="background:#0d6b5e"></span>Quick Actions</div>
  <div class="td-nstat-row" id="td-nstat-row"></div>
  <div class="td-quick-grid">
    <a class="td-quick-card td-quick-primary" href="/app/nurse-interventions/new-nurse-interventions">
      <span class="td-quick-ico">➕</span><span class="td-quick-label">Add Patient</span><span class="td-quick-sub">Register a new intervention</span>
    </a>
    <button class="td-quick-card" onclick="TD.scrollTo('td-summaries-section')">
      <span class="td-quick-ico">📄</span><span class="td-quick-label">Patient Summaries</span><span class="td-quick-sub">Download &amp; share PDFs</span>
    </button>
    <a class="td-quick-card" href="/app/nurse-interventions">
      <span class="td-quick-ico">📋</span><span class="td-quick-label">Recent Interventions</span><span class="td-quick-sub">Open the full record list</span>
    </a>
    <button class="td-quick-card" onclick="TD.openRedFlags()">
      <span class="td-quick-ico">⚠️</span><span class="td-quick-label">High-Risk Patients</span><span class="td-quick-sub">Cases needing review</span>
    </button>
  </div>
</div>

<div class="td-section" id="td-trend-section">
  <div class="td-section-label"><span class="td-dot" style="background:#3b5bdb"></span>Daily Patient Visits</div>
  <div class="td-panel">
    <div class="td-panel-hdr">
      <div class="td-panel-title">Patient Visit Trend</div>
      <div class="td-panel-tools">
        <div class="td-seg" id="td-trend-seg">
          <button data-d="7" onclick="TD.setTrendDays(7)">7D</button>
          <button data-d="30" class="active" onclick="TD.setTrendDays(30)">30D</button>
          <button data-d="90" onclick="TD.setTrendDays(90)">90D</button>
          <button data-d="180" onclick="TD.setTrendDays(180)">6M</button>
          <button data-d="365" onclick="TD.setTrendDays(365)">1Y</button>
          <button data-d="custom" onclick="TD.toggleCustomRange()">Custom</button>
        </div>
        <button class="td-export-btn" onclick="TD.exportTrend()">↓ CSV</button>
      </div>
    </div>
    <div class="td-custom-range" id="td-custom-range">
      <label>From</label><input type="date" id="td-trend-from">
      <label>To</label><input type="date" id="td-trend-to">
      <button class="td-custom-apply" onclick="TD.applyCustomRange()">Apply</button>
    </div>
    <div id="td-trend-chart" class="td-chart-body td-chart-xtall">
      <div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div>
    </div>
  </div>
</div>

<div class="td-section">
  <div class="td-section-label"><span class="td-dot" style="background:#dc2626"></span>Red Flag Patients</div>
  <div class="td-redflag-grid">
    <div class="td-redflag-card">
      <div><span class="td-redflag-tag">High Priority</span></div>
      <div class="td-redflag-num" id="td-redflag-num">0</div>
      <div class="td-redflag-lbl">Red Flag Patients</div>
      <div class="td-redflag-desc">Chest pain / critical cases needing immediate clinical review</div>
      <button class="td-redflag-btn" onclick="TD.openRedFlags()">View All Details →</button>
    </div>
    <div class="td-panel td-redflag-chart-panel">
      <div class="td-panel-hdr"><div class="td-panel-title">Red Flag Diagnosis Breakdown</div></div>
      <div id="td-redflag-breakdown" class="td-chart-body">
        <div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div>
      </div>
    </div>
  </div>
</div>

<div class="td-section">
  <div class="td-section-label"><span class="td-dot" style="background:#6366f1"></span>Community Coverage</div>
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">Patients by Community</div><button class="td-export-btn" onclick="TD.exportCommunity()">↓ CSV</button></div>
    <div id="td-community-chart" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
</div>

<div class="td-section">
  <div class="td-section-label"><span class="td-dot" style="background:#0891b2"></span>Diagnosis Analytics</div>
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">Patients by Condition <span class="td-panel-badge">Top 15</span></div></div>
    <div id="td-conditions" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
</div>

<div class="td-section td-grid-2">
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">Gender Distribution</div></div>
    <div id="td-gender-chart" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">Age Group Breakdown</div></div>
    <div id="td-age-chart" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
</div>

<div class="td-section td-grid-2">
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">BMI Category</div></div>
    <div id="td-bmi-chart" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
  <div class="td-panel">
    <div class="td-panel-hdr"><div class="td-panel-title">Comorbidities</div></div>
    <div id="td-comorbidity-chart" class="td-chart-body"><div class="td-loading"><div class="td-spinner"></div><span>Loading…</span></div></div>
  </div>
</div>

<div id="td-nurse-section" style="display:none">
  <div class="td-section">
    <div class="td-section-label"><span class="td-dot" style="background:#d97706"></span>Nurse Performance</div>
    <div class="td-panel td-panel-flush">
      <div class="td-table-scroll">
        <table class="td-table td-leaderboard">
          <thead><tr>
            <th style="width:46px">Rank</th><th>Nurse</th><th>Patients</th>
            <th>Red Flags</th><th>Communities</th><th>Score</th><th>Actions</th>
          </tr></thead>
          <tbody id="td-leaderboard-body"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="td-section" id="td-summaries-section" style="display:none">
  <div class="td-section-label"><span class="td-dot" style="background:#2563eb"></span>Patient Summary Download Center</div>
  <div class="td-dtable">
    <div class="td-dtable-toolbar">
      <div class="td-search-box">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input type="text" id="td-summary-search" placeholder="Search summaries…" oninput="TD.searchSummaries(this.value)">
      </div>
      <div style="display:flex;gap:8px">
        <button class="td-export-btn" onclick="TD.exportSummariesCsv()">+CSV</button>
        <button class="td-export-btn" onclick="TD.exportSummariesExcel()">+Excel</button>
      </div>
    </div>
    <div class="td-table-scroll">
      <table class="td-table">
        <thead><tr id="td-summaries-head">
          <th class="td-th-sort" data-k="patient_unique_id" onclick="TD.sortSummaries('patient_unique_id')">Patient ID<span class="td-sort-ind"></span></th>
          <th class="td-th-sort" data-k="patient_name" onclick="TD.sortSummaries('patient_name')">Patient Name<span class="td-sort-ind"></span></th>
          <th class="td-th-sort" data-k="gender" onclick="TD.sortSummaries('gender')">Gender<span class="td-sort-ind"></span></th>
          <th class="td-th-sort" data-k="age" onclick="TD.sortSummaries('age')">Age<span class="td-sort-ind"></span></th>
          <th class="td-th-sort" data-k="community_name" onclick="TD.sortSummaries('community_name')">Community<span class="td-sort-ind"></span></th>
          <th class="td-th-sort" data-k="name" onclick="TD.sortSummaries('name')">ID<span class="td-sort-ind"></span></th>
          <th>Summary</th>
        </tr></thead>
        <tbody id="td-summaries-body"><tr><td colspan="7" class="td-loading-cell"><div class="td-spinner"></div></td></tr></tbody>
      </table>
    </div>
    <div class="td-dtable-foot" id="td-summaries-foot"></div>
  </div>
</div>

<div class="td-section" id="td-highrisk-section" style="display:none">
  <div class="td-section-label"><span class="td-dot" style="background:#dc2626"></span>Recent High-Risk Cases</div>
  <div class="td-panel td-panel-flush">
    <div class="td-table-scroll">
      <table class="td-table">
        <thead><tr><th>Patient</th><th>Community</th><th>Visit Date</th><th>Nurse</th><th>Open</th></tr></thead>
        <tbody id="td-highrisk-body"><tr><td colspan="5" class="td-loading-cell"><div class="td-spinner"></div></td></tr></tbody>
      </table>
    </div>
  </div>
</div>

<div class="td-section">
  <div class="td-section-label"><span class="td-dot" style="background:#0ca678"></span>Recent Patients</div>
  <div class="td-panel td-panel-flush">
    <div class="td-panel-hdr td-panel-hdr-flush">
      <div class="td-panel-title">Latest Records</div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="td-search-box">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="text" id="td-recent-search" placeholder="Search patients…" oninput="TD.searchRecent(this.value)">
        </div>
        <button class="td-export-btn" onclick="TD.exportRecent()">↓ CSV</button>
      </div>
    </div>
    <div class="td-table-scroll">
      <table class="td-table">
        <thead><tr>
          <th>Patient ID</th><th>Name</th><th>Age</th><th>Gender</th>
          <th>Community</th><th>Visit Date</th><th>Risk</th><th>Nurse</th><th>BMI</th><th>Diagnosis</th><th>Conditions</th>
        </tr></thead>
        <tbody id="td-tbody"><tr><td colspan="11" class="td-loading-cell"><div class="td-spinner"></div></td></tr></tbody>
      </table>
    </div>
  </div>
</div>

</div>`;

/* ═══════════════════════════════════════════════════════════
   MODALS (injected into body)
═══════════════════════════════════════════════════════════ */
const TD_MODALS = `
<div id="td-modal-overlay" onclick="TD.closeModal()">
  <div id="td-modal" onclick="event.stopPropagation()">
    <div class="td-modal-hdr">
      <div class="td-modal-hdr-left"><div class="td-modal-title" id="td-modal-title">Details</div><div class="td-modal-sub" id="td-modal-sub"></div></div>
      <div class="td-modal-actions">
        <button class="td-modal-export" onclick="TD.exportModal()">↓ Export CSV</button>
        <button class="td-modal-close" onclick="TD.closeModal()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button>
      </div>
    </div>
    <div class="td-modal-stats" id="td-modal-stats"></div>
    <div class="td-modal-body">
      <div class="td-table-scroll">
        <table class="td-table"><thead id="td-modal-thead"></thead><tbody id="td-modal-tbody"></tbody></table>
      </div>
    </div>
  </div>
</div>

<div id="td-nmodal-overlay" onclick="TD.closeNurse()">
  <div id="td-nmodal" onclick="event.stopPropagation()">
    <div class="td-modal-hdr">
      <div class="td-nmodal-hdr-left">
        <div class="td-nmodal-avatar" id="td-nmodal-avatar">N</div>
        <div><div class="td-modal-title" id="td-nmodal-title">Nurse</div><div class="td-modal-sub" id="td-nmodal-sub"></div></div>
      </div>
      <div class="td-modal-actions">
        <button class="td-modal-export" onclick="TD.exportNurse()">↓ CSV</button>
        <button class="td-modal-close" onclick="TD.closeNurse()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button>
      </div>
    </div>
    <div class="td-nmodal-body">
      <div class="td-nmodal-kpis" id="td-nmodal-kpis"></div>
      <div class="td-nmodal-section"><div class="td-nmodal-sec-title">Daily Trend <span>(last 30 days)</span></div><div id="td-nmodal-trend" class="td-nmodal-chart"></div></div>
      <div class="td-nmodal-section"><div class="td-nmodal-sec-title">Diagnosis Distribution</div><div id="td-nmodal-diag"></div></div>
      <div class="td-nmodal-section">
        <div class="td-nmodal-sec-title">Recent Patients</div>
        <div class="td-table-scroll">
          <table class="td-table"><thead><tr><th>Patient ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Community</th><th>Visit Date</th><th>BMI</th><th>Diagnosis</th></tr></thead>
          <tbody id="td-nmodal-recent"></tbody></table>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="td-smodal-overlay" onclick="TD.closeSummary()">
  <div id="td-smodal" onclick="event.stopPropagation()">
    <div class="td-modal-hdr">
      <div class="td-modal-hdr-left"><div class="td-modal-title">Summary Preview</div><div class="td-modal-sub" id="td-smodal-sub"></div></div>
      <div class="td-modal-actions">
        <a class="td-modal-export" id="td-smodal-download" href="#" target="_blank">↓ Download PDF</a>
        <button class="td-modal-close" onclick="TD.closeSummary()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button>
      </div>
    </div>
    <div class="td-smodal-body"><iframe id="td-smodal-frame" src="about:blank" title="Preview"></iframe></div>
  </div>
</div>

<a id="td-fab" class="td-fab" href="/app/nurse-interventions/new-nurse-interventions" title="Add Patient">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
</a>`;

/* ═══════════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════════ */
const TD_CSS = `
.page-container,.page-content,.frappe-app{max-width:100%!important}
#td-app{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,sans-serif;background:#f0f4fa;min-height:calc(100vh - 60px);padding-bottom:80px;color:#1a1f36}
#td-app *{box-sizing:border-box;margin:0;padding:0}

.td-header{background:linear-gradient(135deg,#0d1117 0%,#1a2744 55%,#0d2137 100%);box-shadow:0 4px 24px rgba(0,0,0,.4)}
.td-header-main{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;gap:12px;flex-wrap:wrap}
.td-header-left{display:flex;align-items:center;gap:14px}
.td-header-logo{width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.td-header-title{font-size:19px;font-weight:800;color:#fff;line-height:1.2}
.td-header-sub{font-size:11px;color:rgba(255,255,255,.4);margin-top:2px;font-weight:500}
.td-header-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.td-addpatient-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;background:#16a34a;color:#fff;text-decoration:none;font-size:13px;font-weight:700;transition:all .15s;white-space:nowrap}
.td-addpatient-btn:hover{background:#15803d;transform:translateY(-1px)}
.td-role-badge{font-size:12px;font-weight:700;padding:5px 14px;border-radius:20px;background:rgba(255,255,255,.14);color:#fff;white-space:nowrap}
.td-updated-pill{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,.4)}
.td-live-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.4);animation:td-pulse 2s infinite}
@keyframes td-pulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
.td-workspace-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.8);text-decoration:none;font-size:12px;font-weight:600;transition:all .15s;white-space:nowrap}
.td-workspace-btn:hover{background:rgba(255,255,255,.18);color:#fff}
.td-trust-strip{border-top:1px solid rgba(255,255,255,.06);padding:7px 28px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.td-trust-item{font-size:11px;color:rgba(255,255,255,.32);font-weight:500}
.td-trust-dot{color:rgba(255,255,255,.18)}

.td-filters-wrap{padding:0 28px}
.td-filter-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;padding:11px 0;border:none;background:none;cursor:pointer;font-size:13px;font-weight:700;color:#374151;border-bottom:1.5px solid #e5e7eb}
.td-filter-toggle-left{display:flex;align-items:center;gap:8px}
.td-filter-toggle-count{font-size:11px;font-weight:800;padding:1px 8px;border-radius:20px;background:#2563eb;color:#fff}
.td-filter-toggle-count:empty{display:none}
.td-filter-chev{transition:transform .2s;color:#9ca3af}
.td-filter-toggle.open .td-filter-chev{transform:rotate(180deg)}
.td-filter-card{background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:16px;margin:10px 0;display:none;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.td-filter-card.open{display:block}
.td-filter-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.td-filter-head-title{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:#1a1f36}
.td-filter-hint{font-size:11px;color:#9ca3af}
.td-filters{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}
.td-fgroup{display:flex;flex-direction:column;gap:4px}
.td-fgroup label{font-size:10px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.7px}
.td-fgroup input[type=date]{border:1.5px solid #e5e7eb;border-radius:8px;padding:7px 10px;font-size:13px;background:#f9fafb;color:#374151;min-width:140px;cursor:pointer;transition:border .15s}
.td-fgroup input[type=date]:focus{outline:none;border-color:#2563eb;background:#fff}
.td-factions{display:flex;gap:8px;align-items:flex-end}
.td-btn{padding:8px 18px;border-radius:8px;border:none;cursor:pointer;font-size:13px;font-weight:700;transition:all .15s}
.td-btn-apply{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;display:flex;align-items:center;gap:6px}
.td-btn-apply:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(37,99,235,.4)}
.td-btn-reset{background:#f3f4f6;color:#6b7280;border:1.5px solid #e5e7eb}
.td-btn-reset:hover{background:#e5e7eb}
.td-chips-row{display:flex;flex-wrap:wrap;gap:6px;padding:8px 0 4px;min-height:0}
.td-chips-row:empty{display:none!important}
.td-chip-label{font-size:10.5px;color:#9ca3af;font-weight:700}
.td-chip{display:inline-flex;border-radius:20px;overflow:hidden;font-size:11px;font-weight:700;border:1.5px solid #bfdbfe}
.td-chip-key{background:#2563eb;color:#fff;padding:2px 7px}
.td-chip-val{background:#eff6ff;color:#1d4ed8;padding:2px 9px}

.td-ms{position:relative;min-width:160px}
.td-ms-btn{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%;padding:7px 10px;border:1.5px solid #e5e7eb;border-radius:8px;background:#f9fafb;cursor:pointer;font-size:13px;text-align:left;transition:border .15s}
.td-ms.open .td-ms-btn{border-color:#2563eb;background:#fff}
.td-ms-label-wrap{flex:1;display:flex;flex-wrap:wrap;gap:4px;min-width:0}
.td-ms-placeholder{color:#9ca3af;font-size:12.5px}
.td-ms-pill{display:inline-flex;align-items:center;gap:3px;background:#dbeafe;color:#1d4ed8;border-radius:12px;padding:1px 8px;font-size:11px;font-weight:700}
.td-ms-pill-x{border:none;background:none;cursor:pointer;padding:0;color:#2563eb;font-size:13px;line-height:1}
.td-ms-more{font-size:11px;color:#6b7280;font-weight:600}
.td-ms-chev{flex-shrink:0;transition:transform .2s;color:#9ca3af}
.td-ms.open .td-ms-chev{transform:rotate(180deg)}
.td-ms-panel{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.12);z-index:999;display:none;min-width:180px}
.td-ms.open .td-ms-panel{display:block}
.td-ms-search{display:block;width:100%;padding:8px 12px;border:none;border-bottom:1px solid #f3f4f6;font-size:12.5px;outline:none;border-radius:10px 10px 0 0}
.td-ms-options{max-height:180px;overflow-y:auto}
.td-ms-opt{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;font-size:12.5px;transition:background .1s}
.td-ms-opt:hover{background:#f9fafb}
.td-ms-opt.sel{background:#eff6ff}
.td-ms-check{width:16px;height:16px;border-radius:4px;border:1.5px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;flex-shrink:0}
.td-ms-opt.sel .td-ms-check{background:#2563eb;border-color:#2563eb;color:#fff}
.td-ms-empty{padding:12px;text-align:center;font-size:12px;color:#9ca3af}
.td-ms-foot{border-top:1px solid #f3f4f6;padding:6px 10px}
.td-ms-foot button{border:none;background:none;cursor:pointer;font-size:11.5px;color:#6b7280;font-weight:600}
.td-ms-foot button:hover{color:#374151}

#td-error-box{padding:0 28px}
.td-error{background:#fef2f2;border:1.5px solid #fecaca;color:#b91c1c;border-radius:10px;padding:12px 16px;margin:10px 0;font-size:13px;font-weight:500}

.td-section{padding:20px 28px 0}
.td-grid-2{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:16px}
.td-section-label{display:flex;align-items:center;gap:9px;font-size:10.5px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px}
.td-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.td-section-label::after{content:'';flex:1;height:1.5px;background:linear-gradient(90deg,#e5e7eb,transparent);margin-left:4px}

.td-panel{background:#fff;border-radius:14px;padding:20px;border:1px solid #e8eaf0;box-shadow:0 1px 4px rgba(0,0,0,.04),0 4px 14px rgba(0,0,0,.04)}
.td-panel-flush{padding:0}
.td-panel-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px}
.td-panel-hdr-flush{padding:16px 20px 12px;margin-bottom:0}
.td-panel-title{font-size:13px;font-weight:800;color:#1a1f36;display:flex;align-items:center;gap:8px}
.td-panel-title::before{content:'';width:3px;height:16px;border-radius:3px;background:linear-gradient(180deg,#2563eb,#6366f1);flex-shrink:0}
.td-panel-badge{font-size:11px;color:#9ca3af;font-weight:500;font-style:italic}
.td-panel-tools{display:flex;align-items:center;gap:8px}
.td-export-btn{font-size:11.5px;font-weight:700;color:#6b7280;padding:5px 12px;border-radius:8px;border:1.5px solid #e5e7eb;background:#f9fafb;cursor:pointer;white-space:nowrap}
.td-export-btn:hover{background:#f3f4f6;color:#374151}

.td-seg{display:flex;border-radius:8px;overflow:hidden;border:1.5px solid #e5e7eb}
.td-seg button{padding:5px 10px;border:none;background:#f9fafb;cursor:pointer;font-size:12px;font-weight:700;color:#6b7280;border-right:1px solid #e5e7eb;transition:all .15s}
.td-seg button:last-child{border-right:none}
.td-seg button.active{background:#2563eb;color:#fff}
.td-custom-range{display:none;align-items:center;gap:10px;padding:10px 0 0;flex-wrap:wrap}
.td-custom-range.show{display:flex}
.td-custom-range label{font-size:11px;font-weight:700;color:#6b7280}
.td-custom-range input[type=date]{border:1.5px solid #e5e7eb;border-radius:7px;padding:5px 9px;font-size:12px}
.td-custom-apply{padding:6px 14px;border-radius:7px;border:none;background:#2563eb;color:#fff;font-size:12px;font-weight:700;cursor:pointer}

.td-chart-body{min-height:60px}
.td-chart-xtall{min-height:240px}
.td-loading{display:flex;align-items:center;justify-content:center;gap:10px;padding:30px;color:#9ca3af;font-size:13px}
.td-spinner{width:22px;height:22px;border-radius:50%;border:2.5px solid #e5e7eb;border-top-color:#2563eb;animation:td-spin .7s linear infinite;flex-shrink:0}
@keyframes td-spin{to{transform:rotate(360deg)}}

.td-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
.td-card-skel{height:130px;border-radius:14px;background:linear-gradient(90deg,#eef0f8 25%,#e3e6f0 50%,#eef0f8 75%);background-size:200% 100%;animation:td-shimmer 1.6s infinite}
@keyframes td-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
.td-card{background:#fff;border-radius:14px;padding:18px 16px 14px;border:1px solid #e8eaf0;box-shadow:0 1px 4px rgba(0,0,0,.04),0 4px 12px rgba(0,0,0,.04);cursor:pointer;position:relative;overflow:hidden;transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s;user-select:none}
.td-card:hover{transform:translateY(-5px);box-shadow:0 10px 32px rgba(0,0,0,.12)}
.td-card-accent{position:absolute;bottom:0;left:0;right:0;height:4px}
.td-card-lbl{font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.td-card-val{font-size:40px;font-weight:900;line-height:1;letter-spacing:-2px;color:#111827;margin-bottom:6px}
.td-card-foot{font-size:11px}
.td-card-delta{font-weight:700}
.td-card-delta.up{color:#16a34a}.td-card-delta.down{color:#dc2626}.td-card-delta.flat{color:#9ca3af}
.td-card-desc{color:#9ca3af}

.td-nstat-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}
.td-nstat{display:flex;align-items:center;gap:10px;background:#fff;border-radius:10px;padding:12px 16px;border:1px solid #e8eaf0;flex:1;min-width:140px}
.td-nstat-ico{font-size:20px}
.td-nstat-val{font-size:22px;font-weight:900;color:#1a1f36;line-height:1}
.td-nstat-key{font-size:11px;color:#9ca3af;font-weight:600;margin-top:2px}
.td-quick-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.td-quick-card{display:flex;flex-direction:column;gap:4px;background:#fff;border-radius:12px;padding:16px;border:1.5px solid #e8eaf0;cursor:pointer;transition:all .18s;text-decoration:none;text-align:left}
.td-quick-card:hover{border-color:#2563eb;transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,.15)}
.td-quick-primary{border-color:#2563eb;background:#eff6ff}
.td-quick-ico{font-size:22px}
.td-quick-label{font-size:13px;font-weight:800;color:#1a1f36}
.td-quick-sub{font-size:11px;color:#9ca3af}

.td-redflag-grid{display:grid;grid-template-columns:220px 1fr;gap:16px}
.td-redflag-card{background:linear-gradient(135deg,#7f1d1d,#991b1b);border-radius:14px;padding:20px;color:#fff;display:flex;flex-direction:column;gap:8px}
.td-redflag-tag{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;background:rgba(255,255,255,.15);padding:3px 10px;border-radius:20px;display:inline-block;width:fit-content}
.td-redflag-num{font-size:60px;font-weight:900;line-height:1;letter-spacing:-4px}
.td-redflag-lbl{font-size:13px;font-weight:700;opacity:.9}
.td-redflag-desc{font-size:11px;opacity:.6}
.td-redflag-btn{margin-top:auto;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;text-align:left;transition:background .15s}
.td-redflag-btn:hover{background:rgba(255,255,255,.28)}

.td-table-scroll{overflow-x:auto}
.td-table{width:100%;border-collapse:collapse;font-size:12.5px}
.td-table th{padding:10px 14px;text-align:left;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:#9ca3af;border-bottom:1.5px solid #f3f4f6;white-space:nowrap;background:#fafbfc}
.td-table td{padding:11px 14px;border-bottom:1px solid #f3f4f6;color:#374151;vertical-align:middle}
.td-table tr:last-child td{border-bottom:none}
.td-table tr:hover td{background:#f9fafb}
.td-table a{color:#2563eb;text-decoration:none;font-weight:600}
.td-table a:hover{text-decoration:underline}
.td-loading-cell{text-align:center;padding:30px}
.td-empty{text-align:center;padding:30px;color:#9ca3af;font-size:13px}

.td-gtag{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700}
.td-gtag.male{background:#dbeafe;color:#1d4ed8}
.td-gtag.female{background:#fce7f3;color:#be185d}
.td-gtag.other{background:#f3f4f6;color:#374151}
.td-ctag{display:inline-block;padding:1px 7px;border-radius:5px;font-size:10px;font-weight:700;background:#e0e7ff;color:#3730a3;margin:1px}
.td-risk-tag{display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700}
.td-risk-low{background:#dcfce7;color:#15803d}
.td-risk-high{background:#fee2e2;color:#dc2626}
.td-pdf-btn{display:inline-block;padding:5px 12px;border-radius:7px;background:#2563eb;color:#fff;font-size:11.5px;font-weight:700;text-decoration:none;margin-right:6px;transition:background .15s}
.td-pdf-btn:hover{background:#1d4ed8;color:#fff}
.td-share-btn{padding:5px 12px;border-radius:7px;background:#fff;border:1.5px solid #e5e7eb;color:#374151;font-size:11.5px;font-weight:700;cursor:pointer;transition:all .15s}
.td-share-btn:hover{background:#f3f4f6}
.td-top-badge{display:inline-block;font-size:10px;font-weight:800;padding:1px 8px;border-radius:20px;background:#fef3c7;color:#d97706;border:1px solid #fde68a;margin-left:6px}

.td-leaderboard .td-rank-cell{text-align:center;font-size:16px;font-weight:900}
.td-rank-1{color:#f59e0b}.td-rank-2{color:#9ca3af}.td-rank-3{color:#d97706}
.td-score-bar{height:5px;background:#e5e7eb;border-radius:3px;margin-top:3px;min-width:60px;display:inline-block;vertical-align:middle;width:80px}
.td-score-fill{height:5px;border-radius:3px;background:linear-gradient(90deg,#2563eb,#6366f1)}

.td-dtable{background:#fff;border-radius:14px;border:1px solid #e8eaf0;box-shadow:0 1px 4px rgba(0,0,0,.04),0 4px 14px rgba(0,0,0,.04);overflow:hidden}
.td-dtable-toolbar{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #f3f4f6;flex-wrap:wrap;gap:10px}
.td-dtable-foot{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-top:1px solid #f3f4f6;font-size:12px;color:#6b7280;flex-wrap:wrap;gap:8px}
.td-pager{display:flex;gap:4px}
.td-pager button{padding:4px 10px;border:1.5px solid #e5e7eb;border-radius:6px;background:#f9fafb;cursor:pointer;font-size:12px;font-weight:600}
.td-pager button.active,.td-pager button:hover{background:#2563eb;color:#fff;border-color:#2563eb}
.td-search-box{display:flex;align-items:center;gap:8px;border:1.5px solid #e5e7eb;border-radius:8px;padding:6px 10px;background:#f9fafb}
.td-search-box input{border:none;outline:none;background:none;font-size:13px;min-width:160px}
.td-th-sort{cursor:pointer;user-select:none}
.td-sort-ind{margin-left:3px;font-size:10px;color:#9ca3af}
.td-th-sort.asc .td-sort-ind::after{content:'↑'}.td-th-sort.desc .td-sort-ind::after{content:'↓'}

.td-hbar-row{display:flex;align-items:center;gap:8px;margin-bottom:7px}
.td-hbar-lbl{width:160px;font-size:12px;color:#374151;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0}
.td-hbar-track{flex:1;height:22px;background:#f3f4f6;border-radius:4px;overflow:hidden}
.td-hbar-fill{height:100%;border-radius:4px;display:flex;align-items:center;padding:0 6px;min-width:24px;transition:width .4s}
.td-hbar-fill b{font-size:11px;font-weight:800;color:#fff}
.td-hbar-num{width:36px;text-align:right;font-size:12px;font-weight:700;color:#374151;flex-shrink:0}

.td-donut-wrap{display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap}
.td-donut-leg{display:flex;flex-direction:column;gap:8px;flex:1;min-width:120px}
.td-leg-row{display:flex;align-items:center;gap:8px;font-size:12px}
.td-leg-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.td-leg-lbl{flex:1;color:#374151}
.td-leg-cnt{font-weight:700;color:#1a1f36}
.td-leg-pct{color:#9ca3af;min-width:32px;text-align:right}

#td-fab{position:fixed;bottom:24px;right:24px;z-index:900;width:52px;height:52px;border-radius:50%;background:#16a34a;color:#fff;display:none;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 20px rgba(22,163,74,.5);transition:all .2s}
#td-fab.td-show{display:flex}
#td-fab:hover{transform:scale(1.1)}

#td-modal-overlay,#td-nmodal-overlay,#td-smodal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2000;display:none;align-items:center;justify-content:center;padding:20px}
#td-modal-overlay.open,#td-nmodal-overlay.open,#td-smodal-overlay.open{display:flex}
#td-modal,#td-nmodal,#td-smodal{background:#fff;border-radius:16px;width:100%;max-width:900px;max-height:88vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden}
#td-smodal{max-width:960px;height:82vh}
.td-modal-hdr{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #f3f4f6;background:#fafbfc;flex-shrink:0}
.td-modal-hdr-left{display:flex;flex-direction:column;gap:2px}
.td-modal-title{font-size:16px;font-weight:800;color:#1a1f36}
.td-modal-sub{font-size:12px;color:#6b7280}
.td-modal-actions{display:flex;align-items:center;gap:8px}
.td-modal-export{font-size:12px;font-weight:700;padding:6px 14px;border-radius:8px;border:1.5px solid #e5e7eb;background:#f9fafb;cursor:pointer;color:#374151;text-decoration:none;white-space:nowrap}
.td-modal-export:hover{background:#f3f4f6}
.td-modal-close{border:none;background:none;cursor:pointer;padding:6px;border-radius:8px;color:#6b7280;line-height:0}
.td-modal-close:hover{background:#f3f4f6}
.td-modal-stats{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;border-bottom:1px solid #f3f4f6;flex-shrink:0}
.td-modal-stat-card{text-align:center;padding:8px 14px;border-radius:8px;background:#f9fafb;border:1.5px solid #e5e7eb}
.td-modal-stat-v{font-size:20px;font-weight:900;color:#1a1f36;line-height:1}
.td-modal-stat-k{font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;margin-top:2px}
.td-modal-body{flex:1;overflow:auto;padding:16px 20px}
.td-nmodal-hdr-left{display:flex;align-items:center;gap:12px}
.td-nmodal-avatar{width:44px;height:44px;border-radius:50%;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;flex-shrink:0}
.td-nmodal-body{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:20px}
.td-nmodal-kpis{display:flex;flex-wrap:wrap;gap:10px}
.td-nmodal-kpi{text-align:center;padding:12px 16px;border-radius:10px;background:#f9fafb;border:1.5px solid #e5e7eb;flex:1;min-width:90px}
.td-nmodal-kpi-v{font-size:24px;font-weight:900;color:#1a1f36}
.td-nmodal-kpi-k{font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;margin-top:3px}
.td-nmodal-section{}
.td-nmodal-sec-title{font-size:12px;font-weight:800;color:#374151;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}
.td-nmodal-sec-title span{color:#9ca3af;font-weight:500;text-transform:none}
.td-nmodal-chart{min-height:80px}
.td-smodal-body{flex:1;overflow:hidden}
.td-smodal-body iframe{width:100%;height:100%;border:none}

@media(max-width:768px){
  .td-header-main{padding:14px 16px}
  .td-filters-wrap,.td-section{padding-left:14px;padding-right:14px}
  .td-trust-strip{display:none}
  .td-redflag-grid,.td-grid-2{grid-template-columns:1fr}
  #td-modal,#td-nmodal,#td-smodal{border-radius:0;max-height:100vh;height:100vh}
}
`;

/* ═══════════════════════════════════════════════════════════
   TD MODULE
═══════════════════════════════════════════════════════════ */
window.TD = (() => {
	const COLORS = {
		blue:'#2563eb', indigo:'#6366f1', teal:'#0d9488', green:'#16a34a',
		red:'#dc2626', amber:'#d97706', purple:'#7c3aed', cyan:'#0891b2',
		pink:'#db2777', slate:'#64748b', emerald:'#059669', violet:'#8b5cf6'
	};
	const SERIES = ['#2563eb','#0891b2','#0d9488','#16a34a','#7c3aed','#d97706',
	                '#db2777','#6366f1','#059669','#dc2626','#64748b','#8b5cf6'];

	let _data = null, _trendDays = 30, _trendFrom = '', _trendTo = '';
	let _recentAll = [], _recentFiltered = [];
	let _nurseExportData = null;

	const _ms = {
		community: { all:[], sel:new Set(), placeholder:'All Communities', noun:'Communities' },
		nurse:     { all:[], sel:new Set(), placeholder:'All Nurses', noun:'Nurses' },
		gender:    { all:['Male','Female','Other'], sel:new Set(), placeholder:'All Genders', noun:'Genders' }
	};
	const _sum = { rows:[], view:[], page:1, perPage:10, sortKey:'visit_date', sortDir:'desc', q:'' };

	/* ── Helpers ──────────────────────────────────────── */
	const $id = id => document.getElementById(id);
	const _esc = s => String(s == null ? '—' : s)
		.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
	function _today() {
		const d = new Date();
		return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
	}
	function _ts() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }
	function _showError(m) { const b=$id('td-error-box'); if(b) b.innerHTML='<div class="td-error">⚠️ '+m+'</div>'; }
	function _clearError() { const b=$id('td-error-box'); if(b) b.innerHTML=''; }
	function _getCsrf() {
		try { if(window.frappe&&frappe.csrf_token&&frappe.csrf_token!=='{{ csrf_token }}') return frappe.csrf_token; } catch(e){}
		const m=document.cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith('csrf_token='));
		return m ? decodeURIComponent(m.split('=')[1]) : '';
	}
	function _pdfUrl(name) {
		return '/api/method/frappe.utils.print_format.download_pdf?doctype=Nurse+Interventions&name='+encodeURIComponent(name);
	}
	function _printUrl(name) {
		return '/printview?doctype=Nurse+Interventions&name='+encodeURIComponent(name)+'&trigger_print=0';
	}
	function _csvDownload(filename, rows, cols) {
		const hdr = cols.map(c=>'"'+c.label+'"').join(',');
		const body = rows.map(r=>cols.map(c=>'"'+String(r[c.key]??'').replace(/"/g,'""')+'"').join(',')).join('\n');
		const blob = new Blob([hdr+'\n'+body], {type:'text/csv'});
		const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click();
	}

	/* ── Init ────────────────────────────────────────── */
	function init() {
		_renderMsOptions('gender'); _renderMsButton('gender');
		// Open filter panel by default so filters are immediately visible
		const card=$id('td-filter-card'), btn=$id('td-filter-toggle');
		if(card) card.classList.add('open');
		if(btn) btn.classList.add('open');
		load();
	}
	function reset() { clearAll(); }
	function clearAll() {
		const f=$id('td-from'), t=$id('td-to');
		if(f) f.value=''; if(t) t.value='';
		Object.keys(_ms).forEach(k=>{ _ms[k].sel.clear(); _renderMsOptions(k); _renderMsButton(k); });
		_trendDays=30; _trendFrom=''; _trendTo='';
		const cr=$id('td-custom-range'); if(cr) cr.classList.remove('show');
		_setSegActive(30);
		const rs=$id('td-recent-search'); if(rs) rs.value='';
		const ss=$id('td-summary-search'); if(ss) ss.value='';
		load();
	}

	/* ── Multi-select ────────────────────────────────── */
	function toggleMs(field) {
		const box=document.querySelector('.td-ms[data-field="'+field+'"]'); if(!box) return;
		const wasOpen=box.classList.contains('open');
		document.querySelectorAll('.td-ms.open').forEach(el=>el.classList.remove('open'));
		if(!wasOpen) box.classList.add('open');
	}
	function filterMs(field, q) {
		q=(q||'').toLowerCase();
		document.querySelectorAll('#td-ms-opts-'+field+' .td-ms-opt').forEach(o=>{
			o.style.display=o.getAttribute('data-val').toLowerCase().includes(q)?'flex':'none';
		});
	}
	function _renderMsOptions(field) {
		const wrap=$id('td-ms-opts-'+field); if(!wrap) return;
		const st=_ms[field];
		if(!st.all.length) { wrap.innerHTML='<div class="td-ms-empty">No options</div>'; return; }
		wrap.innerHTML=st.all.map(v=>{
			const on=st.sel.has(v);
			return '<div class="td-ms-opt'+(on?' sel':'')+'" data-val="'+_esc(v)+'" '+
				'onclick="TD.pickMs(\''+field+'\',this.getAttribute(\'data-val\'))">'+
				'<span class="td-ms-check">'+(on?'✓':'')+'</span>'+
				'<span>'+_esc(v)+'</span></div>';
		}).join('');
	}
	function _renderMsButton(field) {
		const wrap=$id('td-ms-wrap-'+field); if(!wrap) return;
		const st=_ms[field]; const sel=Array.from(st.sel);
		if(!sel.length) { wrap.innerHTML='<span class="td-ms-placeholder">'+_esc(st.placeholder)+'</span>'; return; }
		const shown=sel.slice(0,2);
		let html=shown.map(v=>'<span class="td-ms-pill"><span>'+_esc(v)+'</span>'+
			'<button type="button" class="td-ms-pill-x" onclick="event.stopPropagation();TD.pickMs(\''+field+'\',\''+_esc(v).replace(/'/g,"\\'")+'\')">×</button></span>').join('');
		if(sel.length>2) html+='<span class="td-ms-more">+'+(sel.length-2)+' more</span>';
		wrap.innerHTML=html;
	}
	function pickMs(field, val) {
		const st=_ms[field];
		if(st.sel.has(val)) st.sel.delete(val); else st.sel.add(val);
		const wrap=$id('td-ms-opts-'+field);
		if(wrap) wrap.querySelectorAll('.td-ms-opt').forEach(opt=>{
			if(opt.getAttribute('data-val')===val) {
				const on=st.sel.has(val);
				opt.classList.toggle('sel',on);
				const chk=opt.querySelector('.td-ms-check'); if(chk) chk.textContent=on?'✓':'';
			}
		});
		_renderMsButton(field);
	}
	function clearMs(field) { _ms[field].sel.clear(); _renderMsOptions(field); _renderMsButton(field); }

	document.addEventListener('click', e=>{
		if(!e.target.closest||!e.target.closest('.td-ms'))
			document.querySelectorAll('.td-ms.open').forEach(el=>el.classList.remove('open'));
	});

	/* ── Filter toggle ───────────────────────────────── */
	function toggleFilters() {
		const card=$id('td-filter-card'), btn=$id('td-filter-toggle'); if(!card) return;
		const open=card.classList.toggle('open');
		if(btn) btn.classList.toggle('open',open);
	}
	function _updateFilterCount() {
		const el=$id('td-filter-toggle-count'); if(!el) return;
		let n=0;
		const f=$id('td-from'), t=$id('td-to');
		if(f&&f.value) n++; if(t&&t.value) n++;
		Object.keys(_ms).forEach(k=>{ n+=_ms[k].sel.size; });
		el.textContent=n>0?String(n):'';
	}

	/* ── Trend controls ──────────────────────────────── */
	function setTrendDays(d) { _trendDays=d; _trendFrom=''; _trendTo=''; const cr=$id('td-custom-range'); if(cr) cr.classList.remove('show'); _setSegActive(d); load(); }
	function _setSegActive(d) {
		const seg=$id('td-trend-seg'); if(!seg) return;
		seg.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.getAttribute('data-d')!=='custom'&&parseInt(b.getAttribute('data-d'),10)===d));
	}
	function toggleCustomRange() {
		const row=$id('td-custom-range'); if(!row) return;
		const open=row.classList.toggle('show');
		const seg=$id('td-trend-seg');
		if(seg) seg.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.getAttribute('data-d')==='custom'?open:false));
	}
	function applyCustomRange() {
		const f=$id('td-trend-from'), t=$id('td-trend-to');
		const fv=f?f.value:'', tv=t?t.value:'';
		if(!fv||!tv) { _showError('Please pick both From and To dates for the custom range.'); return; }
		if(fv>tv) { _showError('From date must be before To date.'); return; }
		_trendFrom=fv; _trendTo=tv; load();
	}

	/* ── Filter chips ────────────────────────────────── */
	function _renderChips() {
		const wrap=$id('td-active-filters'); if(!wrap) return;
		const chips=[];
		const f=$id('td-from'), t=$id('td-to');
		if(f&&f.value) chips.push({label:'From',val:f.value});
		if(t&&t.value) chips.push({label:'To',val:t.value});
		Object.keys(_ms).forEach(k=>{ const st=_ms[k]; if(st.sel.size) chips.push({label:st.noun,val:Array.from(st.sel).join(', ')}); });
		wrap.innerHTML=chips.length?'<span class="td-chip-label">Active:</span>'+
			chips.map(c=>'<span class="td-chip"><span class="td-chip-key">'+_esc(c.label)+'</span><span class="td-chip-val">'+_esc(c.val)+'</span></span>').join(''):'';
	}

	/* ── Load ────────────────────────────────────────── */
	function load() {
		_clearError(); _renderChips(); _updateFilterCount();
		const f=$id('td-from'), t=$id('td-to');
		const body=new URLSearchParams();
		if(f&&f.value) body.append('from_date',f.value);
		if(t&&t.value) body.append('to_date',t.value);
		if(_ms.community.sel.size) body.append('community',Array.from(_ms.community.sel).join('|'));
		if(_ms.nurse.sel.size)     body.append('nurse',Array.from(_ms.nurse.sel).join('|'));
		if(_ms.gender.sel.size)    body.append('gender',Array.from(_ms.gender.sel).join('|'));
		if(_trendFrom&&_trendTo) { body.append('trend_from',_trendFrom); body.append('trend_to',_trendTo); }
		else body.append('trend_days',String(_trendDays));

		fetch('/api/method/get_triage_data',{
			method:'POST',
			headers:{'Content-Type':'application/x-www-form-urlencoded','X-Frappe-CSRF-Token':_getCsrf()},
			body:body.toString()
		})
		.then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status+' — Is Server Script enabled and named get_triage_data?'); return r.json(); })
		.then(resp=>{
			if(resp.exc) throw new Error('Server error — open browser console for details');
			if(!resp.message) throw new Error('Empty response from server');
			_data=resp.message; _render(_data);
		})
		.catch(e=>{ _showError(e.message); console.error('[Triage]',e); });
	}

	/* ── Render all ──────────────────────────────────── */
	function _render(d) {
		if(!d||typeof d!=='object') { _showError('Invalid data from server'); return; }
		const isAdmin=!!d.is_admin;

		const badge=$id('td-role-badge');
		if(badge) { badge.textContent=isAdmin?'👑 Admin View':'👩‍⚕️ Nurse View'; badge.style.background=isAdmin?'rgba(255,215,0,.18)':'rgba(255,255,255,.14)'; badge.style.color=isAdmin?'#ffd740':'#fff'; }
		const upd=$id('td-updated-text'); if(upd) upd.textContent=_ts();
		const wsl=$id('td-workspace-label'); if(wsl) wsl.textContent=isAdmin?'Admin Workspace':'My Workspace';
		const nfw=$id('td-nurse-filter-wrap'); if(nfw) nfw.style.display=isAdmin?'flex':'none';

		_ms.community.all=d.communities||[]; _renderMsOptions('community'); _renderMsButton('community');
		if(isAdmin) { _ms.nurse.all=d.nurses||[]; _renderMsOptions('nurse'); _renderMsButton('nurse'); }
		_renderMsButton('gender');

		_renderCards(d.summary||{});

		const rfNum=$id('td-redflag-num'); if(rfNum) rfNum.textContent=(d.summary||{}).red_flag_patients||0;
		_renderHbar('td-redflag-breakdown', (d.red_flag_breakdown||[]).slice(0,10), 'diagnosis', 'count', COLORS.red);

		_renderLine('td-trend-chart', d.trend||[], COLORS.blue);
		_renderHbar('td-community-chart', d.community||[], 'community', 'count', SERIES);
		_renderHbar('td-conditions', (d.conditions||[]).slice(0,15), 'condition', 'count', SERIES);
		_renderDonut('td-gender-chart', d.gender||[], 'gender', 'count', [COLORS.pink, COLORS.blue, COLORS.green]);
		_renderHbar('td-age-chart', d.age_groups||[], 'age_group', 'count', COLORS.teal);
		_renderDonut('td-bmi-chart', d.bmi||[], 'category', 'count', [COLORS.blue, COLORS.green, COLORS.amber, COLORS.red]);
		_renderHbar('td-comorbidity-chart', (d.comorbidities||[]).filter(x=>x.count>0), 'comorbidity', 'count', COLORS.amber);

		const ns=$id('td-nurse-section');
		if(ns) { if(isAdmin&&d.nurse_stats&&d.nurse_stats.length) { _renderLeaderboard(d.nurse_stats); ns.style.display='block'; } else ns.style.display='none'; }

		const sumSec=$id('td-summaries-section'); if(sumSec) sumSec.style.display='block';
		_renderSummaries(d.all_records||[]);

		const qa=$id('td-quickactions-section'); if(qa) qa.style.display=isAdmin?'none':'block';
		const hr=$id('td-highrisk-section'); if(hr) hr.style.display=isAdmin?'none':'block';
		const fab=$id('td-fab'); if(fab) fab.classList.toggle('td-show',!isAdmin);

		if(!isAdmin) {
			_renderNurseStats(d.summary||{});
			_renderHighRisk(d.red_flags||[]);
		}

		_recentAll=d.recent||[]; _recentFiltered=[..._recentAll];
		_renderTable(_recentFiltered);
	}

	/* ── KPI Cards ───────────────────────────────────── */
	function _renderCards(s) {
		const el=$id('td-cards'); if(!el) return;
		const today=_today(), ms=today.slice(0,8)+'01';
		const delta=s.today_delta||0;
		const dCls=delta>0?'up':delta<0?'down':'flat', dIcon=delta>0?'▲':delta<0?'▼':'–';
		const defs=[
			{lbl:'Patients Today',    val:s.today_patients||0,       desc:`<span class="td-card-delta ${dCls}">${dIcon} ${delta>0?'+':''}${delta}% vs yesterday</span>`,  color:COLORS.green,  fl:r=>r.filter(p=>String(p.visit_date)===today)},
			{lbl:'Total Patients',    val:s.total_patients||0,       desc:'All patients in range',                  color:COLORS.blue,   fl:r=>r},
			{lbl:'This Month',        val:s.this_month_patients||0,  desc:'Current month visits',                   color:COLORS.teal,   fl:r=>r.filter(p=>String(p.visit_date)>=ms)},
			{lbl:'Active Nurses',     val:s.active_nurses||0,        desc:'Submitting records',                     color:COLORS.purple, fl:r=>r},
			{lbl:'Communities',       val:s.communities_covered||0,  desc:'Coverage in range',                      color:COLORS.cyan,   fl:r=>r},
			{lbl:'Red Flag Patients', val:s.red_flag_patients||0,    desc:'High priority cases',                    color:COLORS.red,    fl:r=>r.filter(p=>p.chest_pain==1)},
		];
		el.innerHTML=defs.map((c,i)=>`
			<div class="td-card" role="button" tabindex="0"
				onclick="TD.openCard(${i})"
				onkeydown="if(event.key==='Enter')TD.openCard(${i})"
				style="border-top:3px solid ${c.color}">
				<div class="td-card-lbl">${c.lbl}</div>
				<div class="td-card-val" style="color:${c.color}">${Number(c.val).toLocaleString()}</div>
				<div class="td-card-foot">${c.desc}</div>
			</div>`).join('');
		el._defs=defs;
	}

	/* ── Nurse quick stats ───────────────────────────── */
	function _renderNurseStats(s) {
		const el=$id('td-nstat-row'); if(!el) return;
		const stats=[
			{ico:'🧾',val:s.today_patients||0,key:'Registered Today'},
			{ico:'⚠️',val:s.red_flag_patients||0,key:'High-Risk Cases'},
			{ico:'🏘️',val:s.communities_covered||0,key:'Communities'},
			{ico:'👩‍⚕️',val:s.active_nurses||0,key:'Active Nurses'},
		];
		el.innerHTML=stats.map(x=>`<div class="td-nstat"><span class="td-nstat-ico">${x.ico}</span><div><div class="td-nstat-val">${Number(x.val).toLocaleString()}</div><div class="td-nstat-key">${x.key}</div></div></div>`).join('');
	}

	/* ── Summary download table ──────────────────────── */
	function _renderSummaries(records) { _sum.rows=records||[]; _sum.page=1; _sum.q=''; _sumApply(); }
	function _sumApply() {
		let v=_sum.rows.slice();
		if(_sum.q) { const q=_sum.q; v=v.filter(r=>[r.patient_unique_id,r.patient_name,r.community_name,r.gender].some(x=>String(x||'').toLowerCase().includes(q))); }
		const k=_sum.sortKey, dir=_sum.sortDir==='asc'?1:-1;
		v.sort((a,b)=>{
			let av=a[k], bv=b[k];
			if(k==='age') { av=parseInt(av,10)||0; bv=parseInt(bv,10)||0; return (av-bv)*dir; }
			av=String(av??'').toLowerCase(); bv=String(bv??'').toLowerCase();
			return (av<bv?-1:av>bv?1:0)*dir;
		});
		_sum.view=v;
		const max=Math.max(1,Math.ceil(v.length/_sum.perPage));
		if(_sum.page>max) _sum.page=max;
		_paintSummaries(); _paintSumHead();
	}
	function _paintSumHead() {
		const head=$id('td-summaries-head'); if(!head) return;
		head.querySelectorAll('.td-th-sort').forEach(th=>{
			th.classList.remove('asc','desc');
			if(th.getAttribute('data-k')===_sum.sortKey) th.classList.add(_sum.sortDir);
		});
	}
	function _paintSummaries() {
		const tb=$id('td-summaries-body'), foot=$id('td-summaries-foot'); if(!tb) return;
		const v=_sum.view;
		if(!v.length) { tb.innerHTML='<tr><td colspan="7" class="td-empty">No summaries found</td></tr>'; if(foot) foot.innerHTML=''; return; }
		const start=(_sum.page-1)*_sum.perPage;
		const slice=v.slice(start,start+_sum.perPage);
		tb.innerHTML=slice.map(r=>{
			const nm=_esc(r.name), gc=(r.gender||'').toLowerCase();
			return `<tr>
				<td><a href="/app/nurse-interventions/${nm}" target="_blank">${_esc(r.patient_unique_id||'—')}</a></td>
				<td><b>${_esc(r.patient_name)}</b></td>
				<td><span class="td-gtag ${gc}">${_esc(r.gender)}</span></td>
				<td>${_esc(r.age)}</td>
				<td>${_esc(r.community_name)}</td>
				<td>${_esc(r.name)}</td>
				<td>
					<a href="${_pdfUrl(r.name)}" target="_blank" class="td-pdf-btn">Summary (PDF)</a>
					<button class="td-share-btn" onclick="TD.openSummary('${nm.replace(/'/g,"\\'")}','${_esc(r.patient_name).replace(/'/g,"\\'")}')">Share</button>
				</td></tr>`;
		}).join('');
		if(foot) {
			const total=v.length, pages=Math.ceil(total/_sum.perPage), p=_sum.page;
			let btns='';
			for(let i=1;i<=pages;i++) btns+=`<button${i===p?' class="active"':''} onclick="TD._sumPage(${i})">${i}</button>`;
			foot.innerHTML=`<span>Showing ${start+1}–${Math.min(start+_sum.perPage,total)} of ${total}</span><div class="td-pager">${btns}</div>`;
		}
	}
	function _sumPage(p) { _sum.page=p; _paintSummaries(); _paintSumHead(); }
	function sortSummaries(k) { _sum.sortDir=_sum.sortKey===k&&_sum.sortDir==='asc'?'desc':'asc'; _sum.sortKey=k; _sumApply(); }
	function searchSummaries(q) { _sum.q=(q||'').toLowerCase(); _sum.page=1; _sumApply(); }
	function exportSummariesCsv() {
		const cols=[
			{key:'patient_unique_id',label:'Patient ID'},{key:'patient_name',label:'Patient Name'},
			{key:'gender',label:'Gender'},{key:'age',label:'Age'},
			{key:'community_name',label:'Community'},{key:'name',label:'ID'}
		];
		_csvDownload('patient-summaries.csv', _sum.view, cols);
	}
	function exportSummariesExcel() {
		const cols=[
			{key:'patient_unique_id',label:'Patient ID'},{key:'patient_name',label:'Patient Name'},
			{key:'gender',label:'Gender'},{key:'age',label:'Age'},
			{key:'community_name',label:'Community'},{key:'name',label:'ID'}
		];
		const hdr=cols.map(c=>c.label).join('\t');
		const body=_sum.view.map(r=>cols.map(c=>String(r[c.key]??'')).join('\t')).join('\n');
		const blob=new Blob(['﻿'+hdr+'\n'+body],{type:'application/vnd.ms-excel;charset=utf-8'});
		const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='patient-summaries.xls'; a.click();
	}

	/* ── Chart: Line ─────────────────────────────────── */
	function _renderLine(id, data, color) {
		const el=$id(id); if(!el) return;
		if(!data||!data.length) { el.innerHTML='<div class="td-empty">No trend data available</div>'; return; }
		const W=Math.max(el.getBoundingClientRect().width||680,360);
		const H=240,PL=52,PR=24,PT=24,PB=40;
		const vals=data.map(d=>+(d.count)||0);
		const maxV=Math.max(...vals)||1;
		const cw=W-PL-PR, ch=H-PT-PB;
		const xStep=cw/Math.max(data.length-1,1);
		const pts=data.map((d,i)=>({x:PL+i*xStep,y:PT+(1-(+(d.count)||0)/maxV)*ch,date:d.date,count:+(d.count)||0}));
		function smooth(ps) {
			if(ps.length<2) return 'M'+ps[0].x.toFixed(1)+','+ps[0].y.toFixed(1);
			let p='M'+ps[0].x.toFixed(1)+','+ps[0].y.toFixed(1);
			for(let i=0;i<ps.length-1;i++){const mx=(ps[i].x+ps[i+1].x)/2;p+=` C${mx.toFixed(1)},${ps[i].y.toFixed(1)} ${mx.toFixed(1)},${ps[i+1].y.toFixed(1)} ${ps[i+1].x.toFixed(1)},${ps[i+1].y.toFixed(1)}`;}
			return p;
		}
		const path=smooth(pts), last=pts[pts.length-1];
		const area=path+` L${last.x.toFixed(1)},${PT+ch} L${PL},${PT+ch} Z`;
		const step=Math.ceil(data.length/8);
		const xLbls=pts.filter((_,i)=>i%step===0||i===pts.length-1).map(p=>`<text x="${p.x.toFixed(1)}" y="${H-6}" font-size="10" fill="#94a3b8" text-anchor="middle">${(p.date||'').slice(5)}</text>`).join('');
		const yGrid=[0,.25,.5,.75,1].map(f=>{const v=Math.round(maxV*f),y=(PT+(1-f)*ch).toFixed(1);return `<line x1="${PL}" y1="${y}" x2="${W-PR}" y2="${y}" stroke="#f1f5f9" stroke-width="1"/><text x="${PL-6}" y="${(+y+4).toFixed(1)}" font-size="10" fill="#94a3b8" text-anchor="end">${v}</text>`;}).join('');
		const dots=pts.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${color}" stroke="#fff" stroke-width="2.5"><title>${p.date}: ${p.count} patient${p.count!==1?'s':''}</title></circle>`).join('');
		const peak=Math.max(...vals);
		const peakLbls=pts.filter(p=>p.count===peak).map(p=>`<text x="${p.x.toFixed(1)}" y="${(p.y-10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="800" fill="${color}">${p.count}</text>`).join('');
		const uid='tg'+Math.random().toString(36).slice(2,8);
		el.innerHTML=`<svg width="100%" height="${H}" viewBox="0 0 ${W} ${H}" style="overflow:visible;display:block"><defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity=".25"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>${yGrid}<path d="${area}" fill="url(#${uid})"/><path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${xLbls}${peakLbls}${dots}</svg>`;
	}

	/* ── Chart: Horizontal Bar ───────────────────────── */
	function _renderHbar(id, data, lk, vk, color) {
		const el=$id(id); if(!el) return;
		if(!data||!data.length) { el.innerHTML='<div class="td-empty">No data available</div>'; return; }
		const max=Math.max(...data.map(d=>+(d[vk])||0))||1;
		el.innerHTML=data.map((d,i)=>{
			const v=+(d[vk])||0, pct=Math.max(Math.round(v/max*100),2);
			const col=Array.isArray(color)?color[i%color.length]:color;
			return `<div class="td-hbar-row">
				<div class="td-hbar-lbl" title="${_esc(d[lk])}">${_esc(d[lk])}</div>
				<div class="td-hbar-track"><div class="td-hbar-fill" style="width:${pct}%;background:linear-gradient(90deg,${col},${col}bb)">${v>2?'<b>'+v+'</b>':''}</div></div>
				<div class="td-hbar-num">${v}</div>
			</div>`;
		}).join('');
	}

	/* ── Chart: Donut ────────────────────────────────── */
	function _renderDonut(id, data, lk, vk, colors) {
		const el=$id(id); if(!el) return;
		const flt=(data||[]).filter(d=>(+(d[vk])||0)>0);
		if(!flt.length) { el.innerHTML='<div class="td-empty">No data</div>'; return; }
		const total=flt.reduce((s,d)=>s+(+(d[vk])||0),0);
		const R=60,CX=70,CY=70,SW=26,CI=2*Math.PI*R; let off=0;
		const slices=flt.map((d,i)=>{
			const v=+(d[vk])||0, dash=(v/total)*CI;
			const sl=`<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${colors[i%colors.length]}" stroke-width="${SW}" stroke-dasharray="${dash.toFixed(2)} ${(CI-dash).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${CX} ${CY})"><title>${d[lk]}: ${v} (${Math.round(v/total*100)}%)</title></circle>`;
			off+=dash; return sl;
		}).join('');
		const legend=flt.map((d,i)=>{const v=+(d[vk])||0;return `<div class="td-leg-row"><div class="td-leg-dot" style="background:${colors[i%colors.length]}"></div><span class="td-leg-lbl">${_esc(d[lk])}</span><span class="td-leg-cnt">${v}</span><span class="td-leg-pct">${Math.round(v/total*100)}%</span></div>`;}).join('');
		el.innerHTML=`<div class="td-donut-wrap"><svg width="140" height="140" viewBox="0 0 140 140" style="filter:drop-shadow(0 4px 12px rgba(0,0,0,.1));flex-shrink:0">${slices}<text x="${CX}" y="${CY-7}" text-anchor="middle" font-size="26" font-weight="900" fill="#111827">${total}</text><text x="${CX}" y="${CY+12}" text-anchor="middle" font-size="10" fill="#9ca3af" font-weight="600">TOTAL</text></svg><div class="td-donut-leg">${legend}</div></div>`;
	}

	/* ── Recent patients table ───────────────────────── */
	const FLAGS=[['hypertension','HTN'],['diabetes','DM'],['chest_pain','Chest Pain'],['respiratory_issue','Resp'],['pregnancy_care','Preg'],['diarrhea','Diarr'],['headache','Head'],['screening_for_hypertension','HTN-Scr'],['screening_for_diebetes','DM-Scr']];
	function _renderTable(records) {
		const tb=$id('td-tbody'); if(!tb) return;
		if(!records||!records.length) { tb.innerHTML='<tr><td colspan="11" class="td-empty">No records found</td></tr>'; return; }
		tb.innerHTML=records.map(r=>{
			const tags=FLAGS.filter(f=>r[f[0]]==1).map(f=>`<span class="td-ctag">${f[1]}</span>`).join('');
			const gc=(r.gender||'').toLowerCase();
			const risk=r.risk||'Low', riskCls=risk==='High'?'td-risk-high':'td-risk-low';
			return `<tr>
				<td><a href="/app/nurse-interventions/${r.name}" target="_blank">${_esc(r.patient_unique_id||r.name)}</a></td>
				<td><b>${_esc(r.patient_name)}</b></td>
				<td>${_esc(r.age)}</td>
				<td><span class="td-gtag ${gc}">${_esc(r.gender)}</span></td>
				<td>${_esc(r.community_name)}</td>
				<td>${_esc(r.visit_date)}</td>
				<td><span class="td-risk-tag ${riskCls}">${risk}</span></td>
				<td style="font-size:11px;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${_esc(r.created_by)}">${_esc(r.created_by)}</td>
				<td>${_esc(r.bmi_category)}</td>
				<td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${_esc(r.primary_diagnosis)}">${_esc(r.primary_diagnosis)}</td>
				<td>${tags||'—'}</td>
			</tr>`;
		}).join('');
	}
	function searchRecent(q) {
		q=(q||'').toLowerCase();
		_recentFiltered=q?_recentAll.filter(r=>[r.patient_name,r.patient_unique_id,r.community_name,r.gender,r.primary_diagnosis].some(x=>String(x||'').toLowerCase().includes(q))):_recentAll.slice();
		_renderTable(_recentFiltered);
	}

	/* ── Nurse leaderboard ───────────────────────────── */
	function _renderLeaderboard(stats) {
		const tb=$id('td-leaderboard-body'); if(!tb) return;
		const maxPat=stats[0]?stats[0].total_patients:1;
		tb.innerHTML=stats.map((n,i)=>{
			const rank=i+1, rankCls=rank<=3?`td-rank-${rank}`:'';
			const score=Math.round((n.total_patients/maxPat)*100);
			const initial=(n.nurse||'?')[0].toUpperCase();
			const avatarBg=SERIES[i%SERIES.length];
			const topBadge=rank===1?'<span class="td-top-badge">★ Top</span>':'';
			return `<tr>
				<td class="td-rank-cell"><span class="${rankCls}">${rank<=3?['🥇','🥈','🥉'][rank-1]:rank}</span></td>
				<td>
					<div style="display:flex;align-items:center;gap:8px">
						<div style="width:30px;height:30px;border-radius:50%;background:${avatarBg};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0">${initial}</div>
						<div><b style="cursor:pointer;color:#2563eb" onclick="TD.openNurse(${i})">${_esc(n.nurse)}</b>${topBadge}</div>
					</div>
				</td>
				<td><b>${n.total_patients}</b></td>
				<td style="color:${n.chest_pain_cases>0?'#dc2626':'#9ca3af'}">${n.chest_pain_cases||0}</td>
				<td>${n.communities_covered||0}</td>
				<td><div class="td-score-bar"><div class="td-score-fill" style="width:${score}%"></div></div><span style="font-size:11px;color:#6b7280;margin-left:6px">${score}</span></td>
				<td><button class="td-export-btn" onclick="TD.openNurse(${i})">View Dashboard →</button></td>
			</tr>`;
		}).join('');
	}

	/* ── High risk cases (nurse) ─────────────────────── */
	function _renderHighRisk(records) {
		const tb=$id('td-highrisk-body'); if(!tb) return;
		if(!records||!records.length) { tb.innerHTML='<tr><td colspan="5" class="td-empty">No high-risk cases</td></tr>'; return; }
		tb.innerHTML=records.map(r=>`<tr>
			<td><b>${_esc(r.patient_name)}</b><br><small style="color:#9ca3af">${_esc(r.patient_unique_id)}</small></td>
			<td>${_esc(r.community_name)}</td>
			<td>${_esc(r.visit_date)}</td>
			<td style="font-size:11px">${_esc(r.created_by)}</td>
			<td><a href="/app/nurse-interventions/${_esc(r.name)}" target="_blank" class="td-export-btn">Open →</a></td>
		</tr>`).join('');
	}

	/* ── Modal: Patient card drill-down ──────────────── */
	function openCard(idx) {
		if(!_data) return;
		const el=$id('td-cards'); if(!el||!el._defs) return;
		const def=el._defs[idx], records=def.fl(_recentAll);
		const title=$id('td-modal-title'), sub=$id('td-modal-sub');
		if(title) title.textContent=def.lbl;
		if(sub) sub.textContent=records.length.toLocaleString()+' patient'+(records.length!==1?'s':'')+' in this range';
		const stats=$id('td-modal-stats');
		if(stats) {
			const gc={};
			records.forEach(p=>{const g=p.gender||'Unknown';gc[g]=(gc[g]||0)+1;});
			stats.innerHTML=Object.entries(gc).map(([g,n])=>`<div class="td-modal-stat-card"><div class="td-modal-stat-v">${n}</div><div class="td-modal-stat-k">${g}</div></div>`).join('')+`<div class="td-modal-stat-card"><div class="td-modal-stat-v" style="color:#2563eb">${records.length}</div><div class="td-modal-stat-k">Total</div></div>`;
		}
		const thead=$id('td-modal-thead');
		if(thead) thead.innerHTML='<tr><th>Patient ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Community</th><th>Visit Date</th><th>Nurse</th><th>BMI</th><th>Diagnosis</th></tr>';
		const tbody=$id('td-modal-tbody');
		if(tbody) tbody.innerHTML=records.length?records.map(r=>`<tr>
			<td><a href="/app/nurse-interventions/${r.name}" target="_blank">${_esc(r.patient_unique_id||r.name)}</a></td>
			<td><b>${_esc(r.patient_name)}</b></td><td>${_esc(r.age)}</td>
			<td><span class="td-gtag ${(r.gender||'').toLowerCase()}">${_esc(r.gender)}</span></td>
			<td>${_esc(r.community_name)}</td><td>${_esc(r.visit_date)}</td>
			<td style="font-size:11px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_esc(r.created_by)}</td>
			<td>${_esc(r.bmi_category)}</td>
			<td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_esc(r.primary_diagnosis)}</td>
		</tr>`).join(''):'<tr><td colspan="9" class="td-empty">No records</td></tr>';
		const overlay=$id('td-modal-overlay'); if(overlay) overlay.classList.add('open');
		document.body.style.overflow='hidden';
		// store for export
		window._tdModalRows=records; window._tdModalCols=['patient_unique_id','patient_name','age','gender','community_name','visit_date','bmi_category','primary_diagnosis'];
	}
	function closeModal() { const o=$id('td-modal-overlay'); if(o) o.classList.remove('open'); document.body.style.overflow=''; }
	function exportModal() {
		if(!window._tdModalRows) return;
		const cols=[{key:'patient_unique_id',label:'Patient ID'},{key:'patient_name',label:'Name'},{key:'age',label:'Age'},{key:'gender',label:'Gender'},{key:'community_name',label:'Community'},{key:'visit_date',label:'Visit Date'},{key:'bmi_category',label:'BMI'},{key:'primary_diagnosis',label:'Diagnosis'}];
		_csvDownload('patient-drill-down.csv', window._tdModalRows, cols);
	}

	/* ── Red flags modal (opens patient card for red flags) ── */
	function openRedFlags() {
		if(!_data) return;
		const el=$id('td-cards'); if(!el||!el._defs) return;
		openCard(5); // index 5 = Red Flag Patients card
	}

	/* ── Modal: Nurse dashboard ──────────────────────── */
	function openNurse(idx) {
		if(!_data||!_data.nurse_stats||!_data.nurse_stats[idx]) return;
		const n=_data.nurse_stats[idx];
		_nurseExportData=n;
		const av=$id('td-nmodal-avatar'); if(av) { av.textContent=(n.nurse||'?')[0].toUpperCase(); av.style.background=SERIES[idx%SERIES.length]; }
		const ti=$id('td-nmodal-title'); if(ti) ti.textContent=n.nurse;
		const su=$id('td-nmodal-sub'); if(su) su.textContent=`#${idx+1} nurse · ${n.total_patients} total patients · ${n.active_days} active days`;
		const kpis=$id('td-nmodal-kpis');
		if(kpis) kpis.innerHTML=[
			{v:n.total_patients,k:'Patients'},{v:n.active_days,k:'Active Days'},
			{v:n.hypertension_screens||0,k:'HTN Scr'},{v:n.diabetes_screens||0,k:'DM Scr'},
			{v:n.chest_pain_cases||0,k:'Chest Pain',c:n.chest_pain_cases>0?COLORS.red:undefined},
		].map(s=>`<div class="td-nmodal-kpi"><div class="td-nmodal-kpi-v" style="${s.c?'color:'+s.c:''}">${s.v}</div><div class="td-nmodal-kpi-k">${s.k}</div></div>`).join('');
		// Trend for this nurse
		const nurseRecs=(_data.recent||[]).filter(r=>r.created_by===n.nurse);
		const trendMap={}, today=new Date();
		for(let i=29;i>=0;i--) { const d=new Date(today); d.setDate(d.getDate()-i); const k=d.toISOString().slice(0,10); trendMap[k]=0; }
		nurseRecs.forEach(r=>{ if(trendMap[r.visit_date]!==undefined) trendMap[r.visit_date]++; });
		const trendData=Object.entries(trendMap).map(([date,count])=>({date,count}));
		_renderLine('td-nmodal-trend', trendData, SERIES[idx%SERIES.length]);
		// Diagnosis distribution
		const diagEl=$id('td-nmodal-diag');
		if(diagEl) {
			const diagMap={};
			nurseRecs.forEach(r=>{ const d=r.primary_diagnosis||'Not specified'; diagMap[d]=(diagMap[d]||0)+1; });
			const diagData=Object.entries(diagMap).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([condition,count])=>({condition,count}));
			_renderHbar('td-nmodal-diag', diagData, 'condition', 'count', SERIES);
		}
		// Recent
		const recent=$id('td-nmodal-recent');
		if(recent) recent.innerHTML=nurseRecs.slice(0,10).map(r=>`<tr><td><a href="/app/nurse-interventions/${_esc(r.name)}" target="_blank">${_esc(r.patient_unique_id||r.name)}</a></td><td>${_esc(r.patient_name)}</td><td>${_esc(r.age)}</td><td><span class="td-gtag ${(r.gender||'').toLowerCase()}">${_esc(r.gender)}</span></td><td>${_esc(r.community_name)}</td><td>${_esc(r.visit_date)}</td><td>${_esc(r.bmi_category)}</td><td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_esc(r.primary_diagnosis)}</td></tr>`).join('') || '<tr><td colspan="8" class="td-empty">No records in recent 50</td></tr>';
		const ov=$id('td-nmodal-overlay'); if(ov) ov.classList.add('open');
		document.body.style.overflow='hidden';
	}
	function closeNurse() { const o=$id('td-nmodal-overlay'); if(o) o.classList.remove('open'); document.body.style.overflow=''; }
	function exportNurse() {
		if(!_nurseExportData) return;
		const n=_nurseExportData;
		const rows=[{nurse:n.nurse,patients:n.total_patients,active_days:n.active_days,htn:n.hypertension_screens||0,dm:n.diabetes_screens||0,chest:n.chest_pain_cases||0}];
		const cols=[{key:'nurse',label:'Nurse'},{key:'patients',label:'Patients'},{key:'active_days',label:'Active Days'},{key:'htn',label:'HTN Scr'},{key:'dm',label:'DM Scr'},{key:'chest',label:'Chest Pain'}];
		_csvDownload('nurse-stats.csv', rows, cols);
	}

	/* ── Summary preview ─────────────────────────────── */
	function openSummary(name, patientName) {
		const dl=$id('td-smodal-download'); if(dl) { dl.href=_pdfUrl(name); }
		const sub=$id('td-smodal-sub'); if(sub) sub.textContent=patientName||name;
		const frame=$id('td-smodal-frame'); if(frame) frame.src=_printUrl(name);
		const ov=$id('td-smodal-overlay'); if(ov) ov.classList.add('open');
		document.body.style.overflow='hidden';
	}
	function closeSummary() { const o=$id('td-smodal-overlay'); if(o) o.classList.remove('open'); document.body.style.overflow=''; const f=$id('td-smodal-frame'); if(f) f.src='about:blank'; }

	/* ── Export functions ────────────────────────────── */
	function exportTrend() {
		if(!_data||!_data.trend) return;
		_csvDownload('daily-trend.csv', _data.trend, [{key:'date',label:'Date'},{key:'count',label:'Patients'}]);
	}
	function exportCommunity() {
		if(!_data||!_data.community) return;
		_csvDownload('community-breakdown.csv', _data.community, [{key:'community',label:'Community'},{key:'count',label:'Patients'}]);
	}
	function exportRecent() {
		const cols=[{key:'patient_unique_id',label:'Patient ID'},{key:'patient_name',label:'Name'},{key:'age',label:'Age'},{key:'gender',label:'Gender'},{key:'community_name',label:'Community'},{key:'visit_date',label:'Visit Date'},{key:'created_by',label:'Nurse'},{key:'bmi_category',label:'BMI'},{key:'primary_diagnosis',label:'Diagnosis'}];
		_csvDownload('recent-patients.csv', _recentFiltered, cols);
	}

	/* ── Scroll helper ───────────────────────────────── */
	function scrollTo(id) { const el=$id(id); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }

	/* ── Keyboard: close modals on Escape ────────────── */
	document.addEventListener('keydown', e=>{
		if(e.key==='Escape') { closeModal(); closeNurse(); closeSummary(); }
	});

	return {
		init, load, reset, clearAll, toggleFilters,
		toggleMs, pickMs, clearMs, filterMs,
		setTrendDays, toggleCustomRange, applyCustomRange,
		openCard, closeModal, exportModal, openRedFlags,
		openNurse, closeNurse, exportNurse,
		openSummary, closeSummary,
		exportTrend, exportCommunity, exportRecent,
		exportSummariesCsv, exportSummariesExcel, sortSummaries, searchSummaries, searchRecent,
		scrollTo, _sumPage,
	};
})();
