import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Button from 'components/Button';
import ErrorMessage from 'components/typography/ErrorMessage';
import { ErrorCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { getErrorMessageOnCode, logError } from 'shared/helpers/common';
import { IButtonType } from 'shared/types/commonTypes';
import EmailExists from './EmailExists';
import VerificationForm from './VerificationForm';

interface Props {
  username: string;
  password: string;
}

const UnverifiedEmail: React.FC<Props> = ({ username, password }) => {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [hasEmailExistsError, setHasEmailExistsError] = useState(false);

  const sendVerificationCode = async () => {
    try {
      setIsSending(true);
      const { CodeDeliveryDetails: { Destination = '' } = {} } =
        await Auth.resendSignUp(username);
      setMaskedEmail(Destination);
      setIsVerificationCodeSent(true);
      setIsSending(false);
    } catch (error) {
      logError(error);
      setIsSending(false);

      if (error?.code === ErrorCode.LimitExceededException) {
        setErrorMessage(
          getErrorMessageOnCode(ErrorCode.LimitExceededException)
        );
        return;
      }

      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  if (isVerificationCodeSent && !hasEmailExistsError) {
    return (
      <VerificationForm
        maskedEmail={maskedEmail}
        username={username}
        password={password}
        onEmailExistsException={() => {
          setHasEmailExistsError(true);
        }}
      />
    );
  }

  return hasEmailExistsError ? (
    <EmailExists />
  ) : (
    <div className="flex flex-col justify-around h-full mx-4">
      <div className="text-center">
        <div className="text-xl font-bold">Verify your email address</div>
        <div className="my-8">
          To continue, please verify your email address.
        </div>
        <ErrorMessage message={errorMessage} />
      </div>
      <div className="mt-8">
        <Button
          type={IButtonType.Submit}
          isBlock
          label="Verify"
          onClickHandler={sendVerificationCode}
          isInProgress={isSending}
        />
      </div>
    </div>
  );
};

export default UnverifiedEmail;
