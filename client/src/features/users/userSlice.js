import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../services/userService';

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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      });
  },
});

export const { resetUserState, setProfileManually } = userSlice.actions;
export default userSlice.reducer;
