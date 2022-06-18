import TextField from '@mui/material/TextField';
import TransactionFormItem from 'components/transactionForm/TransactionFormItem';
import { formFieldWithIconStyle } from 'shared/constants/style';
import { getStringValue } from 'shared/helpers/common';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';

interface Props {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  minRows?: number;
  onChange: (event: { target: { name: string; value: string } }) => void;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  errorMessage?: string;
}

const TextAreaField: React.FC<Props> = ({
  setErrorMessage,
  errorMessage,
  icon,
  name,
  label,
  onChange,
  minRows = 1,
  value = '',
  isRequired = false,
}) => {
  const onChangeHandler = ({
    target: { name: fieldName = '', value: fieldValue = '' } = {},
  }: any) => {
    onChange?.({
      target: {
        name: fieldName,
        value: fieldValue,
      },
    });
  };

  const onBlurHandler = () => {
    if (!name) {
      return;
    }

    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isValid = !isRequired || (isRequired && Boolean(value));
    setErrorMessage?.(name, isValid, REQUIRED_ERROR_MESSAGE);
  };

  return (
    <TransactionFormItem
      icon={icon}
      fieldComponent={
        <TextField
          name={name}
          label={label}
          value={value}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          multiline
          minRows={minRows}
          variant="standard"
          sx={formFieldWithIconStyle(Boolean(errorMessage))}
          helperText={getStringValue(errorMessage)}
        />
      }
    />
  );
};

export default TextAreaField;
