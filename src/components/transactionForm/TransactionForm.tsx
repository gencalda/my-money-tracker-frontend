import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { MdOutlineDescription } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Button from 'components/Button';
import Footer from 'components/Footer';
import CategoryField from 'components/formFields/CategoryField';
import DateField from 'components/formFields/DateField';
import NumberField from 'components/formFields/NumberField';
import PhotoField from 'components/formFields/PhotoField';
import TextAreaField from 'components/formFields/TextAreaField';
import ConfirmDialog from 'components/modal/ConfirmDialog';
import useFormError from 'hooks/useFormError';
import useFormState from 'hooks/useFormState';
import useNavigate from 'hooks/useNavigate';
import usePhotoField from 'hooks/usePhotoField';
import { RootState } from 'reducers/store';
import { CATEGORIES, ICategory } from 'shared/constants/categories';
import { Routes } from 'shared/constants/routes';
import { SUB_CATEGORIES } from 'shared/constants/subcategories';
import {
  getNumberValue,
  getStringValue,
  isObjectHasValue,
  validateRequiredFields,
} from 'shared/helpers/common';
import { displayFailToast, displaySuccessToast } from 'shared/helpers/toast';
import {
  AttachmentType,
  IButtonType,
  IViewAttachment,
  OperationType,
} from 'shared/types/commonTypes';
import {
  ITransaction,
  ITransactionForm,
  ITransactionFormFieldsConfig,
} from 'shared/types/transactionTypes';
import { submitForm } from './transactionFormHelpers';

interface Props {
  transaction?: ITransaction;
  operationType: OperationType;
  onCancel?: () => void;
  onUpdate?: (updatedTransaction: ITransaction) => void;
  existingPhotos: IViewAttachment[];
}

const TransactionForm: React.FC<Props> = ({
  transaction,
  operationType,
  onCancel,
  onUpdate,
  existingPhotos = [],
}) => {
  const navigate = useNavigate();
  const {
    footerHeight,
    selectedTransactionSource: { uuid: transactionSourceId = '' } = {},
  } = useSelector((state: RootState) => state.ui);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const initialFormValue: ITransactionForm = {
    mainCategoryId: '',
    subCategoryId: '',
    amount: 0,
    description: '',
    date: new Date().getTime(),
  };
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [formFieldsConfig, setFormFieldsConfig] =
    useState<ITransactionFormFieldsConfig>();

  const { formError, setFormError } = useFormError();
  const {
    photosToUpload,
    photosToDelete,
    photoList,
    onPhotosChangeHandler,
    onPhotoRemoveHandler,
  } = usePhotoField({ existingPhotos });

  const {
    formValue,
    setFormValue,
    onChangeHandler,
    isFormUpdated,
    setIsFormUpdated,
  } = useFormState<ITransactionForm>({ ...initialFormValue });

  useEffect(() => {
    setFormValue((currentFormValue) => {
      const currentAttachments = currentFormValue.attachments || [];
      const newAttachments = photosToUpload?.map?.(
        ({ uuid, fileName, attachmentType, fileSize, fileType }) => ({
          uuid,
          fileName,
          attachmentType,
          fileSize,
          fileType,
        })
      );

      return {
        ...currentFormValue,
        attachments: [...currentAttachments, ...newAttachments],
      };
    });
  }, [photosToUpload, setFormValue]);

  useEffect(() => {
    setFormValue((currentFormValue) => {
      const currentAttachments = currentFormValue.attachments || [];
      const updatedAttachments = currentAttachments?.filter?.(
        (currentPhoto) => {
          const isToBeDeleted =
            photosToDelete?.find?.(
              (photoToDelete) =>
                photoToDelete.fileName === currentPhoto.fileName &&
                photoToDelete.uuid === currentPhoto.uuid
            ) !== undefined;

          return !isToBeDeleted;
        }
      );

      return {
        ...currentFormValue,
        attachments: [...updatedAttachments],
      };
    });
  }, [photosToDelete, setFormValue]);

  useEffect(() => {
    setFormFieldsConfig({
      mainCategoryId: {
        isRequired: true,
        label: 'Category',
        value: formValue.mainCategoryId,
        fieldName: 'mainCategoryId',
      },
      subCategoryId: {
        isRequired: false,
        label: 'Sub-Category',
        value: getStringValue(formValue?.subCategoryId),
        fieldName: 'subCategoryId',
      },
      amount: {
        isRequired: true,
        label: 'Amount',
        value: formValue?.amount,
        fieldName: 'amount',
      },
      description: {
        isRequired: false,
        label: 'Description',
        value: getStringValue(formValue?.description),
        fieldName: 'description',
      },
      date: {
        isRequired: true,
        label: 'Date',
        value: formValue?.date,
        fieldName: 'date',
      },
      attachments: {
        isRequired: false,
        label: '',
        value: formValue?.attachments || [],
        fieldName: 'attachments',
      },
    });
  }, [formValue]);

  useEffect(() => {
    if (
      operationType &&
      transaction &&
      operationType === OperationType.Update
    ) {
      const transactionData: ITransactionForm = {
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        createdAt: transaction.createdAt,
        uuid: transaction.uuid,
        mainCategoryId: '',
        attachments: transaction.attachments,
      };

      if (transaction.mainCategoryId) {
        transactionData.mainCategoryId = transaction.mainCategoryId;
        transactionData.subCategoryId = transaction.categoryId;
      } else {
        transactionData.mainCategoryId = transaction.categoryId;
      }

      setFormValue(transactionData);
    }
  }, [operationType, setFormValue, transaction]);

  useEffect(() => {
    setSubCategories(
      SUB_CATEGORIES.filter(
        (subCategory) => formValue.mainCategoryId === subCategory.mainCategoryId
      )
    );
  }, [formValue]);

  const validateForm = (): boolean =>
    validateRequiredFields(formFieldsConfig, setFormError);

  const onSuccessfulCreation = (updatedTransaction: ITransaction) => {
    navigate(`${Routes.Transactions}/${updatedTransaction.uuid}`);
  };

  const onSuccess = (updatedTransaction: ITransaction) => {
    if (operationType === OperationType.Create) {
      onSuccessfulCreation(updatedTransaction);
    } else if (operationType === OperationType.Update) {
      onUpdate?.(updatedTransaction);
    }
  };

  const saveTransaction = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsProcessing(true);
    const { success, message, result } = await submitForm({
      operationType,
      formValue,
      transactionSourceId,
      photosToUpload,
      photosToDelete,
    });

    if (success) {
      setIsFormUpdated(false);
      displaySuccessToast(message);

      onSuccess(result as ITransaction);
    } else {
      displayFailToast(message);
    }

    setIsProcessing(false);
  };

  const onShowCancelConfirmDialogHandler = () => {
    if (!isFormUpdated) {
      onCancel?.();
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  const onCancelHandler = () => {
    onCancel?.();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        style={{ marginBottom: `${getNumberValue(footerHeight) + 18}px` }}
        className="m-3 flex flex-col gap-2 border px-3 py-2 rounded-xl"
      >
        <CategoryField
          isRequired={formFieldsConfig?.mainCategoryId?.isRequired}
          name={getStringValue(formFieldsConfig?.mainCategoryId?.fieldName)}
          label={getStringValue(formFieldsConfig?.mainCategoryId?.label)}
          selectedOptionValue={formFieldsConfig?.mainCategoryId?.value}
          optionList={CATEGORIES}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.mainCategoryId}
        />
        <CategoryField
          isRequired={formFieldsConfig?.subCategoryId?.isRequired}
          name={getStringValue(formFieldsConfig?.subCategoryId?.fieldName)}
          label={getStringValue(formFieldsConfig?.subCategoryId?.label)}
          selectedOptionValue={formFieldsConfig?.subCategoryId?.value}
          optionList={subCategories}
          onChange={onChangeHandler}
        />
        <NumberField
          isRequired={formFieldsConfig?.amount?.isRequired}
          name={getStringValue(formFieldsConfig?.amount?.fieldName)}
          label={getStringValue(formFieldsConfig?.amount?.label)}
          numberValue={getNumberValue(formFieldsConfig?.amount?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.amount}
        />
        <TextAreaField
          icon={<MdOutlineDescription />}
          isRequired={formFieldsConfig?.description?.isRequired}
          name={getStringValue(formFieldsConfig?.description?.fieldName)}
          label={getStringValue(formFieldsConfig?.description?.label)}
          value={getStringValue(formFieldsConfig?.description?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.description}
        />
        <DateField
          isRequired={formFieldsConfig?.date?.isRequired}
          name={getStringValue(formFieldsConfig?.date?.fieldName)}
          label={getStringValue(formFieldsConfig?.date?.label)}
          timestampValue={getNumberValue(formFieldsConfig?.date?.value)}
          onChange={onChangeHandler}
          setErrorMessage={setFormError}
          errorMessage={formError?.date}
          hasTime
        />
        <PhotoField
          name={getStringValue(formFieldsConfig?.attachments?.fieldName)}
          onChange={(updatedPhotosToUpload) => {
            onPhotosChangeHandler(updatedPhotosToUpload);
            setIsFormUpdated(true);
          }}
          onRemove={(photoToRemove) => {
            onPhotoRemoveHandler(photoToRemove);
            setIsFormUpdated(true);
          }}
          photosViewData={photoList}
          attachmentType={AttachmentType.Transaction}
        />
      </div>
      <Footer>
        <div className="flex w-full justify-between">
          <Button
            isSecondary
            isBlock
            label="Cancel"
            onClickHandler={onShowCancelConfirmDialogHandler}
            className="my-3 mr-1.5 ml-3"
          />
          <Button
            isDisabled={!isFormUpdated || isObjectHasValue(formError)}
            type={IButtonType.Submit}
            isBlock
            label="Save Transaction"
            onClickHandler={saveTransaction}
            isInProgress={isProcessing}
            className="my-3 ml-1.5 mr-3"
          />
        </div>
      </Footer>
      {isConfirmDialogOpen && (
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          title={`Cancel transaction ${
            operationType === OperationType.Update ? 'update' : 'creation'
          }`}
          message={`You have unsaved changes. Are you sure you want to cancel ${
            operationType === OperationType.Update ? 'updating' : 'creating'
          } this transaction?`}
          onCloseConfirmDialog={() => {
            setIsConfirmDialogOpen(false);
          }}
          onConfirm={onCancelHandler}
        />
      )}
    </LocalizationProvider>
  );
};

export default TransactionForm;
