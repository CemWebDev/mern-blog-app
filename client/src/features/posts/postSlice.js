import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsService from '../../services/postsService';

const initialState = {
  posts: [],
  nextCursor: null,
  hasMore: false,
  isLoading: false,
  isLoadingMore: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params, thunkAPI) => {
    try {
      const posts = await postsService.getPosts(params);
      return { ...posts, append: Boolean(params?.cursor) };
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
  'posts/updateExistingPost',
  async ({ id, data }, thunkAPI) => {
    try {
      const post = await postsService.updatePost(id, data);
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
      .addCase(fetchPosts.pending, (state, action) => {
        const append = Boolean(action.meta.arg?.cursor);
        if (append) state.isLoadingMore = true;
        else state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.isSuccess = true;
        const { items, nextCursor, hasMore, append } = payload;
        state.nextCursor = nextCursor;
        state.hasMore = hasMore;
        state.posts = append ? [...state.posts, ...items] : items;
        if (append) {
          const byId = new Map(state.posts.map((p) => [p._id, p]));
          for (const it of items) byId.set(it._id, it);
          state.posts = Array.from(byId.values());
        } else {
          const seen = new Set();
          state.posts = items.filter((it) =>
            seen.has(it._id) ? false : (seen.add(it._id), true)
          );
        }
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isLoadingMore = false;
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
        state.post = payload;
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
