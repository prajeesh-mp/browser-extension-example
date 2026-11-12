# Security

Report vulnerabilities privately to the maintainers (do not open a public issue).

## Permissions checklist
- [ ] Only `storage` and `sidePanel` are requested; justify any addition.
- [ ] `content_scripts.matches` is narrowed to the sites you need.
- [ ] No `eval`, `innerHTML`, or remote code; CSP stays `script-src 'self'`.
- [ ] Background validates `sender.id` and message shape.
- [ ] `npm audit` is clean in CI; Dependabot is enabled.
- [ ] A privacy policy exists before store submission.
