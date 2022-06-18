import { Auth } from 'aws-amplify';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import useNavigate from 'hooks/useNavigate';
import usePopoverToggle from 'hooks/usePopoverToggle';
import useToggle from 'hooks/useToggle';
import { RootState } from 'reducers/store';
import { Routes } from 'shared/constants/routes';
import { logError } from 'shared/helpers/common';
import CustomButton from './CustomButton';

const SettingsMenu: React.FC = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLDivElement>(null);
  const [isPopoverOpen, togglePopover] = useToggle(false);
  const { currentUser: { name = '' } = {} } = useSelector(
    (state: RootState) => state.user
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      setIsLoggingOut(true);
      await Auth.signOut();
      setIsLoggingOut(false);
      navigate(Routes.Login);
    } catch (error) {
      setIsLoggingOut(false);
      logError(error);
    }
  };

  usePopoverToggle(togglerRef.current, popoverRef.current, togglePopover);

  return (
    <div ref={togglerRef} className="relative">
      <div>
        <button
          type="button"
          className="mx-3 mt-4 text-2xl text-color-no-primary-bg"
        >
          <MdAccountCircle />
        </button>
        <div
          ref={popoverRef}
          className={classnames(
            'w-40 bg-app-bg drop-shadow-lg rounded-md absolute right-3',
            {
              block: isPopoverOpen,
              hidden: !isPopoverOpen,
            }
          )}
        >
          <div className="p-3 border-b">{name}</div>
          <CustomButton
            className="p-3 flex items-center w-full"
            onClickHandler={signOutHandler}
            isProcessButton
            isInProgress={isLoggingOut}
          >
            <div
              className={classnames(
                'rounded-full bg-primary p-1.5 text-color-with-primary-bg mr-2',
                { 'animate-spin': isLoggingOut }
              )}
            >
              {isLoggingOut ? <CgSpinner /> : <MdLogout />}
            </div>
            <div>Sign out</div>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
