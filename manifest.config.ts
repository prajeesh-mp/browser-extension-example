declare const process: { env: Record<string, string | undefined> }
import pkg from './package.json' with { type: 'json' }

// Single source of truth for the manifest. Version comes from package.json.
const base = {
  manifest_version: 3,
  name: 'My Extension',
  version: pkg.version,
  description: 'A minimal, secure Chrome side panel extension.',
  icons: { '16': 'icon.png', '48': 'icon.png', '128': 'icon.png' },
  minimum_chrome_version: '116',
  background: { service_worker: 'background.js', type: 'module' },
  // Narrow `matches` to the sites you actually need.
  content_scripts: [{ matches: ['https://*/*', 'http://*/*'], js: ['content.js'], run_at: 'document_idle' }],
  side_panel: { default_path: 'sidepanel.html' },
  action: { default_title: 'Open side panel' },
  permissions: ['storage', 'sidePanel'],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
}

// Firefox has no sidePanel API or module service workers; use a sidebar and event page.
const firefox: Record<string, unknown> = {
  ...base,
  background: { scripts: ['background.js'], type: 'module' },
  permissions: ['storage'],
  sidebar_action: { default_panel: 'sidepanel.html', default_title: 'My Extension' },
  browser_specific_settings: { gecko: { id: 'my-extension@example.com', strict_min_version: '121.0' } },
}
delete firefox.side_panel

export const manifest = process.env.TARGET === 'firefox' ? firefox : base
