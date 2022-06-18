import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from 'components/Footer';
import LoadingSpinner from 'components/LoadingSpinner';
import TabButtonBar from 'components/TabButtonBar';
import TabSelector from 'components/TabSelector';
import TransactionItem from 'components/transaction/TransactionItem';
import {
  generateQueryOnSelectedTab,
  TAB_LIST,
  TRANSACTION_TAB_BUTTON_LIST,
} from 'components/transaction/transactionHelpers';
import useSpinner from 'hooks/useSpinner';
import { RootState } from 'reducers/store';
import { getAllTransactions } from 'services/TransactionService';
import { logError } from 'shared/helpers/common';
import { displayFailToast } from 'shared/helpers/toast';
import { ITransaction } from 'shared/types/transactionTypes';

const TransactionsPage: React.FC = () => {
  const { selectedTransactionSource: { uuid: transactionSourceId = '' } = {} } =
    useSelector((state: RootState) => state.ui);
  const [transactionList, setTransactionList] = useState<ITransaction[]>();
  const [selectedTabOption, setSelectedTabOption] = useState(TAB_LIST[0]);
  const [filterLabel, setFilterLabel] = useState('');
  const [isFetchingData, toggleSpinner] = useSpinner(false);

  const fetchTransactions = useCallback(
    async (selectedTabOptionValue) => {
      const FETCH_ERROR_MESSAGE =
        'Something went wrong when fetching your transactions.';
      try {
        toggleSpinner(true);
        const { data: { result = [], success = false } = {} } =
          await getAllTransactions({
            transactionSourceId,
            ...generateQueryOnSelectedTab(selectedTabOptionValue),
          });

        if (!success) {
          displayFailToast(FETCH_ERROR_MESSAGE);
          return;
        }

        setTransactionList(result);
        toggleSpinner(false);
      } catch (error) {
        logError(error);
        displayFailToast(FETCH_ERROR_MESSAGE);
        toggleSpinner(false);
      }
    },
    [transactionSourceId, toggleSpinner]
  );

  useEffect(() => {
    if (!selectedTabOption?.label || !selectedTabOption?.value) {
      return;
    }

    fetchTransactions(selectedTabOption?.value);
    setFilterLabel(`for ${selectedTabOption?.label} `.toLowerCase());
  }, [fetchTransactions, selectedTabOption]);

  return (
    <>
      <TabSelector
        containerClassName="mx-4 mt-2 mb-6 rounded-lg bg-secondary"
        selectedTabValue={selectedTabOption?.value}
        tabList={TAB_LIST}
        onTabSelect={({ value, label }) =>
          setSelectedTabOption({ value, label })
        }
      />

      {isFetchingData ? (
        <LoadingSpinner />
      ) : (
        <div
          className={classnames('mx-4 mt-3', {
            'h-[96%]': transactionList?.length === 0,
          })}
        >
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
          {transactionList?.length === 0 && (
            <div className="h-[80%] flex flex-col items-center justify-center">
              <div className="text-color-no-primary-bg text-xl font-semibold">
                No transactions {filterLabel}yet.
              </div>
              <div className="text-sm text-color-label">
                Click the add button below to create a transaction.
              </div>
            </div>
          )}
        </div>
      )}

      <Footer>
        <TabButtonBar tabButtonList={TRANSACTION_TAB_BUTTON_LIST} />
      </Footer>
    </>
  );
};

export default TransactionsPage;
