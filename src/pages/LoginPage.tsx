import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import LoginForm from 'components/userAccount/LoginForm';
import UnverifiedEmail from 'components/userAccount/UnverifiedEmail';
import useInitializeApp from 'hooks/useInitializeApp';
import useNavigate from 'hooks/useNavigate';
import { setIsAppInitialized } from 'reducers/uiSlice';
import { Routes } from 'shared/constants/routes';
import { saveCurrentUserSession } from 'shared/helpers/authHelpers';
import { getStringValue, logError } from 'shared/helpers/common';
import { displayFailToast } from 'shared/helpers/toast';

const signUpLabel = `Don't have an account?`;

const LoginPage: React.FC = () => {
  const { initializeApp } = useInitializeApp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNotVerified, setIsNotVerified] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isInitializingApp, setIsInitializingApp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = queryString.parse(getStringValue(location.search));

    if (queryParams?.loggedIn === 'false') {
      displayFailToast('Please login to continue.');
    }
  }, [location]);

  const onUnverifiedLogin = (unverifiedUsername: string, password: string) => {
    setIsNotVerified(true);
    setCredentials({
      username: unverifiedUsername,
      password,
    });
  };

  const onSuccessfulLogin = async () => {
    try {
      setIsInitializingApp(true);
      await saveCurrentUserSession();
      await initializeApp();
      setTimeout(() => {
        setIsInitializingApp(false);
        dispatch(setIsAppInitialized(true));
        navigate(Routes.Transactions);
      }, 150);
    } catch (error) {
      logError(error);
    }
  };

  if (isInitializingApp) {
    return <LoadingSpinner />;
  }

  return isNotVerified ? (
    <UnverifiedEmail
      username={credentials?.username}
      password={credentials?.password}
    />
  ) : (
    <div className="flex flex-col justify-around h-full mx-4">
      <div>
        <div className="mt-4 text-center text-3xl mb-32 font-semibold text-color-no-primary-bg md:text-5xl">
          My money tracker
        </div>
        <LoginForm
          onUnverifiedLogin={onUnverifiedLogin}
          onSuccessfulLogin={onSuccessfulLogin}
        />
        <div className="flex justify-center mt-2">
          <Link
            to={Routes.ForgotPassword}
            className="mt-2 text-primary text-sm font-semibold"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="flex text-sm justify-center">
        <div className="mr-1">{signUpLabel}</div>
        <Link to={Routes.SignUp} className="ml-1 text-primary font-semibold">
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
