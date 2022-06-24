import queryString from 'query-string';
import { apiClient } from 'config/api';
import { ApiRoutes } from 'shared/constants/apiRoutes';
import { IResponse } from 'shared/types/commonTypes';
import {
  ITransaction,
  ITransactionCreatePayload,
  ITransactionSearchQuery,
  ITransactionUpdatePayload,
} from 'shared/types/transactionTypes';

export const createTransaction = (transactionData: ITransactionCreatePayload) =>
  apiClient.post(ApiRoutes.Transactions, transactionData);

export const updateTransaction = (transactionData: ITransactionUpdatePayload) =>
  apiClient.put(ApiRoutes.Transactions, transactionData);

export const getAllTransactions = (queryParams: ITransactionSearchQuery) => {
  const queryParamsString = queryParams
    ? `?${queryString.stringify(queryParams)}`
    : '';

  return apiClient.get<IResponse<ITransaction[]>>(
    `${ApiRoutes.Transactions}${queryParamsString}`
  );
};

export const getTransaction = (
  transactionId: string,
  transactionSourceId: string
) =>
  apiClient.get<IResponse<ITransaction>>(
    `${ApiRoutes.Transactions}/${transactionId}?transactionSourceId=${transactionSourceId}`
  );

export const deleteTransaction = (
  transactionId: string,
  transactionSourceId: string
) =>
  apiClient.delete<IResponse<null>>(
    `${ApiRoutes.Transactions}/${transactionId}?transactionSourceId=${transactionSourceId}`
  );
