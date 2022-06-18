import TransactionForm from 'components/transactionForm/TransactionForm';
import useNavigate from 'hooks/useNavigate';
import { Routes } from 'shared/constants/routes';
import { OperationType } from 'shared/types/commonTypes';

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const onCancelHandler = () => {
    navigate(Routes.Transactions);
  };

  return (
    <TransactionForm
      operationType={OperationType.Create}
      onCancel={onCancelHandler}
      existingPhotos={[]}
    />
  );
};

export default AddTransactionPage;
