import { useCallback, useState } from 'react';

type TSpinner = [boolean, (isLoading: boolean) => void];

const useSpinner = (defaultValue: boolean): TSpinner => {
  const [isLoading, setIsLoading] = useState(defaultValue);

  const toggleSpinner = useCallback((newLoadingState: boolean) => {
    const timer = newLoadingState ? 0 : 300;
    setTimeout(() => {
      setIsLoading(newLoadingState);
    }, timer);
  }, []);

  return [isLoading, toggleSpinner];
};

export default useSpinner;
