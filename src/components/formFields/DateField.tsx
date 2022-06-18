import TextField, { TextFieldProps } from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useEffect, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import TransactionFormItem from 'components/transactionForm/TransactionFormItem';
import { formFieldWithIconStyle } from 'shared/constants/style';
import { getStringValue } from 'shared/helpers/common';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';

const DateTextField = ({
  params,
  label,
  errorMessage = null,
}: {
  params: TextFieldProps;
  label: string;
  errorMessage: string | null | undefined;
}) => (
  <TextField
    {...params}
    variant="standard"
    label={label}
    sx={formFieldWithIconStyle(Boolean(errorMessage))}
    helperText={getStringValue(errorMessage)}
  />
);

interface Props {
  name: string;
  label: string;
  timestampValue: number | null;
  onChange: (event: { target: { name: string; value: number | null } }) => void;
  hasTime?: boolean;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  errorMessage?: string;
}

const DateField: React.FC<Props> = ({
  setErrorMessage,
  errorMessage,
  name,
  timestampValue,
  label,
  onChange,
  hasTime = false,
  isRequired = false,
}) => {
  const [localDateObjectValue, setLocalDateObjectValue] = useState<Date | null>(
    null
  );

  useEffect(() => {
    if (!timestampValue) {
      setLocalDateObjectValue(null);
      return;
    }

    setLocalDateObjectValue(new Date(timestampValue));
  }, [timestampValue]);

  const onChangeHandler = (date: Date | null) => {
    setLocalDateObjectValue(date);

    onChange?.({
      target: {
        name,
        value: date ? date?.getTime?.() : null,
      },
    });

    if (!name) {
      return;
    }

    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isValid = !isRequired || (isRequired && Boolean(date));
    setErrorMessage?.(name, isValid, REQUIRED_ERROR_MESSAGE);
  };

  return (
    <TransactionFormItem
      icon={<MdDateRange />}
      fieldComponent={
        hasTime ? (
          <MobileDateTimePicker
            value={localDateObjectValue}
            onChange={onChangeHandler}
            renderInput={(params) => (
              <DateTextField
                params={params}
                label={label}
                errorMessage={errorMessage}
              />
            )}
          />
        ) : (
          <MobileDatePicker
            value={localDateObjectValue}
            onChange={onChangeHandler}
            renderInput={(params) => (
              <DateTextField
                params={params}
                errorMessage={errorMessage}
                label={label}
              />
            )}
          />
        )
      }
    />
  );
};

export default DateField;
