import { Amplify, Auth, Storage } from 'aws-amplify';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AMPLIFY_CONFIG, AMPLIFY_STORAGE } from 'config/amplify';
import useInitializeApp from 'hooks/useInitializeApp';
import { RootState } from 'reducers/store';
import { setIsAppInitialized } from 'reducers/uiSlice';
import { Routes } from 'shared/constants/routes';
import { saveCurrentUserSession } from 'shared/helpers/authHelpers';
import { logError } from 'shared/helpers/common';
import LoadingScreen from './components/LoadingScreen';

export default function withLoadingScreen<T>(
  WrappedComponent: ComponentType<T>
) {
  return function WithLoadingScreenContent(hocProps: T) {
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);
    const { isAppInitialized } = useSelector((state: RootState) => state.ui);
    const { initializeApp } = useInitializeApp();
    const dispatch = useDispatch();

    const setThemeMode = useCallback(() => {
      const bodyEl = document.querySelector('body');
      bodyEl?.classList.add('light-mode');
      setIsThemeLoaded(true);
    }, []);

    useEffect(() => setThemeMode(), [setThemeMode]);

    const initializeAwsAmplify = useCallback(() => {
      Amplify.configure(AMPLIFY_CONFIG);
      Storage.configure(AMPLIFY_STORAGE.FILE_ACCESS_LEVEL);
      Auth.configure(AMPLIFY_CONFIG.Auth);
    }, []);

    useEffect(() => {
      initializeAwsAmplify();
    }, [initializeAwsAmplify]);

    const loadAppData = useCallback(async () => {
      try {
        await saveCurrentUserSession();
        await initializeApp();
        dispatch(setIsAppInitialized(true));
      } catch (error) {
        logError(error);
      }
    }, [initializeApp, dispatch]);

    useEffect(() => {
      if (
        ![
          Routes.Login,
          Routes.SignUp,
          Routes.ForgotPassword,
          '/test-page',
        ].includes?.(window.location.pathname) &&
        !isAppInitialized
      ) {
        loadAppData();
      }
    }, [loadAppData, isAppInitialized]);

    if (!isThemeLoaded) {
      return null;
    }

    if (
      isAppInitialized ||
      [
        Routes.Login,
        Routes.SignUp,
        Routes.ForgotPassword,
        '/test-page',
      ].includes?.(window.location.pathname)
    ) {
      return <WrappedComponent {...hocProps} />;
    }

    return <LoadingScreen />;
  };
}
