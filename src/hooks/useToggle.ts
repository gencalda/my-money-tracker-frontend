import { useState } from 'react';

const useToggle = (
  initialState?: boolean
): [boolean, (newState?: boolean | undefined) => void] => {
  const [isOpen, setIsOpen] = useState(initialState || false);

  const toggleState = (newState?: boolean) => {
    setIsOpen((currentState) =>
      typeof newState === 'boolean' ? newState : !currentState
    );
  };

  return [isOpen, toggleState];
};

export default useToggle;
