import axios from 'axios';
import { ENV, ENV_VARIABLES } from 'config/environments/environmentHelper';
import { StorageKey } from 'shared/constants/storageKeys';
import {
  isTokenAboutToExpire,
  saveCurrentUserSession,
} from 'shared/helpers/authHelpers';
import { logError } from 'shared/helpers/common';

export const apiClient = axios.create({
  baseURL: ENV_VARIABLES?.[ENV]?.API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const updatedHeaders = config.headers ? { ...config.headers } : {};
  updatedHeaders.Authorization = `Bearer ${localStorage.getItem(
    StorageKey.IdToken
  )}`;

  const updatedConfig = { ...config, headers: updatedHeaders };

  const shouldRefreshToken = isTokenAboutToExpire(
    localStorage.getItem(StorageKey.IdTokenExpiration)
  );

  if (shouldRefreshToken) {
    try {
      await saveCurrentUserSession();
    } catch (error) {
      logError(error);
    }
  }

  return updatedConfig;
});
