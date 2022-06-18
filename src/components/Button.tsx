import classnames from 'classnames';
import { CgSpinner } from 'react-icons/cg';
import { IButtonType } from 'shared/types/commonTypes';
import CustomButton from './CustomButton';

interface IButtonClass {
  isBlock?: boolean;
  isSecondary?: boolean;
  className?: string;
}

export const getButtonClass = ({
  isBlock,
  isSecondary,
  className,
}: IButtonClass) =>
  classnames(
    `${className}`,
    {
      'px-4 py-3 w-full font-semibold rounded-lg': isBlock,
    },
    {
      'bg-primary text-color-with-primary-bg': !isSecondary,
    },
    {
      'border border-solid border-primary text-primary bg-app-bg': isSecondary,
    }
  );

interface Props {
  label: string;
  onClickHandler: () => void;
  isBlock?: boolean;
  className?: string;
  isDisabled?: boolean;
  type?: string;
  isSecondary?: boolean;
  isInProgress?: boolean;
  tabIndex?: number;
}

const Button: React.FC<Props> = ({
  label,
  isBlock,
  onClickHandler,
  isDisabled,
  type = IButtonType.Button,
  isSecondary = false,
  isInProgress = false,
  className = '',
  tabIndex,
}) => (
  <CustomButton
    isProcessButton={type === IButtonType.Submit}
    className={`flex justify-center items-center ${getButtonClass({
      isBlock,
      isSecondary,
      className,
    })}`}
    onClickHandler={onClickHandler}
    isDisabled={isDisabled}
    isInProgress={isInProgress}
    tabIndex={tabIndex}
  >
    {isInProgress && (
      <div className="mr-1 text-lg animate-spin">
        <CgSpinner />
      </div>
    )}
    <div>{label || ''}</div>
  </CustomButton>
);

export default Button;
