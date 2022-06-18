import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Button from 'components/Button';
import FilledPasswordField from 'components/formFields/FilledPasswordField';
import ErrorMessage from 'components/typography/ErrorMessage';
import useFormState from 'hooks/useFormState';
import { ErrorCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { getErrorMessageOnCode, logError } from 'shared/helpers/common';
import { IButtonType } from 'shared/types/commonTypes';
import FilledTextField from '../formFields/FilledTextField';

interface ILoginForm {
  usernameOrEmail: string;
  password: string;
}

interface Props {
  onUnverifiedLogin: (username: string, password: string) => void;
  onSuccessfulLogin: () => void;
}

const LoginForm: React.FC<Props> = ({
  onUnverifiedLogin,
  onSuccessfulLogin,
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { formValue, onChangeHandler } = useFormState<ILoginForm>({
    usernameOrEmail: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    try {
      setIsLoggingIn(true);
      await Auth.signIn(formValue?.usernameOrEmail, formValue?.password);
      onSuccessfulLogin?.();
    } catch (error) {
      logError(error);
      setIsLoggingIn(false);

      if (error?.code === ErrorCode.UserNotConfirmedException) {
        onUnverifiedLogin?.(formValue?.usernameOrEmail, formValue?.password);
        return;
      }

      if (error?.code === ErrorCode.NotAuthorizedException) {
        setErrorMessage(
          getErrorMessageOnCode(ErrorCode.NotAuthorizedException)
        );
        return;
      }

      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage('');
    onChangeHandler?.(event);
  };

  return (
    <form>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <FilledTextField
        name="usernameOrEmail"
        label="Username or email"
        value={formValue.usernameOrEmail}
        onChange={onChange}
      />
      <FilledPasswordField
        name="password"
        label="Password"
        value={formValue.password}
        onChange={onChange}
        onPressEnter={onSubmit}
      />
      <div className="mt-8">
        <Button
          type={IButtonType.Submit}
          isBlock
          label="Login"
          onClickHandler={onSubmit}
          isInProgress={isLoggingIn}
        />
      </div>
    </form>
  );
};

export default LoginForm;
