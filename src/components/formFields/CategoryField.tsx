import { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import DynamicIcon from 'components/dynamicIcon/DynamicIcon';
import CategoryDropdown, {
  ICategoryChangeEvent,
} from 'components/formFields/CategoryDropdown';
import TransactionFormItem from 'components/transactionForm/TransactionFormItem';
import { ICategory } from 'shared/constants/categories';
import { getStringValue } from 'shared/helpers/common';
import { TypeFormErrorSetter } from 'shared/types/commonTypes';

interface ICategoryFieldProps {
  name: string;
  label: string;
  optionList: ICategory[];
  onChange: (event: { target: { name: string; value: string } }) => void;
  selectedOptionValue: string | number | null | undefined;
  isRequired?: boolean;
  setErrorMessage?: TypeFormErrorSetter;
  errorMessage?: string;
}

interface IRenderCategoryIconProps {
  iconLib: string;
  iconName: string;
}

const RenderCategoryIcon = ({
  iconLib,
  iconName,
}: IRenderCategoryIconProps) => {
  if (!iconLib || !iconName) {
    return <BiCategoryAlt />;
  }

  return <DynamicIcon iconLib={iconLib} iconName={iconName} />;
};

const CategoryField: React.FC<ICategoryFieldProps> = ({
  optionList,
  onChange,
  name,
  label,
  selectedOptionValue,
  setErrorMessage,
  errorMessage,
  isRequired = false,
}) => {
  const [localSelectedOption, setLocalSelectedOption] =
    useState<ICategory | null>(null);

  const onChangeHandler = ({
    target: { name: fieldName, value: selectedOption },
  }: ICategoryChangeEvent) => {
    onChange?.({
      target: { name: fieldName, value: getStringValue(selectedOption?.uuid) },
    });

    setLocalSelectedOption(selectedOption);

    if (!name) {
      return;
    }

    const REQUIRED_ERROR_MESSAGE = `${label || 'This field'} is required.`;
    const isValid = !isRequired || (isRequired && Boolean(selectedOption));
    setErrorMessage?.(fieldName, isValid, REQUIRED_ERROR_MESSAGE);
  };

  useEffect(() => {
    if (!selectedOptionValue) {
      setLocalSelectedOption(null);
      return;
    }

    setLocalSelectedOption(
      optionList?.find?.((category) => category.uuid === selectedOptionValue) ||
        null
    );
  }, [optionList, selectedOptionValue, setLocalSelectedOption]);

  return (
    <TransactionFormItem
      icon={
        <RenderCategoryIcon
          iconLib={getStringValue(localSelectedOption?.iconLib)}
          iconName={getStringValue(localSelectedOption?.iconName)}
        />
      }
      fieldComponent={
        <CategoryDropdown
          name={name}
          categoryList={optionList}
          label={label}
          value={localSelectedOption}
          onChange={onChangeHandler}
          errorMessage={errorMessage}
        />
      }
    />
  );
};

export default CategoryField;
