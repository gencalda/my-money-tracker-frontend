import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from 'shared/constants/categories';
import { isNullish } from 'shared/helpers/common';
import { ITransactionSource } from 'shared/types/transactionSourceTypes';

export interface UiState {
  routeHistory: string[];
  footerHeight?: number;
  toolbarHeight?: number;
  hashedCategoryIcons: Record<string, ICategory>;
  errorMessageDisplay?: string;
  selectedTransactionSource: ITransactionSource;
  isAppInitialized: boolean;
}

const initialState: UiState = {
  routeHistory: [],
  footerHeight: 0,
  toolbarHeight: 0,
  hashedCategoryIcons: {},
  errorMessageDisplay: '',
  selectedTransactionSource: {} as ITransactionSource,
  isAppInitialized: false,
};

interface RouteInfo {
  routeIndex: number | undefined;
  routePath: string;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addRouteHistory: (reduxState, action: PayloadAction<string>) => {
      if (!action.payload) {
        return;
      }
      const currentRouteHistory = [...reduxState.routeHistory];
      const prevRoute = currentRouteHistory.pop();
      if (prevRoute !== action.payload) {
        reduxState.routeHistory.push(action.payload);
      }
    },
    removeRouteHistory: (reduxState, action: PayloadAction<RouteInfo>) => {
      if (
        !action.payload ||
        !action?.payload?.routeIndex ||
        !action?.payload?.routePath
      ) {
        return;
      }
      const currentRouteHistory = [...reduxState.routeHistory];
      if (
        currentRouteHistory[action.payload.routeIndex] ===
        action.payload.routePath
      ) {
        const actualRoute = [...currentRouteHistory].slice(
          0,
          action.payload.routeIndex
        );
        reduxState.routeHistory = actualRoute;
      }
    },
    setFooterHeight: (
      reduxState,
      action: PayloadAction<number | undefined>
    ) => {
      if (!isNullish(action.payload)) {
        reduxState.footerHeight = action.payload;
      }
    },
    setToolbarHeight: (
      reduxState,
      action: PayloadAction<number | undefined>
    ) => {
      if (!isNullish(action.payload)) {
        reduxState.toolbarHeight = action.payload;
      }
    },
    setHashedCategoryIcons: (
      reduxState,
      action: PayloadAction<Record<string, ICategory>>
    ) => {
      reduxState.hashedCategoryIcons = action.payload;
    },
    setErrorMessageDisplay: (
      reduxState,
      { payload }: PayloadAction<string>
    ) => {
      reduxState.errorMessageDisplay = payload;
    },
    setSelectedTransactionSource: (
      reduxState,
      { payload }: PayloadAction<ITransactionSource>
    ) => {
      reduxState.selectedTransactionSource = payload;
    },
    setIsAppInitialized: (reduxState, { payload }: PayloadAction<boolean>) => {
      reduxState.isAppInitialized = payload;
    },
  },
});

export const {
  addRouteHistory,
  removeRouteHistory,
  setFooterHeight,
  setToolbarHeight,
  setHashedCategoryIcons,
  setErrorMessageDisplay,
  setSelectedTransactionSource,
  setIsAppInitialized,
} = uiSlice.actions;

export default uiSlice.reducer;
