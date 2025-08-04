import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsService from '../../services/postsService';

const initialState = {
  posts: [],
  post: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const posts = await postsService.getPosts();
      return posts;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, thunkAPI) => {
    try {
      const post = await postsService.getPost(id);
      return post;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async (postData, thunkAPI) => {
    try {
      const post = await postsService.createPost(postData);
      return post;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updateExisitingPost',
  async ({ id, ...postData }, thunkAPI) => {
    try {
      const post = await postsService.updatePost(id, postData);
      return post;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      await postsService.deletePost(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostsState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = payload;
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = payload;
      })
      .addCase(fetchPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(payload);
      })
      .addCase(createNewPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((p) =>
          p._id === payload._id ? payload : p
        );
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter((p) => p._id !== payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { resetPostsState } = postsSlice.actions;
export default postsSlice.reducer;
