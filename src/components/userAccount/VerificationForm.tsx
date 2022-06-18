import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import ErrorMessage from 'components/typography/ErrorMessage';
import useFormState from 'hooks/useFormState';
import useInitializeApp from 'hooks/useInitializeApp';
import useNavigate from 'hooks/useNavigate';
import { setIsAppInitialized } from 'reducers/uiSlice';
import { ErrorCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { Routes } from 'shared/constants/routes';
import { saveCurrentUserSession } from 'shared/helpers/authHelpers';
import {
  getErrorMessageOnCode,
  getStringValue,
  logError,
} from 'shared/helpers/common';
import { displaySuccessToast } from 'shared/helpers/toast';
import { IButtonType } from 'shared/types/commonTypes';
import CustomButton from '../CustomButton';
import FilledTextField from '../formFields/FilledTextField';

interface Props {
  maskedEmail: string;
  username: string;
  password?: string;
  onEmailExistsException?: () => void;
}

interface IVerificationForm {
  verificationCode: string;
}

const resendLabel = `Didn't receive code?`;

const VerificationForm: React.FC<Props> = ({
  maskedEmail = '',
  username = '',
  password,
  onEmailExistsException,
}) => {
  const [isInitializingApp, setIsInitializingApp] = useState(false);
  const { initializeApp } = useInitializeApp();
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { formValue, onChangeHandler } = useFormState<IVerificationForm>({
    verificationCode: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resendVerification = async () => {
    try {
      await Auth.resendSignUp(username);
      displaySuccessToast('Verification code successfully sent.');
    } catch (error) {
      logError(error);
      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  const onSuccessfulVerification = async () => {
    try {
      displaySuccessToast('Account successfully created.');

      setErrorMessage('');
      setIsInitializingApp(true);
      await saveCurrentUserSession();
      await initializeApp();

      setTimeout(() => {
        setIsInitializingApp(false);
        dispatch(setIsAppInitialized(true));
        navigate(Routes.Transactions);
        setIsVerifying(false);
      }, 150);
    } catch (error) {
      logError(error);
    }
  };

  const verifyEmail = async () => {
    try {
      setIsVerifying(true);
      await Auth.confirmSignUp(username, formValue.verificationCode, {
        forceAliasCreation: false,
      });
      await Auth.signIn(username, password);
      onSuccessfulVerification();
    } catch (error) {
      logError(error);

      setIsVerifying(false);

      if (error?.code === ErrorCode.CodeMismatchException) {
        setErrorMessage(getErrorMessageOnCode(ErrorCode.CodeMismatchException));
        return;
      }

      if (error?.code === ErrorCode.ExpiredCodeException) {
        setErrorMessage(getErrorMessageOnCode(ErrorCode.ExpiredCodeException));
        return;
      }

      if (error?.code === ErrorCode.AliasExistsException) {
        setErrorMessage(getErrorMessageOnCode(ErrorCode.AliasExistsException));
        onEmailExistsException?.();
        return;
      }

      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  if (isInitializingApp) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col justify-around h-full mx-4">
      <div>
        <div className="mb-10 text-center">
          Please provide the verification code sent to {maskedEmail}
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <form>
          <FilledTextField
            type="number"
            name="verificationCode"
            label="Verification Code"
            value={formValue.verificationCode}
            onChange={onChangeHandler}
          />
        </form>
        <div className="mt-6 flex text-sm justify-center">
          <div>{resendLabel}</div>
          <CustomButton
            isProcessButton
            className="ml-1 text-primary font-semibold"
            onClickHandler={resendVerification}
          >
            Resend
          </CustomButton>
        </div>
      </div>
      <div className="mt-8">
        <Button
          type={IButtonType.Submit}
          isBlock
          label="Verify"
          onClickHandler={verifyEmail}
          isInProgress={isVerifying}
          isDisabled={getStringValue(formValue?.verificationCode)?.length < 1}
        />
      </div>
    </div>
  );
};

export default VerificationForm;
