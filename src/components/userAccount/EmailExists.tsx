import LinkButton from 'components/LinkButton';
import { Routes } from 'shared/constants/routes';

const text = `A verified account with that email already exists. If you've forgotten
        your password, click the button below to reset it.`;

const EmailExists: React.FC = () => (
  <div className="flex flex-col justify-around h-full mx-4">
    <div className="text-center">
      <div className="text-xl font-bold">Account already exists</div>
      <div className="my-8">{text}</div>
    </div>
    <LinkButton url={Routes.ForgotPassword} label="Reset password" isBlock />
  </div>
);

export default EmailExists;
