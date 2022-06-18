import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import TransactionFormItem from 'components/transactionForm/TransactionFormItem';
import { formFieldWithIconStyle } from 'shared/constants/style';
import {
  convertStringNumberToNumber,
  formatNumber,
  getStringValue,
} from 'shared/helpers/common';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';

interface Props {
  name: string;
  label: string;
  numberValue: number;
  onChange: (event: { target: { name: string; value: number } }) => void;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  errorMessage?: string;
}

const NumberField: React.FC<Props> = ({
  name,
  numberValue,
  onChange,
  setErrorMessage,
  errorMessage,
  label = '',
  isRequired = false,
}) => {
  const [localValue, setLocalValue] = useState('');
  const shouldFormat = useRef(true);

  const getFormattedNumber = useCallback((numberToFormat: number) => {
    if (numberToFormat === 0) {
      return '';
    }

    return formatNumber(numberToFormat);
  }, []);

  useEffect(() => {
    if (!numberValue) {
      setLocalValue('');
      return;
    }

    if (shouldFormat.current) {
      setLocalValue(getFormattedNumber(numberValue));
    }
  }, [numberValue, getFormattedNumber]);

  const onChangeHandler = ({
    target: { name: fieldName = '', value: fieldValue = '' } = {},
  }: any) => {
    shouldFormat.current = false;
    onChange?.({
      target: {
        name: fieldName,
        value: convertStringNumberToNumber(fieldValue),
      },
    });

    setLocalValue(fieldValue);
  };

  const onBlurHandler = () => {
    shouldFormat.current = true;
    setLocalValue(getFormattedNumber(numberValue));

    if (!name) {
      return;
    }

    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isValid = !isRequired || (isRequired && numberValue > 0);
    setErrorMessage?.(name, isValid, REQUIRED_ERROR_MESSAGE);
  };

  return (
    <TransactionFormItem
      icon={
        <div className="text-md">
          <FaCoins />
        </div>
      }
      fieldComponent={
        <TextField
          label={label}
          variant="standard"
          name={name}
          value={localValue}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          sx={formFieldWithIconStyle(Boolean(errorMessage))}
          helperText={getStringValue(errorMessage)}
        />
      }
    />
  );
};

export default NumberField;
