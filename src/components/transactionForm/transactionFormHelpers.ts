import {
  createTransaction,
  updateTransaction,
} from 'services/TransactionService';
import {
  deleteAttachments,
  uploadAttachments,
} from 'shared/helpers/attachmentHelpers';
import { logError } from 'shared/helpers/common';
import {
  IAttachmentToUpload,
  IBaseAttachment,
  IResult,
  OperationType,
} from 'shared/types/commonTypes';
import {
  ITransactionCreatePayload,
  ITransactionDefaultPayload,
  ITransactionForm,
  ITransactionType,
  ITransactionUpdatePayload,
} from 'shared/types/transactionTypes';

interface ISubmitForm {
  operationType: OperationType;
  formValue: ITransactionForm;
  transactionSourceId: string;
  photosToUpload: IAttachmentToUpload[];
  photosToDelete: IBaseAttachment[];
}

const getDefaultPayload = (
  formValue: ITransactionForm,
  transactionSourceId: string
): ITransactionDefaultPayload => {
  const payload: ITransactionDefaultPayload = {
    transactionSourceId,
    categoryId: '',
    description: formValue.description,
    amount: formValue.amount,
    type: ITransactionType.Expense,
    date: formValue.date || 0,
    attachments: formValue.attachments,
  };

  if (formValue.subCategoryId) {
    payload.categoryId = formValue.subCategoryId;
    payload.mainCategoryId = formValue.mainCategoryId;
  } else {
    payload.categoryId = formValue.mainCategoryId;
  }

  return payload;
};

const getCreatePayload = (
  formValue: ITransactionForm,
  transactionSourceId: string
): ITransactionCreatePayload =>
  getDefaultPayload(formValue, transactionSourceId);

const getUpdatePayload = (
  formValue: ITransactionForm,
  transactionSourceId: string
): ITransactionUpdatePayload => ({
  ...getDefaultPayload(formValue, transactionSourceId),
  uuid: formValue.uuid || '',
  createdAt: formValue.createdAt || 0,
});

const getSuccessMessage = (
  operationType: OperationType,
  isUploadAllSuccess: boolean
): string => {
  const CREATE_SUCCESS_MESSAGE = 'Successfully created transaction.';
  const CREATE_SUCCESS_UPLOAD_FAILED_MESSAGE =
    'Successfully created transaction but failed to upload photo/s.';
  const UPDATE_SUCCESS_MESSAGE = 'Successfully updated transaction.';
  const UPDATE_SUCCESS_UPLOAD_FAILED_MESSAGE =
    'Successfully updated transaction but failed to upload photo/s.';

  let message = '';
  if (operationType === OperationType.Create) {
    message = isUploadAllSuccess
      ? CREATE_SUCCESS_MESSAGE
      : CREATE_SUCCESS_UPLOAD_FAILED_MESSAGE;
  } else {
    message = isUploadAllSuccess
      ? UPDATE_SUCCESS_MESSAGE
      : UPDATE_SUCCESS_UPLOAD_FAILED_MESSAGE;
  }

  return message;
};

export const submitForm = async ({
  operationType,
  formValue,
  transactionSourceId,
  photosToUpload,
  photosToDelete,
}: ISubmitForm): Promise<IResult> => {
  if (!operationType) {
    return {
      success: false,
      message: 'Something went wrong. No operation provided.',
    };
  }

  const CREATE_FAILED_MESSAGE =
    'Something went wrong. Failed to create transaction.';
  const UPDATE_FAILED_MESSAGE =
    'Something went wrong. Failed to update transaction.';

  try {
    let transactionData = {};
    if (operationType === OperationType.Create) {
      const { data: { success: isCreateSuccess = false, result = {} } = {} } =
        await createTransaction(
          getCreatePayload(formValue, transactionSourceId)
        );
      transactionData = result;

      if (!isCreateSuccess) {
        return {
          success: false,
          message: CREATE_FAILED_MESSAGE,
        };
      }
    } else {
      const { data: { success: isUpdateSuccess = false, result = {} } = {} } =
        await updateTransaction(
          getUpdatePayload(formValue, transactionSourceId)
        );
      transactionData = result;

      if (!isUpdateSuccess) {
        return {
          success: false,
          message: UPDATE_FAILED_MESSAGE,
        };
      }
    }

    const { data: { success: isUploadSuccess, failedFiles = [] } = {} } =
      await uploadAttachments(photosToUpload);
    await deleteAttachments(photosToDelete);

    const isUploadAllSuccess =
      (isUploadSuccess && failedFiles?.length < 1) || false;

    return {
      success: true,
      message: getSuccessMessage(operationType, isUploadAllSuccess),
      result: transactionData,
    };
  } catch (error) {
    logError(error);

    return {
      success: false,
      message:
        operationType === OperationType.Create
          ? CREATE_FAILED_MESSAGE
          : UPDATE_FAILED_MESSAGE,
    };
  }
};
