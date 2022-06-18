export enum TransactionSourceType {
  CreditCard = 'CreditCard',
  DebitCard = 'DebitCard',
  Cash = 'Cash',
}

export interface ITransactionSource {
  userId: string;
  createdAt: number;
  updatedAt: number;
  uuid: string;
  name: string;
  currentBalance: number;
  cardLast4Digits: string;
  type: TransactionSourceType;
}

export interface ITransactionSourceCreatePayload {
  name?: string;
}
