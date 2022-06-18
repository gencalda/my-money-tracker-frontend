import { useState } from 'react';

const useObjectState = <T>(defaultValue: T) => {
  const [objectState, setObjectState] = useState<T>(defaultValue);

  const updateObjectState = (property: any, value: any) =>
    setObjectState((currentValue) =>
      property ? { ...currentValue, [property]: value } : { ...currentValue }
    );

  return {
    objectState,
    setObjectState,
    updateObjectState,
  };
};

export default useObjectState;
