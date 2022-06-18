interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="text-color-form-field-error text-center text-sm">
      {message}
    </div>
  );
};

export default ErrorMessage;
