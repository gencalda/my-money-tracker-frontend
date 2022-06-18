import classnames from 'classnames';

interface Props {
  isFocused?: boolean;
  className?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const FormFieldContainer: React.FC<Props> = ({
  children,
  isFocused,
  hasError,
  className = '',
  errorMessage = '',
}) => (
  <>
    <div
      className={classnames(
        `${className}`,
        { 'bg-color-form-field-bg': !isFocused && !hasError },
        { 'bg-color-form-field-active-bg': isFocused },
        { 'bg-color-form-field-error-bg': hasError && !isFocused }
      )}
    >
      {children}
    </div>
    <div className="text-left text-color-form-field-error text-xs m-1">
      {errorMessage}
    </div>
  </>
);

export default FormFieldContainer;
