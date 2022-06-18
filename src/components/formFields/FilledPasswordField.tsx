import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { isPasswordValueValid } from 'shared/helpers/common';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';
import FilledTextField from './FilledTextField';

const PasswordRequirement: React.FC<{
  isValid: boolean;
  requirement: string;
}> = ({ isValid, requirement }) => (
  <div
    className={classnames('flex items-center text-xs p-2 rounded-lg', {
      'text-color-success-text bg-color-success-bg': isValid,
      'text-color-greyed-out-text bg-color-greyed-out-bg': !isValid,
    })}
  >
    {isValid && (
      <div className="mr-1 font-extrabold text-sm">
        <GoCheck />
      </div>
    )}
    <div>{requirement}</div>
  </div>
);

interface Props {
  name: string;
  label: string;
  id?: string;
  value: string;
  errorMessage?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPressEnter?: (event: any) => void;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  showPasswordChecker?: boolean;
}

const FilledPasswordField: React.FC<Props> = ({
  value,
  name,
  label,
  id,
  errorMessage,
  setErrorMessage,
  onChange,
  onBlur,
  onPressEnter,
  isRequired = false,
  showPasswordChecker,
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isPasswordCheckerDisplayed, setIsPasswordCheckerDisplayed] =
    useState(false);
  const [hasEightChars, setHasEightChars] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumeric, setHasNumeric] = useState(false);
  const [hasSpecialChars, setHasSpecialChars] = useState(false);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    onChange?.(event);
  };

  const onBlurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    onBlur?.(event);
  };

  const togglePassword = () => {
    setIsPasswordShown((isShown) => !isShown);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    setHasEightChars(value?.length >= 8);
    setHasLowerCase(/[a-z]/.test(value));
    setHasUpperCase(/[A-Z]/.test(value));
    setHasNumeric(/[0-9]/.test(value));
    setHasSpecialChars(/[^a-zA-Z0-9]/.test(value));
  }, [value]);

  const handleFocus = () => {
    if (!showPasswordChecker) {
      return;
    }

    setIsPasswordCheckerDisplayed(true);
  };

  return (
    <>
      <FilledTextField
        onFocus={handleFocus}
        onPressEnter={onPressEnter}
        type={isPasswordShown ? 'text' : 'password'}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        errorMessage={errorMessage}
        isRequired={isRequired}
        setErrorMessage={setErrorMessage}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="mb-3 pr-0 text-label"
              aria-label="toggle password visibility"
              onClick={togglePassword}
              onMouseDown={handleMouseDownPassword}
              tabIndex={-1}
            >
              {isPasswordShown ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      {isPasswordCheckerDisplayed && !isPasswordValueValid(value) && (
        <div className="mt-2 flex flex-wrap gap-2">
          <PasswordRequirement
            isValid={hasEightChars}
            requirement="Minimum 8 characters"
          />
          <PasswordRequirement
            isValid={hasLowerCase}
            requirement="Has lowercase character/s"
          />
          <PasswordRequirement
            isValid={hasUpperCase}
            requirement="Has uppercase character/s"
          />
          <PasswordRequirement
            isValid={hasNumeric}
            requirement="Has numeric character/s"
          />
          <PasswordRequirement
            isValid={hasSpecialChars}
            requirement="Has special character/s"
          />
        </div>
      )}
    </>
  );
};

export default FilledPasswordField;
