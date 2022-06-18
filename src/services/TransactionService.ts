import queryString from 'query-string';
import { apiClient } from 'config/api';
import { IResponse } from 'shared/types/commonTypes';
import {
  ITransaction,
  ITransactionCreatePayload,
  ITransactionSearchQuery,
  ITransactionUpdatePayload,
} from 'shared/types/transactionTypes';

export const createTransaction = (transactionData: ITransactionCreatePayload) =>
  apiClient.post('/api/transactions', transactionData);

export const updateTransaction = (transactionData: ITransactionUpdatePayload) =>
  apiClient.put('/api/transactions', transactionData);

export const getAllTransactions = (queryParams: ITransactionSearchQuery) => {
  const queryParamsString = queryParams
    ? `?${queryString.stringify(queryParams)}`
    : '';

  return apiClient.get<IResponse<ITransaction[]>>(
    `/api/transactions${queryParamsString}`
  );
};

export const getTransaction = (
  transactionId: string,
  transactionSourceId: string
) =>
  apiClient.get<IResponse<ITransaction>>(
    `/api/transactions/${transactionId}?transactionSourceId=${transactionSourceId}`
  );

export const deleteTransaction = (
  transactionId: string,
  transactionSourceId: string
) =>
  apiClient.delete<IResponse<null>>(
    `/api/transactions/${transactionId}?transactionSourceId=${transactionSourceId}`
  );
