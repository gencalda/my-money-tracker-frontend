import { useState } from 'react';
import ForgotPasswordStepOne from 'components/userAccount/ForgotPasswordStepOne';
import ForgotPasswordStepTwo from 'components/userAccount/ForgotPasswordStepTwo';
import { ForgotPasswordStage } from 'shared/constants/common';

const ForgotPasswordPage = () => {
  const [forgotPasswordStage, setForgotPasswordStage] =
    useState<ForgotPasswordStage>(ForgotPasswordStage.Verify);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [username, setUsername] = useState('');

  const onVerificationCodeSent = (
    usernameValue: string,
    destinationEmail: string
  ): void => {
    setMaskedEmail(destinationEmail);
    setUsername(usernameValue);
    setForgotPasswordStage(ForgotPasswordStage.ChangePassword);
  };

  return (
    <>
      {forgotPasswordStage === ForgotPasswordStage.Verify && (
        <ForgotPasswordStepOne
          onVerificationCodeSent={onVerificationCodeSent}
        />
      )}
      {forgotPasswordStage === ForgotPasswordStage.ChangePassword && (
        <ForgotPasswordStepTwo maskedEmail={maskedEmail} username={username} />
      )}
    </>
  );
};

export default ForgotPasswordPage;
