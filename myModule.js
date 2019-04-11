const sha256 = require('js-sha256');

function chart(dashboardId, chartId) {
  return renderUri(dashboardId, chartId)
}

function dashboard(dashboardId) {
  return renderUri(dashboardId)
}

function renderUri(dashboardId, chartId = undefined) {
  const now_in_seconds = Math.floor(Date.now() / 1000);
  const data = {
    dashboard: dashboardId,
    chart: chartId,
    filters: [{"name": "Studies", "value": ["ELL-QA-CY01"]}],
    border: 'off',
    embed: 'v2',
    data_ts: now_in_seconds - 600,
    expires_at: now_in_seconds + 7,
    maintain_sessions_after_expiration: true
  };

  const path = '/api/embedded_dashboard?data=' + encodeURIComponent(JSON.stringify(data));
  const sig = sha256.hmac(process.env.API_KEY, path);

  return {url: 'https://app.periscopedata.com' + path + '&signature=' + sig};
}

module.exports = { chart, dashboard };
