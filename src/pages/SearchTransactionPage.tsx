import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { endOfDay, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from 'components/Button';
import Footer from 'components/Footer';
import CategoryField from 'components/formFields/CategoryField';
import DateField from 'components/formFields/DateField';
import TransactionItem from 'components/transaction/TransactionItem';
import useFormState from 'hooks/useFormState';
import { RootState } from 'reducers/store';
import { getAllTransactions } from 'services/TransactionService';
import { CATEGORIES, ICategory } from 'shared/constants/categories';
import { SUB_CATEGORIES } from 'shared/constants/subcategories';
import { logError } from 'shared/helpers/common';
import { displayFailToast } from 'shared/helpers/toast';
import { IButtonType } from 'shared/types/commonTypes';
import {
  ITransaction,
  ITransactionSearchForm,
  ITransactionSearchQuery,
} from 'shared/types/transactionTypes';

const SearchPage: React.FC = () => {
  const {
    selectedTransactionSource: { uuid: transactionSourceId = '' },
  } = useSelector((state: RootState) => state.ui);
  const [subCategories, setSubCategories] = useState<ICategory[]>([]);
  const initialFormValue: ITransactionSearchForm = {
    categoryId: '',
    subCategoryId: '',
    dateTo: new Date().getTime(),
    dateFrom: new Date().getTime(),
  };
  const [isSearching, setIsSearching] = useState(false);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const [hasTransactions, setHasTransactions] = useState<boolean | null>(null);

  const { formValue, onChangeHandler } =
    useFormState<ITransactionSearchForm>(initialFormValue);

  useEffect(() => {
    setSubCategories(
      SUB_CATEGORIES.filter(
        (subCategory) => formValue.categoryId === subCategory.mainCategoryId
      )
    );
  }, [formValue]);

  const searchTransactionsHandler = async () => {
    const queryParams: ITransactionSearchQuery = {
      transactionSourceId,
      dateFrom: startOfDay(new Date(formValue.dateFrom)).getTime?.(),
      dateTo: endOfDay(new Date(formValue.dateTo)).getTime?.(),
      categoryId: formValue.categoryId,
      subCategoryId: formValue.subCategoryId,
    };

    const ERROR_MSG =
      'Something went wrong. Failed to search the transactions.';
    try {
      setIsSearching(true);
      const {
        data: { success, result = [] },
      } = await getAllTransactions(queryParams);
      setTransactionList(result);
      setHasTransactions(result?.length > 0);

      if (!success) {
        displayFailToast(ERROR_MSG);
        setTransactionList([]);
      }

      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      setTransactionList([]);
      logError(error);
      displayFailToast(ERROR_MSG);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="m-3 flex flex-col gap-2 border px-3 py-2 rounded-xl">
        <CategoryField
          name="categoryId"
          label="Category"
          selectedOptionValue={formValue.categoryId}
          optionList={CATEGORIES}
          onChange={onChangeHandler}
        />
        <CategoryField
          name="subCategoryId"
          label="Sub-Category"
          selectedOptionValue={formValue.subCategoryId}
          optionList={subCategories}
          onChange={onChangeHandler}
        />
        <DateField
          name="dateFrom"
          label="Date From"
          timestampValue={formValue.dateFrom}
          onChange={onChangeHandler}
        />
        <DateField
          name="dateTo"
          label="Date To"
          timestampValue={formValue.dateTo}
          onChange={onChangeHandler}
        />
      </div>
      <div className="m-4">
        {hasTransactions === true && (
          <div className="my-1 text-color-no-primary-bg font-semibold">
            Transactions:
          </div>
        )}
        {hasTransactions === false && (
          <div className="my-6 text-color-no-primary-bg font-semibold">
            No transactions found.
          </div>
        )}
        {transactionList?.map(
          ({ uuid, date, categoryId, description, amount }) => (
            <TransactionItem
              uuid={uuid}
              key={uuid}
              date={date}
              categoryId={categoryId}
              description={description}
              amount={amount}
            />
          )
        )}
      </div>
      <Footer>
        <div className="p-3 w-full">
          <Button
            type={IButtonType.Submit}
            isBlock
            label="Search Transaction"
            onClickHandler={searchTransactionsHandler}
            isInProgress={isSearching}
          />
        </div>
      </Footer>
    </LocalizationProvider>
  );
};

export default SearchPage;
