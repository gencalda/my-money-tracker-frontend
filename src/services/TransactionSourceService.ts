import { apiClient } from 'config/api';
import { ApiRoutes } from 'shared/constants/apiRoutes';
import { ITransactionSourceCreatePayload } from 'shared/types/transactionSourceTypes';

export const getAllTransansactionSources = () =>
  apiClient(ApiRoutes.TransactionSources);

export const createTransansactionSource = (
  transactionSourceData: ITransactionSourceCreatePayload
) => apiClient.post(ApiRoutes.TransactionSources, transactionSourceData);
