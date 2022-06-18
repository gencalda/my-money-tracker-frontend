import { useCallback, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { MdDateRange, MdOutlineDescription } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Button from 'components/Button';
import Footer from 'components/Footer';
import PhotoViewer from 'components/PhotoViewer';
import DynamicIcon from 'components/dynamicIcon/DynamicIcon';
import ConfirmDialog from 'components/modal/ConfirmDialog';
import TransactionDetailItem from 'components/transactionDetail/TransactionDetailItem';
import useNavigate from 'hooks/useNavigate';
import { RootState } from 'reducers/store';
import { deleteTransaction } from 'services/TransactionService';
import { ICategory } from 'shared/constants/categories';
import { DATE_YEAR_TIME } from 'shared/constants/common';
import { Routes } from 'shared/constants/routes';
import {
  formatDate,
  formatNumber,
  getStringValue,
  logError,
} from 'shared/helpers/common';
import { displaySuccessToast } from 'shared/helpers/toast';
import { IButtonType, IViewAttachment } from 'shared/types/commonTypes';
import { ITransaction } from 'shared/types/transactionTypes';

interface Props {
  transaction: ITransaction;
  category?: ICategory | null;
  mainCategory?: ICategory | null;
  goToUpdateScreen: () => void;
  photosViewData: IViewAttachment[];
}

const TransactionDetail: React.FC<Props> = ({
  transaction,
  category,
  mainCategory,
  goToUpdateScreen,
  photosViewData,
}) => {
  const { selectedTransactionSource: { uuid: transactionSourceId = '' } = {} } =
    useSelector((state: RootState) => state.ui);
  const { amount = 0, description = '', date } = transaction || {};
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentPhotIndex, setCurrentPhotoIndex] = useState(0);

  const onCloseConfirmDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const onConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTransaction(transaction?.uuid, transactionSourceId);
      onCloseConfirmDialog();
      navigate(Routes.Transactions);
      displaySuccessToast('Transaction successfully deleted.');
    } catch (error) {
      logError(error);
    }
    setIsDeleting(false);
  };

  const openPhotoViewer = useCallback((index) => {
    setCurrentPhotoIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closePhotoViewer = () => {
    setCurrentPhotoIndex(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <div className="m-3">
        <div className="flex flex-col gap-2 border p-2 rounded-xl">
          {mainCategory && (
            <TransactionDetailItem
              icon={
                <DynamicIcon
                  iconLib={getStringValue(mainCategory?.iconLib)}
                  iconName={getStringValue(mainCategory?.iconName)}
                />
              }
              label="Category"
              value={mainCategory?.label}
            />
          )}
          <TransactionDetailItem
            icon={
              <DynamicIcon
                iconLib={getStringValue(category?.iconLib)}
                iconName={getStringValue(category?.iconName)}
              />
            }
            label={mainCategory ? 'Sub-Category' : 'Category'}
            value={category?.label}
          />
          <TransactionDetailItem
            icon={
              <div className="text-md">
                <FaCoins />
              </div>
            }
            label="Amount"
            value={formatNumber(amount)}
          />
          <TransactionDetailItem
            icon={<MdOutlineDescription />}
            label="Description"
            value={description}
          />
          <TransactionDetailItem
            icon={<MdDateRange />}
            label="Date"
            value={formatDate(Number(date), DATE_YEAR_TIME)}
          />
        </div>
      </div>
      {photosViewData?.length > 0 && (
        <div className="mx-3 font-semibold text-color-no-primary-bg">
          {photosViewData?.length > 1 ? 'Photos: ' : 'Photo:'}
        </div>
      )}
      {/* eslint-disable  jsx-a11y/no-noninteractive-element-interactions */}
      <div className="flex flex-wrap gap-3 mx-3">
        {photosViewData?.map(({ url }, index) => (
          <div key={url} className="max-w-[31%] mb-3 mt-1 relative">
            <img
              className="cursor-pointer max-h-[300px]"
              src={url}
              alt={`transaction img-${index + 1}`}
              onClick={() => openPhotoViewer(index)}
            />
          </div>
        ))}
      </div>
      <Footer>
        <div className="flex w-full justify-between">
          <Button
            isSecondary
            isBlock
            label="Delete"
            onClickHandler={() => setIsDeleteDialogOpen(true)}
            className="my-3 mr-1.5 ml-3"
          />
          <Button
            isBlock
            label="Update"
            type={IButtonType.Button}
            onClickHandler={goToUpdateScreen}
            className="my-3 ml-1.5 mr-3"
          />
        </div>
      </Footer>
      {isDeleteDialogOpen && (
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="Delete transaction"
          message="Are you sure you want to delete this transaction?"
          onCloseConfirmDialog={onCloseConfirmDialog}
          onConfirm={onConfirmDelete}
          confirmLabel="Delete"
          isProcessing={isDeleting}
        />
      )}
      {isViewerOpen && (
        <PhotoViewer
          photosUrl={photosViewData?.map(({ url }) => url)}
          currentPhotoIndex={currentPhotIndex}
          onPhotoViewerClose={closePhotoViewer}
        />
      )}
    </>
  );
};

export default TransactionDetail;
