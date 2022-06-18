import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RootState } from 'reducers/store';
import { Routes } from 'shared/constants/routes';
import { getNumberValue } from 'shared/helpers/common';
import { addRouteHistory } from '../reducers/uiSlice';
import style from '../style.module.scss';
import Toolbar from './Toolbar';

interface Props {
  element: React.ReactNode;
  hasToolbar?: boolean;
  pageTitle?: string;
  prevPageUrl?: string;
}

const Page: React.FC<Props> = ({
  element,
  hasToolbar,
  pageTitle,
  prevPageUrl,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { toolbarHeight = 0, footerHeight = 0 } = useSelector(
    (state: RootState) => state.ui
  );

  useEffect(() => {
    if (
      !location ||
      !location.pathname ||
      [
        `${Routes.Login}`,
        `${Routes.SignUp}`,
        `${Routes.ForgotPassword}`,
      ].includes(location.pathname)
    ) {
      return;
    }

    dispatch(addRouteHistory(location.pathname));
  }, [location, dispatch]);

  return (
    <IonPage>
      <IonContent>
        <ToastContainer
          className="mr-4 flex flex-col items-end"
          toastClassName={`toastClassNameTest ${style.appToast} w-80 m-4 flex items-center justify-end`}
        />
        <>
          {hasToolbar && (
            <Toolbar title={pageTitle} prevPageUrl={prevPageUrl} />
          )}
          <div
            style={{ height: '100%' }}
            className="overflow-hidden flex justify-center w-full bg-app-bg md:bg-app-side-bg"
          >
            <div
              style={{
                paddingBottom: `${Math.round(getNumberValue(footerHeight))}px`,
                paddingTop: `${
                  Math.round(getNumberValue(toolbarHeight)) + 5
                }px`,
              }}
              className="overflow-auto w-full md:w-[768px] md:border-x bg-app-bg"
            >
              {element}
            </div>
          </div>
        </>
      </IonContent>
    </IonPage>
  );
};

export default Page;
