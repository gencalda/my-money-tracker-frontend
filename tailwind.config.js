module.exports = {
  important: true,
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'app-bg': 'var(--app-bg)',
        'app-side-bg': 'var(--app-side-bg)',
        'color-with-primary-bg': 'var(--color-with-primary-bg)',
        'color-no-primary-bg': 'var(--color-no-primary-bg)',
        'color-label': 'var(--label)',
        'color-form-field-bg': 'var(--color-form-field-bg)',
        'color-form-field-active-bg': 'var(--color-form-field-active-bg)',
        'color-form-field-error-bg': 'var(--color-form-field-error-bg)',
        'color-form-field-error': 'var(--color-form-field-error)',
        'color-border': 'var(--color-border)',
        'color-success-text': 'var(--color-success-text)',
        'color-success-bg': 'var(--color-success-bg)',
        'color-greyed-out-text': 'var(--color-greyed-out-text)',
        'color-greyed-out-bg': 'var(--color-greyed-out-bg)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
