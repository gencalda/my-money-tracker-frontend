import { useState } from 'react';
import EmailExists from 'components/userAccount/EmailExists';
import SignUpForm, { ISignUpForm } from 'components/userAccount/SignUpForm';
import VerificationForm from 'components/userAccount/VerificationForm';
import { SignUpStage } from 'shared/constants/common';

export interface ISignUpDetails extends ISignUpForm {
  maskedEmail: string;
}

const SignUpPage: React.FC = () => {
  const [signUpStage, setSignUpStage] = useState<SignUpStage>(
    SignUpStage.SignUp
  );
  const [signUpDetails, setSignUpDetails] = useState<ISignUpDetails>({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    maskedEmail: '',
  });

  const onSignUp = (
    { username, password, confirmPassword, name, email }: ISignUpForm,
    maskedEmail: string
  ) => {
    setSignUpStage(SignUpStage.Verify);
    setSignUpDetails({
      username,
      password,
      confirmPassword,
      name,
      email,
      maskedEmail,
    });
  };

  return (
    <>
      {signUpStage === SignUpStage.SignUp && (
        <SignUpForm onSignUp={onSignUp} signUpDetails={signUpDetails} />
      )}
      {signUpStage === SignUpStage.Verify && (
        <VerificationForm
          username={signUpDetails.username}
          maskedEmail={signUpDetails.maskedEmail}
          password={signUpDetails.password}
          onEmailExistsException={() =>
            setSignUpStage(SignUpStage.EmailExistsError)
          }
        />
      )}
      {signUpStage === SignUpStage.EmailExistsError && <EmailExists />}
    </>
  );
};

export default SignUpPage;
