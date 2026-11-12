# Chrome Side Panel Extension Boilerplate

Manifest V3 · TypeScript (strict) · Vite · Preact · Vitest · ESLint 9

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` | Rebuild to `dist/` on change (reload the extension in `chrome://extensions`) |
| `npm run build` | Typecheck + production build (console calls stripped) |
| `npm test` / `npm run lint` / `npm run typecheck` | Checks |

## Load it
`npm run build`, open `chrome://extensions`, enable Developer mode, **Load unpacked** → `dist/`. Click the toolbar icon to open the side panel.

## Layout
- `manifest.config.ts`: manifest (version comes from `package.json`)
- `src/background`: service worker; all listeners are registered at top level
- `src/content`: content script (no runtime imports; keep it self-contained)
- `src/sidepanel`: Preact UI
- `src/shared`: typed messages and storage keys

## Security notes
- Minimal permissions: `storage`, `sidePanel`. Narrow `content_scripts.matches` to your sites.
- Strict extension-page CSP; the background validates `sender.id` and message shape.
- Counters live in `storage.session` (cleared on browser restart) and are removed when tabs close.

## Making it yours
Rename in `package.json` and `manifest.config.ts`, replace `public/icon.png`, and review permissions.
