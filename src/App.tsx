// organize-imports-ignore
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Page from 'components/Page';
import AddTransactionPage from 'pages/AddTransactionPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import LoginPage from 'pages/LoginPage';
import SearchTransactionPage from 'pages/SearchTransactionPage';
import SignUpPage from 'pages/SignUpPage';
import TransactionDetailsPage from 'pages/TransactionDetailsPage';
import TransactionsPage from 'pages/TransactionsPage';
import { useRef } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
/* React Toastify styles */
import 'react-toastify/dist/ReactToastify.min.css';
import { Routes } from 'shared/constants/routes';
import withLoadingScreen from 'withLoadingScreen';
import './App.scss';
/* Tailwind styles */
import './assets/css/tailwind-output.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet ref={routerRef}>
          <Switch>
            <Route exact path="/">
              <Redirect to={Routes.Transactions} />
            </Route>
            <Route exact path={Routes.Transactions}>
              <Page
                hasToolbar
                pageTitle="Transactions"
                element={<TransactionsPage />}
              />
            </Route>
            <Route exact path={Routes.TransactionsNew}>
              <Page
                hasToolbar
                pageTitle="New Transaction"
                element={<AddTransactionPage />}
                prevPageUrl={Routes.Transactions}
              />
            </Route>
            <Route exact path={`${Routes.Transactions}/:transactionId`}>
              <Page
                hasToolbar
                pageTitle="Transaction"
                element={<TransactionDetailsPage />}
                prevPageUrl={Routes.Transactions}
              />
            </Route>
            <Route path={Routes.TransactionsSearch}>
              <Page
                hasToolbar
                pageTitle="Search Transaction"
                element={<SearchTransactionPage />}
                prevPageUrl={Routes.Transactions}
              />
            </Route>
            <Route path={Routes.Login}>
              <Page element={<LoginPage />} />
            </Route>
            <Route path={Routes.SignUp}>
              <Page element={<SignUpPage />} />
            </Route>
            <Route path={Routes.ForgotPassword}>
              <Page element={<ForgotPasswordPage />} />
            </Route>

            <Route path="*">
              <div>Page does not exist</div>
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default withLoadingScreen(App);
