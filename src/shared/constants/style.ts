export const formFieldStyle = {
  '& .MuiFormLabel-root': {
    color: 'var(--label)',
    fontSize: '0.85rem',
  },
  '& .MuiInput-input.MuiInputBase-input': {
    paddingTop: '0',
    marginTop: '5px',
    marginBottom: '3px',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    top: '8px',
    color: 'var(--label)',
  },
  '& .MuiFormLabel-root.MuiFormLabel-filled': { top: '8px' },
};

export const formFieldWithIconStyle = (hasError: boolean) => ({
  '& label.MuiInputLabel-shrink': {
    fontSize: '1.1rem',
  },
  '& label': {
    fontSize: '1rem',
  },
  '& label.Mui-focused': {
    color: 'var(--primary)',
    fontSize: '1.1rem',
  },
  '& .MuiInput-underline.Mui-focused:after': {
    borderBottom: '2px solid var(--primary)',
  },
  '.MuiInput-root.MuiInputBase-root.MuiInputBase-formControl:before': {
    borderBottom: hasError
      ? '2px solid var(--color-form-field-error)'
      : '2px solid var(--color-border)',
  },
  '.MuiInput-root.MuiInputBase-root.MuiInputBase-formControl': {
    color: 'var(--color-no-primary-bg)',
    fontWeight: '600',
  },
  '.MuiFormHelperText-root': {
    color: 'var(--color-form-field-error)',
    fontSize: '.8rem',
  },
});
