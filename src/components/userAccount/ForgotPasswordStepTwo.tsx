import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import FilledPasswordField from 'components/formFields/FilledPasswordField';
import ErrorMessage from 'components/typography/ErrorMessage';
import useFormError from 'hooks/useFormError';
import useFormState from 'hooks/useFormState';
import useNavigate from 'hooks/useNavigate';
import { errorMessageOnCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { Routes } from 'shared/constants/routes';
import {
  getStringValue,
  isObjectHasValue,
  logError,
  validateRequiredFields,
} from 'shared/helpers/common';
import { displayFailToast, displaySuccessToast } from 'shared/helpers/toast';
import { IButtonType, IFormFieldConfig } from 'shared/types/commonTypes';
import CustomButton from '../CustomButton';
import FilledTextField from '../formFields/FilledTextField';

const ERROR_PASSWORD_NOT_MATCH = 'New password does not match.';
const resendLabel = `Didn't receive code?`;

interface IForgotPasswordForm {
  verificationCode: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ISignUpFormFieldsConfig {
  verificationCode: IFormFieldConfig<string>;
  newPassword: IFormFieldConfig<string>;
  confirmNewPassword: IFormFieldConfig<string>;
}

interface Props {
  maskedEmail: string;
  username: string;
}

const ForgotPasswordStepTwo: React.FC<Props> = ({ username, maskedEmail }) => {
  const { formValue, onChangeHandler } = useFormState<IForgotPasswordForm>({
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errorMessageDisplay, setErrorMessageDisplay] = useState('');
  const navigate = useNavigate();
  const [isInProgress, setIsInProgress] = useState(false);
  const [formFieldsConfig, setFormFieldsConfig] =
    useState<ISignUpFormFieldsConfig>();
  const { formError, setFormError, removeAllFormErrors } = useFormError();

  useEffect(() => {
    setFormFieldsConfig({
      verificationCode: {
        isRequired: true,
        label: 'Verification Code',
        value: formValue.verificationCode,
        fieldName: 'verificationCode',
      },
      newPassword: {
        isRequired: true,
        label: 'New password',
        value: formValue.newPassword,
        fieldName: 'newPassword',
      },
      confirmNewPassword: {
        isRequired: true,
        label: 'Confirm new password',
        value: formValue.confirmNewPassword,
        fieldName: 'confirmNewPassword',
      },
    });
  }, [formValue]);

  const changePassword = async () => {
    const isFormValid = validateRequiredFields(formFieldsConfig, setFormError);

    if (!isFormValid) {
      return;
    }

    const { verificationCode, newPassword } = formValue;

    try {
      setIsInProgress(true);
      removeAllFormErrors();
      await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
      setIsInProgress(false);
      displaySuccessToast('Password successfully changed.');

      navigate(Routes.Login);
    } catch (error) {
      logError(error);

      setIsInProgress(false);
      const errorMessage =
        errorMessageOnCode?.[error?.code] || GENERIC_ERROR_MSG;

      if (
        ['CodeMismatchException', 'ExpiredCodeException'].includes(error?.code)
      ) {
        setFormError('verificationCode', false, errorMessage);
        return;
      }

      setErrorMessageDisplay(GENERIC_ERROR_MSG);
    }
  };

  const onBlurHandler = ({
    target: { name },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { confirmNewPassword, newPassword } = formValue;
    const isPasswordField = ['confirmNewPassword', 'newPassword'].includes(
      name
    );
    const hasNewPasssword = Boolean(newPassword);
    const hasConfirmNewPasssword = Boolean(confirmNewPassword);
    const isPasswordValid =
      !isPasswordField ||
      !hasNewPasssword ||
      !hasConfirmNewPasssword ||
      (isPasswordField &&
        hasNewPasssword &&
        hasConfirmNewPasssword &&
        confirmNewPassword === newPassword);

    setFormError(
      'confirmNewPassword',
      isPasswordValid,
      ERROR_PASSWORD_NOT_MATCH
    );
  };

  const resendVerification = async () => {
    try {
      await Auth.forgotPassword(username);
      displaySuccessToast('Verification code successfully sent.');
    } catch (error) {
      logError(error);

      displayFailToast(
        'Something went wrong. Failed to send verification code.'
      );
      setErrorMessageDisplay(GENERIC_ERROR_MSG);
    }
  };

  return (
    <div className="flex flex-col justify-around h-full mx-4">
      <div>
        <div className="mb-10 text-center">
          Please provide the verification code sent to{' '}
          {maskedEmail || 'your email'} and your new password.
        </div>
        <ErrorMessage message={errorMessageDisplay} />
        <form>
          <FilledTextField
            type="number"
            isRequired={formFieldsConfig?.verificationCode?.isRequired}
            name={getStringValue(formFieldsConfig?.verificationCode?.fieldName)}
            label={getStringValue(formFieldsConfig?.verificationCode?.label)}
            value={getStringValue(formFieldsConfig?.verificationCode?.value)}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            setErrorMessage={setFormError}
            errorMessage={formError?.verificationCode}
          />
          <FilledPasswordField
            isRequired={formFieldsConfig?.newPassword?.isRequired}
            name={getStringValue(formFieldsConfig?.newPassword?.fieldName)}
            label={getStringValue(formFieldsConfig?.newPassword?.label)}
            value={getStringValue(formFieldsConfig?.newPassword?.value)}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            setErrorMessage={setFormError}
            errorMessage={formError?.newPassword}
          />

          <FilledPasswordField
            isRequired={formFieldsConfig?.confirmNewPassword?.isRequired}
            name={getStringValue(
              formFieldsConfig?.confirmNewPassword?.fieldName
            )}
            label={getStringValue(formFieldsConfig?.confirmNewPassword?.label)}
            value={getStringValue(formFieldsConfig?.confirmNewPassword?.value)}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            setErrorMessage={setFormError}
            errorMessage={formError?.confirmNewPassword}
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
          label="Change password"
          onClickHandler={changePassword}
          isDisabled={isObjectHasValue(formError)}
          isInProgress={isInProgress}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordStepTwo;
