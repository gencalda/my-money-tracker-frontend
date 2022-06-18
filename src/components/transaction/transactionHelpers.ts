import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ITabButton } from 'components/TabButtonBar';
import { Routes } from 'shared/constants/routes';
import { IOptions } from 'shared/types/commonTypes';

const TAB_OPTIONS = {
  TODAY: 'Today',
  THIS_WEEK: 'This Week',
  THIS_MONTH: 'This Month',
};

export const TAB_LIST: IOptions[] = [
  {
    label: TAB_OPTIONS.TODAY,
    value: TAB_OPTIONS.TODAY,
  },
  {
    label: TAB_OPTIONS.THIS_WEEK,
    value: TAB_OPTIONS.THIS_WEEK,
  },
  {
    label: TAB_OPTIONS.THIS_MONTH,
    value: TAB_OPTIONS.THIS_MONTH,
  },
];

interface IDateQuery {
  dateTo: number;
  dateFrom: number;
}

export const generateQueryOnSelectedTab = (
  selectedTabValue: string
): IDateQuery => {
  switch (selectedTabValue) {
    case TAB_OPTIONS.TODAY: {
      return {
        dateFrom: startOfDay(new Date()).getTime(),
        dateTo: endOfDay(new Date()).getTime(),
      };
    }
    case TAB_OPTIONS.THIS_WEEK: {
      return {
        dateFrom: startOfWeek(new Date()).getTime(),
        dateTo: endOfWeek(new Date()).getTime(),
      };
    }
    case TAB_OPTIONS.THIS_MONTH: {
      return {
        dateFrom: startOfMonth(new Date()).getTime(),
        dateTo: endOfMonth(new Date()).getTime(),
      };
    }
    default: {
      return {
        dateFrom: 0,
        dateTo: 0,
      };
    }
  }
};

export const TRANSACTION_TAB_BUTTON_LIST: ITabButton[] = [
  {
    url: Routes.Transactions,
    icon: { iconLib: 'react-icons/io', iconName: 'IoMdList' },
  },
  {
    url: Routes.TransactionsNew,
    icon: { iconLib: 'react-icons/md', iconName: 'MdAdd' },
  },
  {
    url: Routes.TransactionsSearch,
    icon: { iconLib: 'react-icons/md', iconName: 'MdSearch' },
  },
];
