export interface IError {
  name: string;
  code: string;
  message: string;
}

export const GENERIC_ERROR_MSG = 'Something went wrong. Please try again.';

export const ErrorCode = {
  UserNotConfirmedException: 'UserNotConfirmedException',
  NotAuthorizedException: 'NotAuthorizedException',
  CodeMismatchException: 'CodeMismatchException',
  UsernameExistsException: 'UsernameExistsException',
  AliasExistsException: 'AliasExistsException',
  ExpiredCodeException: 'ExpiredCodeException',
  LimitExceededException: 'LimitExceededException',
};

export const errorMessageOnCode: Record<string, string> = {
  [ErrorCode.UserNotConfirmedException]: 'User is not confirmed.',
  [ErrorCode.NotAuthorizedException]:
    'Username / Email or Password is incorrect.',
  [ErrorCode.CodeMismatchException]:
    'Invalid verification code provided, please try again.',
  [ErrorCode.UsernameExistsException]: 'Username is already taken.',
  [ErrorCode.AliasExistsException]:
    'A verified account with that email address already exists.',
  [ErrorCode.ExpiredCodeException]:
    'Verification code has expired, please try again.',
  [ErrorCode.LimitExceededException]:
    'Attempt limit exceeded, please try after some time.',
};
