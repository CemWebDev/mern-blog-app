import * as authService from '../../services/authService.js';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  message: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authService.logout();
});

export const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',

  async ({ file, token }, thunkAPI) => {
    try {
      const { avatarUrl } = await authService.uploadAvatar(file, token);
      return avatarUrl;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
    setCredentials: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.user = jwtDecode(token);
      state.isError = false;
      state.isLoading = false;
      state.message = '';
      localStorage.setItem('token', token);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        authSlice.caseReducers.setCredentials(state, {
          payload: payload.token,
        });
        if (payload.user) {
          state.user = { ...state.user, ...payload.user };
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        authSlice.caseReducers.setCredentials(state, {
          payload: payload.token,
        });
        if (payload.user) {
          state.user = { ...state.user, ...payload.user };
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (state.user) state.user.avatarUrl = payload;
      })
      .addCase(uploadAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
  },
});

export const { resetState, setCredentials } = authSlice.actions;
export default authSlice.reducer;
