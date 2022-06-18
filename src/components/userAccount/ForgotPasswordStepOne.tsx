import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import FilledTextField from 'components/formFields/FilledTextField';
import ErrorMessage from 'components/typography/ErrorMessage';
import useFormError from 'hooks/useFormError';
import useFormState from 'hooks/useFormState';
import { GENERIC_ERROR_MSG } from 'shared/constants/errors';
import {
  getStringValue,
  isObjectHasValue,
  logError,
  validateRequiredFields,
} from 'shared/helpers/common';
import { IButtonType, IFormFieldConfig } from 'shared/types/commonTypes';

interface IForm {
  username: string;
}

interface Props {
  onVerificationCodeSent: (username: string, maskedEmail: string) => void;
}

const ForgotPasswordStepOne: React.FC<Props> = ({ onVerificationCodeSent }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const { formValue, onChangeHandler } = useFormState<IForm>({
    username: '',
  });
  const [isSending, setIsSending] = useState(false);
  const { formError, setFormError } = useFormError();
  const [formFieldsConfig, setFormFieldsConfig] = useState<{
    username: IFormFieldConfig<string>;
  }>();

  useEffect(() => {
    setFormFieldsConfig({
      username: {
        isRequired: true,
        label: 'Username or email',
        value: formValue.username,
        fieldName: 'username',
      },
    });
  }, [formValue]);

  const sendVerificationCode = async (): Promise<void> => {
    try {
      const isFormValid = validateRequiredFields(
        formFieldsConfig,
        setFormError
      );

      if (!isFormValid) {
        return;
      }

      setIsSending(true);
      const { CodeDeliveryDetails: { Destination: maskedEmail = '' } = {} } =
        await Auth.forgotPassword(formValue?.username);
      setIsSending(false);
      onVerificationCodeSent?.(formValue?.username, maskedEmail);
    } catch (error) {
      logError(error);
      setIsSending(false);
      setErrorMessage(GENERIC_ERROR_MSG);
    }
  };

  return (
    <div className="flex flex-col justify-around h-full mx-4">
      <div className="text-center">
        <div className="text-2xl font-semibold">Verification</div>
        <div className="my-8">
          To continue, please provide your username or email and a verification
          code will be sent to your email.
        </div>
        <ErrorMessage message={errorMessage} />
        <form>
          <FilledTextField
            isRequired={formFieldsConfig?.username?.isRequired}
            name={getStringValue(formFieldsConfig?.username?.fieldName)}
            label={getStringValue(formFieldsConfig?.username?.label)}
            value={getStringValue(formFieldsConfig?.username?.value)}
            onChange={onChangeHandler}
            setErrorMessage={setFormError}
            errorMessage={formError?.username}
          />
        </form>
      </div>
      <div className="mt-8">
        <Button
          type={IButtonType.Submit}
          isBlock
          label="Send verification code"
          onClickHandler={sendVerificationCode}
          isInProgress={isSending}
          isDisabled={isObjectHasValue(formError)}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordStepOne;
