import { apiClient } from 'config/api';
import { ITransactionSourceCreatePayload } from 'shared/types/transactionSourceTypes';

export const getAllTransansactionSources = () =>
  apiClient(`/api/transaction-sources`);

export const createTransansactionSource = (
  transactionSourceData: ITransactionSourceCreatePayload
) => apiClient.post('/api/transaction-sources', transactionSourceData);
