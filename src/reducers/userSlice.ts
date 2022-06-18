import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITransactionSource } from 'shared/types/transactionSourceTypes';

export interface ICurrentUser {
  email: string;
  name: string;
  sub: string; // userId
  username: string;
}

interface ISessionTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

interface IUserSlice {
  currentUser: ICurrentUser;
  transactionSources: ITransactionSource[];
  currentUserSession: ISessionTokens | Record<string, any>;
}

const initialState: IUserSlice = {
  currentUser: {
    email: '',
    name: '',
    sub: '',
    username: '',
  },
  transactionSources: [],
  currentUserSession: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUserDetails: (
      reduxState,
      { payload }: PayloadAction<ICurrentUser>
    ) => {
      reduxState.currentUser = payload;
    },
    setTransactionSources: (
      reduxState,
      { payload }: PayloadAction<ITransactionSource[]>
    ) => {
      reduxState.transactionSources = payload;
    },
    setCurrentUserSession: (
      reduxState,
      { payload = {} }: PayloadAction<ISessionTokens | Record<string, any>>
    ) => {
      reduxState.currentUserSession = payload;
    },
  },
});

export const {
  setCurrentUserDetails,
  setTransactionSources,
  setCurrentUserSession,
} = userSlice.actions;
export default userSlice.reducer;
