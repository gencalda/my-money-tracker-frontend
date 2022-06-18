import { format as dateFormat, isValid as isValidDate } from 'date-fns';
import { CATEGORIES, ICategory } from 'shared/constants/categories';
import { DATE_YEAR_TIME, DECIMAL_PLACE } from 'shared/constants/common';
import { errorMessageOnCode, GENERIC_ERROR_MSG } from 'shared/constants/errors';
import { SUB_CATEGORIES } from 'shared/constants/subcategories';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';

export const isNullish = <T>(value: T) => value === undefined || value === null;
export const getNumberValue = (value: number | undefined): number => value || 0;
export const getStringValue = (value: string | undefined | null): string =>
  value ? `${value}` : '';
export const convertStringNumberToNumber = (numberString: string): number => {
  const numberValue = `${numberString || 0}`.replace(/[^0-9.]/g, '');
  return Number(numberValue);
};

export const getHashedCategoryIcons = () =>
  new Promise<Record<string, ICategory>>((resolve) => {
    const categoryIconHash: Record<string, ICategory> = {};

    CATEGORIES.forEach((category) => {
      categoryIconHash[category.uuid] = { ...category };
    });

    SUB_CATEGORIES.forEach((subCategory) => {
      categoryIconHash[subCategory.uuid] = { ...subCategory };
    });

    resolve(categoryIconHash);
  });

export const logError = (error: Error) => {
  console.error('An error occured: ', error);
};

export const formatDate = (
  timestamp: number,
  format = DATE_YEAR_TIME,
  defaultValue: any = '-'
): string => {
  if (!timestamp || (timestamp && !isValidDate(new Date(timestamp)))) {
    return defaultValue;
  }

  return dateFormat(new Date(timestamp), format);
};

export const formatNumber = (numberValue: number | string): string => {
  const actualValue = convertStringNumberToNumber(`${numberValue}`);

  let displayValue = '';
  if (!Number.isNaN(actualValue)) {
    displayValue = actualValue.toFixed(DECIMAL_PLACE);
    displayValue = new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(Number(displayValue));
  }

  return displayValue;
};

export const isObjectHasValue = <T>(objectData: T): boolean => {
  if (!objectData || (objectData && Object.keys(objectData)?.length < 1)) {
    return false;
  }

  /* eslint-disable no-restricted-syntax */
  for (const [, value] of Object.entries(objectData)) {
    if (value) {
      return true;
    }
  }
  /* eslint-enable no-restricted-syntax */

  return false;
};

export const validateRequiredFields = <T>(
  formFieldsConfig: T,
  formErrorSetter: TypeFormErrorSetter
): boolean => {
  let isFormValid = true;

  if (!formFieldsConfig) {
    return false;
  }

  /* eslint-disable no-restricted-syntax */
  for (const [, { isRequired, value, label, fieldName }] of Object.entries(
    formFieldsConfig
  )) {
    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isFieldValid = !isRequired || Boolean(isRequired && value);

    formErrorSetter(fieldName, isFieldValid, REQUIRED_ERROR_MESSAGE);

    if (!isFieldValid) {
      isFormValid = false;
    }
  }
  /* eslint-enable no-restricted-syntax */

  return isFormValid;
};

export const getErrorMessageOnCode = (code: string): string =>
  errorMessageOnCode?.[code] || GENERIC_ERROR_MSG;

export const isPasswordValueValid = (password = ''): boolean => {
  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[0-9]/.test(password)) {
    return false;
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }

  return true;
};
