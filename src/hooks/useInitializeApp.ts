/* eslint-disable no-useless-return */
import { Auth } from 'aws-amplify';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setHashedCategoryIcons,
  setSelectedTransactionSource,
} from 'reducers/uiSlice';
import {
  setCurrentUserDetails,
  setTransactionSources,
} from 'reducers/userSlice';
import {
  createTransansactionSource,
  getAllTransansactionSources,
} from 'services/TransactionSourceService';
import { getHashedCategoryIcons, logError } from 'shared/helpers/common';

const rejectPromise = (reject: any, error: any) => {
  logError(error);
  reject(error);
};

const useInitializeApp = () => {
  const dispatch = useDispatch();

  const getCurrentUserDetails = useCallback(
    () =>
      new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser()
          .then(
            ({
              attributes: { email = '', name = '', sub = '' } = {},
              username,
            }) => {
              const data = {
                email,
                name,
                sub,
                username,
              };
              dispatch(
                setCurrentUserDetails({
                  ...data,
                })
              );
              resolve({ ...data });
            }
          )
          .catch((error) => {
            rejectPromise(reject, error);
          });
      }),
    [dispatch]
  );

  const processTransactionSource = useCallback(
    () =>
      new Promise((resolve, reject) => {
        getAllTransansactionSources()
          .then(
            ({ data: { result: transactionSources = [], success } = {} }) => {
              if (!success) {
                reject(new Error('Failed to fetch transaction sources.'));
                return;
              }

              if (transactionSources?.length > 0) {
                dispatch(setSelectedTransactionSource(transactionSources[0]));
                dispatch(setTransactionSources(transactionSources));

                resolve('Transaction source has been selected.');
                return;
              }

              createTransansactionSource({ name: 'name' })
                .then(
                  ({ data: { result: newTransactionSource = {} } = {} }) => {
                    dispatch(
                      setSelectedTransactionSource(newTransactionSource)
                    );
                    dispatch(setTransactionSources([newTransactionSource]));

                    resolve(
                      'New transaction source has been created and selected.'
                    );
                  }
                )
                .catch((error) => {
                  rejectPromise(reject, error);
                });
            }
          )
          .catch((error) => {
            rejectPromise(reject, error);
          });
      }),
    [dispatch]
  );

  const setCategoryIcons = useCallback(async () => {
    const categoryIcons = await getHashedCategoryIcons();
    dispatch(setHashedCategoryIcons(categoryIcons));
  }, [dispatch]);

  const initializeApp = useCallback(
    () =>
      new Promise((resolve, reject) => {
        Promise.all([
          getCurrentUserDetails(),
          processTransactionSource(),
          setCategoryIcons(),
        ])
          .then(() => {
            resolve({ isAppInitialized: true });
          })
          .catch((error) => {
            rejectPromise(reject, error);
          });
      }),
    [getCurrentUserDetails, processTransactionSource, setCategoryIcons]
  );

  return {
    initializeApp,
  };
};

export default useInitializeApp;
