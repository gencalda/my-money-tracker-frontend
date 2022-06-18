import { useEffect, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';
import { Link } from 'react-router-dom';
import { RootState } from 'reducers/store';
import { removeRouteHistory, setToolbarHeight } from 'reducers/uiSlice';
import { Routes } from 'shared/constants/routes';
import SettingsMenu from './SettingsMenu';

interface Props {
  title?: string;
  prevPageUrl?: string;
}

const Toolbar: React.FC<Props> = ({ title, prevPageUrl }) => {
  const { height, ref } = useResizeDetector();
  const { routeHistory } = useSelector((state: RootState) => state.ui);
  const [backButtonDefaultRoute, setBackButtonDefaultRoute] =
    useState<string>();
  const [currentRouteIndex, setCurrentRouteIndex] = useState<number>();
  const [currentRoutePath, setCurrentRoutePath] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (routeHistory && routeHistory.length >= 2) {
      setBackButtonDefaultRoute(routeHistory[routeHistory.length - 2]);
      setCurrentRouteIndex(routeHistory.length - 1);
      setCurrentRoutePath(routeHistory[routeHistory.length - 1]);
    } else if (routeHistory && routeHistory.length < 2) {
      setBackButtonDefaultRoute(
        window.location.pathname === Routes.Transactions
          ? ''
          : Routes.Transactions
      );
    }
  }, [routeHistory]);

  useEffect(() => {
    dispatch(setToolbarHeight(height));
  }, [height, dispatch]);

  const onBack = () => {
    dispatch(
      removeRouteHistory({
        routeIndex: currentRouteIndex,
        routePath: currentRoutePath,
      })
    );
  };

  return (
    <header
      ref={ref}
      className="flex justify-center fixed z-[2] w-full bg-app-bg md:bg-app-side-bg"
    >
      <div className="flex w-full md:w-[768px] bg-app-bg md:border-x md:border-t">
        <div className="flex flex-col grow">
          <div className="m-3 mb-2 flex">
            {backButtonDefaultRoute &&
              window.location.pathname !== Routes.Transactions && (
                <Link
                  className="grow-0"
                  to={prevPageUrl || backButtonDefaultRoute}
                  onClick={onBack}
                >
                  <div className="py-[0.4rem] pl-[0.4rem] pr-[0.5rem] w-fit bg-secondary rounded-lg text-color-label text-xl">
                    <MdChevronLeft />
                  </div>
                </Link>
              )}
          </div>

          <div className="mx-3 my-0 text-color-no-primary-bg text-2xl font-bold">
            {title}
          </div>
        </div>
        <SettingsMenu />
      </div>
    </header>
  );
};

export default Toolbar;
