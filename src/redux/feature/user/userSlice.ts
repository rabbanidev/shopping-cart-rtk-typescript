/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { auth } from '@/lib/firbase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { ICredential, IUserState } from './interface';

export const createUser = createAsyncThunk(
  'users/createUser',
  async ({ email, password }: ICredential) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user.email;
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }: ICredential) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user.email;
  }
);

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  const response = await signOut(auth);
  return response;
});

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = null;
        state.error = action.error.message!;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = null;
        state.error = action.error.message!;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user.email = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = null;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
