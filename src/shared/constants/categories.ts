import { ITransactionType } from 'shared/types/transactionTypes';

export const ICONS_MD = 'react-icons/md';
export const ICONS_FA = 'react-icons/fa';
export const ICONS_GI = 'react-icons/gi';

export const BILL_ID = '685dcffb-4df7-426a-b656-b5594838c2cc';
export const EDUCATION_ID = 'ef8a9a5f-26b5-4ea1-b9f2-b4a0dcaaa17a';
export const ENTERTAINMENT_ID = '9180dfe8-db51-4af4-a2d7-b4d390cf2361';
export const FOOD_ID = '0060af3b-ef3c-4503-8174-824647037aa7';
export const TRANSPORTATION_ID = '88fb9beb-7c80-4461-acaa-d09fc14692c0';
export const INVESTMENT_ID = 'e8582b22-28d6-40ef-81cb-3cd7b2dd8be0';
export const INSURANCE_ID = '90f6e356-41d6-43d9-9702-43c45b234c8f';
export const SHOPPING_ID = 'c52adecb-4c49-4fbc-81e8-d2d12b4021d8';

export interface ICategory {
  uuid: string;
  createdAt: number;
  mainCategoryId?: string;
  label: string;
  iconName: string;
  iconLib: string;
  type: ITransactionType;
}

export const CATEGORIES: ICategory[] = [
  {
    uuid: BILL_ID,
    label: 'Bills & Utilities',
    iconName: 'BiReceipt',
    iconLib: 'react-icons/bi',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: EDUCATION_ID,
    label: 'Education',
    iconName: 'FaGraduationCap',
    iconLib: ICONS_FA,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: ENTERTAINMENT_ID,
    label: 'Entertainment',
    iconName: 'IoGameControllerOutline',
    iconLib: 'react-icons/io5',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: '9ed7a2f3-f835-41fa-9716-6e713c2b2176',
    label: 'Family',
    iconName: 'FaHome',
    iconLib: ICONS_FA,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: '9dc2e5ff-ffdc-4a74-9f49-69945b2a4d15',
    label: 'Friend & Lover',
    iconName: 'GiHearts',
    iconLib: ICONS_GI,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: FOOD_ID,
    label: 'Food & Beverage',
    iconName: 'MdFastfood',
    iconLib: ICONS_MD,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: '353ebf33-cddf-4047-9618-ae5c98b5fa03',
    label: 'Gifts and Donations',
    iconName: 'IoMdGift',
    iconLib: 'react-icons/io',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: 'dfd0db92-cdd8-47d1-9721-e379a28f9cc6',
    label: 'Health & Fitness',
    iconName: 'RiFirstAidKitFill',
    iconLib: 'react-icons/ri',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: TRANSPORTATION_ID,
    label: 'Transportation',
    iconName: 'MdDirectionsCar',
    iconLib: ICONS_MD,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: '52b80275-2ab4-44f0-8fb6-1e4d47020b04',
    label: 'Travel',
    iconName: 'MdAirplanemodeActive',
    iconLib: ICONS_MD,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: INVESTMENT_ID,
    label: 'Investment',
    iconName: 'BsGraphUp',
    iconLib: 'react-icons/bs',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: INSURANCE_ID,
    label: 'Insurance',
    iconName: 'AiOutlineSafety',
    iconLib: 'react-icons/ai',
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
  {
    uuid: SHOPPING_ID,
    label: 'Shopping',
    iconName: 'FaShoppingBag',
    iconLib: ICONS_FA,
    createdAt: new Date().getTime(),
    type: ITransactionType.Expense,
  },
];
