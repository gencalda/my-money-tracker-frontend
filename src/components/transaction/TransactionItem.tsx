import { MdChevronRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DynamicIcon from 'components/dynamicIcon/DynamicIcon';
import { RootState } from 'reducers/store';
import { DATE_YEAR } from 'shared/constants/common';
import { Routes } from 'shared/constants/routes';
import { formatDate, formatNumber } from 'shared/helpers/common';
import Badge from '../Badge';

interface Props {
  date: number;
  uuid: string;
  categoryId: string;
  description?: string | null;
  amount: number;
}

const TransactionItem: React.FC<Props> = ({
  uuid,
  date,
  categoryId,
  description = '',
  amount,
}) => {
  const { hashedCategoryIcons } = useSelector((state: RootState) => state.ui);
  const {
    label,
    iconName,
    iconLib,
    mainCategoryId = '',
  } = hashedCategoryIcons[categoryId];

  return (
    <div className="border-[2.5px] border-solid border-secondary  p-2 rounded-lg mb-4">
      <Link className="flex" to={`${Routes.Transactions}/${uuid}`}>
        <div className="grow">
          <div className="font-semibold text-sm text-color-label">
            {formatDate(date, DATE_YEAR)}
          </div>
          <div className="flex flex-wrap">
            <div className="flex items-center mr-2">
              <div className="font-bold text-primary text-lg mr-1">
                <DynamicIcon iconLib={iconLib} iconName={iconName} />
              </div>
              <div className="font-semibold text-color-no-primary-bg mt-1">
                {label}
              </div>
            </div>
            {hashedCategoryIcons?.[mainCategoryId]?.label && (
              <div className="mt-1">
                <Badge
                  label={hashedCategoryIcons?.[mainCategoryId]?.label || ''}
                />
              </div>
            )}
          </div>
          <div className="text-sm line-clamp-2 text-color-no-primary-bg">
            {description}
          </div>
        </div>
        <div className="font-semibold flex flex-col">
          <div className="text-color-no-primary-bg">{formatNumber(amount)}</div>
          <div className="text-color-label h-full flex flex-col justify-end items-end">
            <MdChevronRight />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TransactionItem;
