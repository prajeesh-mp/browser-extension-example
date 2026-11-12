import tseslint from 'typescript-eslint'

export default tseslint.config(...tseslint.configs.recommended, {
  rules: { 'no-eval': 'error', 'no-implied-eval': 'error', 'no-console': 'warn' },
})

