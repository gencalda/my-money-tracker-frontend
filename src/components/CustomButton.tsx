import classnames from 'classnames';
import { useDebouncedCallback } from 'use-debounce';

interface Props {
  className?: string;
  onClickHandler: () => void;
  isProcessButton?: boolean;
  isDisabled?: boolean;
  isInProgress?: boolean;
  tabIndex?: number;
}

const CustomButton: React.FC<Props> = ({
  children,
  onClickHandler,
  isProcessButton,
  isDisabled,
  className = '',
  isInProgress = false,
  tabIndex,
}) => {
  const debouncedClickHandler = useDebouncedCallback(onClickHandler, 400);

  return (
    <button
      tabIndex={tabIndex}
      disabled={isDisabled || isInProgress}
      type="button"
      className={classnames(`cursor-pointer ${className}`, {
        'opacity-50': isDisabled || isInProgress,
      })}
      onClick={isProcessButton ? debouncedClickHandler : onClickHandler}
    >
      {children}
    </button>
  );
};

export default CustomButton;
