import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LoadingSpinner from 'components/LoadingSpinner';
import TransactionDetail from 'components/transactionDetail/TransactionDetail';
import TransactionForm from 'components/transactionForm/TransactionForm';
import useSpinner from 'hooks/useSpinner';
import { RootState } from 'reducers/store';
import { getTransaction } from 'services/TransactionService';
import { getAttachment } from 'shared/helpers/attachmentHelpers';
import { logError } from 'shared/helpers/common';
import { displayFailToast } from 'shared/helpers/toast';
import { IViewAttachment, OperationType } from 'shared/types/commonTypes';
import { ITransaction } from 'shared/types/transactionTypes';

const TransactionDetailsPage: React.FC = () => {
  const [operationType, setOperationType] = useState<OperationType>(
    OperationType.View
  );
  const [transaction, setTransaction] = useState<ITransaction>();
  const {
    hashedCategoryIcons,
    selectedTransactionSource: { uuid: transactionSourceId = '' } = {},
  } = useSelector((state: RootState) => state.ui);
  const { transactionId } = useParams<{ transactionId: string }>();
  const [isLoadingData, toggleSpinner] = useSpinner(false);
  const [currentPhotos, setCurrentPhotos] = useState<IViewAttachment[]>([]);

  const loadPhotos = (transactionDetails: ITransaction) =>
    new Promise((resolve) => {
      const attachments = transactionDetails?.attachments || [];

      Promise.all(
        attachments?.map(({ uuid, fileName, attachmentType }) =>
          getAttachment({ uuid, fileName, attachmentType })
        )
      )
        .then((result = []) => {
          setCurrentPhotos(result);
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          resolve([]);
        });
    });

  const loadData = useCallback(async () => {
    const FETCH_ERROR_MESSAGE =
      'Something went wrong when fetching the transaction.';

    try {
      toggleSpinner(true);
      const { data: { result = {}, success = false } = {} } =
        await getTransaction(transactionId, transactionSourceId);

      if (!success) {
        displayFailToast(FETCH_ERROR_MESSAGE);
        return;
      }

      await loadPhotos(result as ITransaction);
      setTransaction(result as ITransaction);
      toggleSpinner(false);
    } catch (error) {
      logError(error);
      displayFailToast(FETCH_ERROR_MESSAGE);
      toggleSpinner(false);
    }
  }, [transactionSourceId, transactionId, toggleSpinner]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const category = transaction?.categoryId
    ? hashedCategoryIcons[transaction.categoryId]
    : null;

  const mainCategory = transaction?.mainCategoryId
    ? hashedCategoryIcons[transaction.mainCategoryId]
    : null;

  const onUpdate = async (updatedTransaction: ITransaction) => {
    setTransaction(updatedTransaction);
    setOperationType(OperationType.View);

    try {
      await loadPhotos(updatedTransaction);
    } catch (error) {
      logError(error);
    }
  };

  if (isLoadingData) {
    return <LoadingSpinner />;
  }

  return operationType === OperationType.View ? (
    <TransactionDetail
      transaction={transaction as ITransaction}
      category={category}
      mainCategory={mainCategory}
      goToUpdateScreen={() => setOperationType(OperationType.Update)}
      photosViewData={currentPhotos}
    />
  ) : (
    <TransactionForm
      transaction={transaction}
      operationType={OperationType.Update}
      onCancel={() => setOperationType(OperationType.View)}
      onUpdate={onUpdate}
      existingPhotos={currentPhotos}
    />
  );
};

export default TransactionDetailsPage;
