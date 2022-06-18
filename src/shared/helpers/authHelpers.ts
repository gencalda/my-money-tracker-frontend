import { Auth } from 'aws-amplify';
import { differenceInMinutes } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { Routes } from 'shared/constants/routes';
import { StorageKey } from 'shared/constants/storageKeys';
import { logError } from './common';

export const decodeJwt = (jwt = ''): Record<string, any> => {
  try {
    return jwt_decode(jwt);
  } catch (error) {
    logError(error);
    return {};
  }
};

export const saveCurrentUserSession = async () => {
  try {
    const session = await Auth.currentSession();
    const accessToken = session?.getAccessToken?.()?.getJwtToken?.() || '';
    const idToken = session.getIdToken()?.getJwtToken?.() || '';
    const refreshToken = session.getRefreshToken?.()?.getToken?.() || '';
    localStorage.setItem(StorageKey.AccessToken, accessToken);
    localStorage.setItem(StorageKey.IdToken, idToken);
    localStorage.setItem(StorageKey.RefreshToken, refreshToken);

    const decodedIdToken = decodeJwt(idToken);
    if (decodedIdToken?.exp) {
      localStorage.setItem(StorageKey.IdTokenExpiration, decodedIdToken?.exp);
    }
  } catch (error) {
    logError(error);
    window.location.replace(`${Routes.Login}?loggedIn=false`);
  }
};

export const isTokenAboutToExpire = (
  tokenExpiration: string | null
): boolean => {
  if (!tokenExpiration) {
    return true;
  }

  try {
    const jwtTokenExpiration = Number(tokenExpiration); // in seconds
    const diffInMins = differenceInMinutes(
      new Date(),
      new Date(jwtTokenExpiration * 1000)
    );
    return diffInMins > 5;
  } catch (error) {
    logError(error);
    return true;
  }
};
