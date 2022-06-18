import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { formFieldStyle } from 'shared/constants/style';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';
import FormFieldContainer from './FormFieldContainer';

const ErrorIcon = (
  <InputAdornment position="end">
    <div className="text-xl pb-3 text-color-form-field-error">
      <MdErrorOutline />
    </div>
  </InputAdornment>
);

interface IFilledTextField {
  endAdornment?: Element | React.ReactNode;
  formFieldClassName?: string;
  name: string;
  label: string;
  id?: string;
  value: string;
  type?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPressEnter?: (event: any) => void;
  errorMessage?: string;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isEmail?: boolean;
}

const FilledTextField: React.FC<IFilledTextField> = ({
  onChange,
  onBlur,
  onFocus,
  onPressEnter,
  endAdornment,
  setErrorMessage,
  formFieldClassName = 'mt-4 rounded-md',
  name = '',
  label = '',
  id = '',
  value = '',
  type = 'text',
  errorMessage = '',
  isRequired = false,
  isEmail = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [randomId, setRandomId] = useState<string>();
  const fieldId = id || randomId;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setRandomId(uuid());
  }, []);

  useEffect(() => {
    setHasError(Boolean(errorMessage && errorMessage?.length > 0));
  }, [errorMessage]);

  const renderEndAdornment = () => {
    if (endAdornment) {
      return endAdornment;
    }

    if (hasError && !isFocused) {
      return ErrorIcon;
    }

    return null;
  };

  const onBlurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setIsFocused(false);
    onBlur?.(event);

    if (!name) {
      return;
    }

    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isRequiredFieldValid = !isRequired || (isRequired && Boolean(value));
    const isEmailFieldValid = isEmail
      ? /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
      : true;
    const EMAIL_ERROR_MESSAGE = `${label || 'Email address'} is invalid.`;

    const fieldErrorMessage = !isRequiredFieldValid
      ? REQUIRED_ERROR_MESSAGE
      : EMAIL_ERROR_MESSAGE;

    setErrorMessage?.(
      name,
      isRequiredFieldValid && isEmailFieldValid,
      fieldErrorMessage
    );
  };

  const onKeyPressHandler = (event: any): void => {
    if (event?.charCode === 13 || event?.charCode === 'Enter') {
      onPressEnter?.(event);
    }
  };

  return (
    <FormFieldContainer
      className={formFieldClassName}
      isFocused={isFocused}
      hasError={hasError}
      errorMessage={errorMessage}
    >
      <FormControl
        className="flex w-100 mx-3 p-0"
        sx={formFieldStyle}
        variant="standard"
      >
        <InputLabel htmlFor={fieldId}>{label}</InputLabel>
        <Input
          disableUnderline
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={(
            event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={onBlurHandler}
          endAdornment={renderEndAdornment()}
          autoComplete="off"
          onKeyPress={onKeyPressHandler}
        />
      </FormControl>
    </FormFieldContainer>
  );
};

export default FilledTextField;
