import { useState } from 'react';

interface IUseFormError {
  formError: Record<string, string>;
  setFormError: (
    fieldName: string,
    isValid: boolean,
    errorMessage: string
  ) => void;
  removeFormError: (fieldName: string) => void;
  removeAllFormErrors: () => void;
}

const useFormError = (): IUseFormError => {
  const [formErrorState, setFormErrorState] = useState<Record<string, string>>(
    {}
  );

  const setFormError = (
    fieldName: string,
    isValid: boolean,
    errorMessage: string
  ): void => {
    if (!fieldName || !errorMessage) {
      return;
    }

    setFormErrorState((currentValue) => {
      const updatedErrorMessage: Record<string, string> = {};
      if (isValid) {
        updatedErrorMessage[fieldName] = '';
      }

      if (!isValid) {
        updatedErrorMessage[fieldName] = errorMessage;
      }

      return { ...currentValue, ...updatedErrorMessage };
    });
  };

  const removeFormError = (fieldName: string): void => {
    if (!fieldName) {
      return;
    }

    setFormErrorState((currentValue) => ({ ...currentValue, [fieldName]: '' }));
  };

  const removeAllFormErrors = () => {
    setFormErrorState({});
  };

  return {
    formError: formErrorState,
    setFormError,
    removeFormError,
    removeAllFormErrors,
  };
};

export default useFormError;
