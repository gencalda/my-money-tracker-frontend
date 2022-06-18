import { useState } from 'react';

interface IFormState<T> {
  formValue: T;
  setFormValue: React.Dispatch<React.SetStateAction<T>>;
  onChangeHandler: (event: any) => void;
  setIsFormUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  isFormUpdated: boolean;
}

const useFormState = <T>(defaultValue: T): IFormState<T> => {
  const [formValue, setFormValue] = useState(defaultValue);
  const [isFormUpdated, setIsFormUpdated] = useState(false);

  const onChangeHandler = (event: any) => {
    const {
      target: { name, value },
    } = event;

    if (!name) {
      return;
    }

    setIsFormUpdated(true);
    setFormValue((current) => ({ ...current, [name]: value }));
  };

  return {
    formValue,
    setFormValue,
    onChangeHandler,
    isFormUpdated,
    setIsFormUpdated,
  };
};

export default useFormState;
