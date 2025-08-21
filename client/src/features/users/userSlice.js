import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/userService';
import {
  logoutUser,
  setCredentials,
  loginUser,
  registerUser,
} from '../auth/authSlice';

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
  isUpdating: false,
  updateError: null,
};

export const fetchMe = createAsyncThunk(
  'users/fetchMe',
  async (_, thunkAPI) => {
    try {
      const user = await userService.getMe();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (data, thunkAPI) => {
    try {
      const user = await userService.updateMe(data);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isUpdating = false;
      state.updateError = null;
    },
    setProfileManually: (state, { payload }) => {
      state.profile = payload;
    },
    updateLikeCount: (state, { payload }) => {
      if (state.profile && typeof state.profile.likeCount === 'number') {
        state.profile.likeCount += payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.profile = payload;
      })
      .addCase(fetchMe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload || 'Failed to load profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isUpdating = false;
        state.profile = payload;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isUpdating = false;
        state.updateError = payload || 'Failed to update profile';
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(setCredentials, (state) => {
        state.profile = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.profile = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.profile = null;
        state.error = null;
      });
  },
});

export const { resetUserState, setProfileManually, updateLikeCount } =
  userSlice.actions;
export default userSlice.reducer;
