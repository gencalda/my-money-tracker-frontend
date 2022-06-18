import { IAttachmentDetails, IFormFieldConfig } from './commonTypes';

export enum ITransactionType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface ITransaction {
  createdAt: number;
  updatedAt?: number;
  uuid: string;
  transactionSourceId: string;
  categoryId: string;
  mainCategoryId?: string;
  type: ITransactionType;
  description?: string;
  amount: number;
  date: number;
  attachments?: IAttachmentDetails[];
}

export interface ITransactionForm {
  mainCategoryId: string;
  subCategoryId?: string;
  amount: number;
  description?: string;
  date: number;
  uuid?: string;
  createdAt?: number;
  attachments?: IAttachmentDetails[];
}

export interface ITransactionSearchForm {
  categoryId: string;
  subCategoryId?: string;
  dateFrom: number;
  dateTo: number;
}

export interface ITransactionSearchQuery {
  transactionSourceId: string;
  dateFrom?: number;
  dateTo?: number;
  categoryId?: string;
  subCategoryId?: string;
}

export interface ITransactionDefaultPayload {
  transactionSourceId: string;
  categoryId: string;
  mainCategoryId?: string;
  description?: string;
  amount: number;
  type: ITransactionType;
  date: number;
  attachments?: IAttachmentDetails[];
}

export type ITransactionCreatePayload = ITransactionDefaultPayload;

export type ITransactionUpdatePayload = ITransactionCreatePayload & {
  uuid: string;
  createdAt: number;
};

export interface ITransactionFormFieldsConfig {
  mainCategoryId: IFormFieldConfig<string>;
  subCategoryId: IFormFieldConfig<string>;
  amount: IFormFieldConfig<number>;
  description: IFormFieldConfig<string>;
  date: IFormFieldConfig<number>;
  attachments: IFormFieldConfig<IAttachmentDetails[]>;
}
