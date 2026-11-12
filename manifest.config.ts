import pkg from './package.json' with { type: 'json' }

// Single source of truth for the manifest. Version comes from package.json.
export const manifest = {
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

