import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import FilledPasswordField from 'components/formFields/FilledPasswordField';
import ErrorMessage from 'components/typography/ErrorMessage';
import useFormError from 'hooks/useFormError';
import useFormState from 'hooks/useFormState';
import { ErrorCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { Routes } from 'shared/constants/routes';
import {
  getErrorMessageOnCode,
  getStringValue,
  isObjectHasValue,
  isPasswordValueValid,
  logError,
  validateRequiredFields,
} from 'shared/helpers/common';
import { IButtonType, IFormFieldConfig } from 'shared/types/commonTypes';
import FilledTextField from '../formFields/FilledTextField';

const ERROR_PASSWORD_NOT_MATCH = 'Password does not match.';

export interface ISignUpForm {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

interface ISignUpFormFieldsConfig {
  username: IFormFieldConfig<string>;
  password: IFormFieldConfig<string>;
  confirmPassword: IFormFieldConfig<string>;
  name: IFormFieldConfig<string>;
  email: IFormFieldConfig<string>;
}

interface Props {
  onSignUp: (signUpForm: ISignUpForm, maskedEmail: string) => void;
  signUpDetails?: ISignUpForm;
}

const SignUpForm: React.FC<Props> = ({ onSignUp, signUpDetails }) => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { formValue, setFormValue, onChangeHandler } =
    useFormState<ISignUpForm>({
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
    });
  const [formFieldsConfig, setFormFieldsConfig] =
    useState<ISignUpFormFieldsConfig>();

  const { formError, setFormError } = useFormError();

  useEffect(() => {
    setFormFieldsConfig({
      username: {
        isRequired: true,
        label: 'Username',
        value: formValue.username,
        fieldName: 'username',
      },
      password: {
        isRequired: true,
        label: 'Password',
        value: formValue.password,
        fieldName: 'password',
      },
      confirmPassword: {
        isRequired: true,
        label: 'Confirm Password',
        value: formValue.confirmPassword,
        fieldName: 'confirmPassword',
      },
      name: {
        isRequired: true,
        label: 'Name',
        value: formValue.name,
        fieldName: 'name',
      },
      email: {
        isRequired: true,
        label: 'Email',
        value: formValue.email,
        fieldName: 'email',
      },
    });
  }, [formValue]);

  useEffect(() => {
    if (signUpDetails) {
      setFormValue(signUpDetails);
    }
  }, [signUpDetails, setFormValue]);

  const onPasswordBlurHandler = ({
    target: { name },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { confirmPassword, password } = formValue;
    const isPasswordField = ['confirmPassword', 'password'].includes(name);
    const hasPasssword = Boolean(password);
    const hasConfirmPasssword = Boolean(confirmPassword);
    const isPasswordValid =
      !isPasswordField ||
      !hasPasssword ||
      !hasConfirmPasssword ||
      (isPasswordField &&
        hasPasssword &&
        hasConfirmPasssword &&
        confirmPassword === password);

    setFormError(
      'password',
      isPasswordValueValid(password),
      'Password is invalid.'
    );
    setFormError('confirmPassword', isPasswordValid, ERROR_PASSWORD_NOT_MATCH);
  };

  const resetErrorMessage = () => {
    setErrorMessage('');
  };

  const validateForm = (): boolean =>
    validateRequiredFields(formFieldsConfig, setFormError);

  const onSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const { username = '', password = '', name = '', email = '' } = formValue;

    try {
      setIsInProgress(true);
      const { codeDeliveryDetails: { Destination: maskedEmail = '' } = {} } =
        await Auth.signUp({
          username,
          password,
          attributes: { email, name },
          validationData: { email, username },
        });
      setIsInProgress(false);
      onSignUp?.(formValue, maskedEmail);
      resetErrorMessage();
    } catch (error) {
      setIsInProgress(false);
      logError(error);

      if (error?.code === ErrorCode.UsernameExistsException) {
        setErrorMessage(
          getErrorMessageOnCode(ErrorCode.UsernameExistsException)
        );
        return;
      }

      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  return (
    <div className="flex flex-col justify-around h-full mx-4">
      <form>
        <div className="mb-8">
          <div className="text-2xl font-semibold">Sign Up</div>
          <div className="text-sm text-color-label">
            And start managing your expenses.
          </div>
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <FilledTextField
          isRequired={formFieldsConfig?.username?.isRequired}
          name={getStringValue(formFieldsConfig?.username?.fieldName)}
          label={getStringValue(formFieldsConfig?.username?.label)}
          value={getStringValue(formFieldsConfig?.username?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.username}
        />
        <FilledPasswordField
          isRequired={formFieldsConfig?.password?.isRequired}
          name={getStringValue(formFieldsConfig?.password?.fieldName)}
          label={getStringValue(formFieldsConfig?.password?.label)}
          value={getStringValue(formFieldsConfig?.password?.value)}
          onChange={onChangeHandler}
          onBlur={onPasswordBlurHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.password}
          id="password-signup-form"
          showPasswordChecker
        />
        <FilledPasswordField
          isRequired={formFieldsConfig?.confirmPassword?.isRequired}
          name={getStringValue(formFieldsConfig?.confirmPassword?.fieldName)}
          label={getStringValue(formFieldsConfig?.confirmPassword?.label)}
          value={getStringValue(formFieldsConfig?.confirmPassword?.value)}
          onChange={onChangeHandler}
          onBlur={onPasswordBlurHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.confirmPassword}
          id="confirm-password-signup-form"
        />
        <FilledTextField
          isRequired={formFieldsConfig?.name?.isRequired}
          name={getStringValue(formFieldsConfig?.name?.fieldName)}
          label={getStringValue(formFieldsConfig?.name?.label)}
          value={getStringValue(formFieldsConfig?.name?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.name}
        />
        <FilledTextField
          isRequired={formFieldsConfig?.email?.isRequired}
          name={getStringValue(formFieldsConfig?.email?.fieldName)}
          label={getStringValue(formFieldsConfig?.email?.label)}
          value={getStringValue(formFieldsConfig?.email?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.email}
          isEmail
        />
        <div className="mt-8">
          <Button
            type={IButtonType.Submit}
            isBlock
            label="Create account"
            onClickHandler={onSubmit}
            isDisabled={isObjectHasValue(formError)}
            isInProgress={isInProgress}
          />
        </div>
      </form>
      <div className="flex text-sm justify-center">
        <div>Already have an account?</div>
        <Link to={Routes.Login} className="ml-1 text-primary font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
