export const TRANSACTION_TAB = 'transaction_tab';
export const SEARCH_TRANSACTION_TAB = 'search_transaction_tab';

export const DECIMAL_PLACE = 2;

// date-fns formats
export const DATE_YEAR_TIME = 'EEE, dd MMM yyyy hh:mm aaa';
export const DATE_YEAR = 'EEE, dd MMM yyyy';

export enum SignUpStage {
  SignUp = 'SignUp',
  Verify = 'Verify',
  EmailExistsError = 'EmailExistsError',
}

export enum ForgotPasswordStage {
  Verify = 'Verify',
  ChangePassword = 'ChangePassword',
}
