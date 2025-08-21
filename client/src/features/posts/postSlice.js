import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsService from '../../services/postsService';
import { updateLikeCount } from '../users/userSlice';

const initialState = {
  posts: [],
  likedPosts: [],
  nextCursor: null,
  hasMore: false,
  isLoading: false,
  isLoadingMore: false,
  isError: false,
  isSuccess: false,
  message: '',
  toggling: {},
  optimisticBackup: {},
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

export const fetchPostLikeMeta = createAsyncThunk(
  'posts/fetchPostLikeMeta',
  async (postId, thunkAPI) => {
    try {
      const data = await postsService.getPostLikeMeta(postId);
      return { postId, ...data };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const togglePostLike = createAsyncThunk(
  'posts/togglePostLike',
  async ({ postId, liked }, { dispatch, rejectWithValue }) => {
    try {
      if (liked) {
        await postsService.unlikePost(postId);
        dispatch(updateLikeCount(-1));
      } else {
        await postsService.likePost(postId);
        dispatch(updateLikeCount(+1));
      }
      await dispatch(fetchPostLikeMeta(postId));
      return { postId };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  },
  {
    condition: ({ postId }, { getState }) => {
      const { toggling } = getState().posts;
      return !toggling[postId];
    },
  }
);

export const fetchLikedPosts = createAsyncThunk(
  'posts/fetchLikedPosts',
  async (_, thunkAPI) => {
    try {
      return await postsService.getLikedPosts();
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

      .addCase(fetchPost.pending, (state, action) => {
        state.isLoading = true;
        const id = action.meta.arg;
        const cached =
          (state.post && state.post._id === id && state.post) ||
          state.posts.find((p) => p._id === id);
        if (cached) {
          state.post = { ...cached };
        }
      })
      .addCase(fetchPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;

        const prev =
          (state.post && state.post._id === payload._id && state.post) ||
          state.posts.find((p) => p._id === payload._id);

        const likeCount =
          typeof prev?.likeCount === 'number'
            ? prev.likeCount
            : payload.likeCount;
        const liked =
          typeof prev?.liked === 'boolean' ? prev.liked : payload.liked;

        state.post = { ...payload, likeCount, liked };
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
      })
      .addCase(fetchPostLikeMeta.fulfilled, (state, { payload }) => {
        const { postId, likeCount, liked } = payload;
        const idx = state.posts.findIndex((p) => p._id === postId);
        if (idx !== -1) {
          state.posts[idx] = { ...state.posts[idx], likeCount, liked };
        }
        if (state.post && state.post._id === postId) {
          state.post = { ...state.post, likeCount, liked };
        }
        const likedIdx = state.likedPosts.findIndex((p) => p._id === postId);
        if (likedIdx !== -1) {
          if (liked) {
            state.likedPosts[likedIdx] = {
              ...state.likedPosts[likedIdx],
              likeCount,
              liked,
            };
          } else {
            state.likedPosts = state.likedPosts.filter((p) => p._id !== postId);
          }
        } else if (liked) {
          const fromPosts = state.posts.find((p) => p._id === postId);
          if (fromPosts) {
            state.likedPosts.unshift({ ...fromPosts, likeCount, liked });
          }
        }
      })
      .addCase(fetchPostLikeMeta.rejected, (state, { payload }) => {
        state.message = payload;
      })
      .addCase(togglePostLike.pending, (state, { meta }) => {
        const { postId, liked } = meta.arg;
        state.toggling[postId] = true;

        const inList = state.posts.find((p) => p._id === postId);
        const inDetail =
          state.post && state.post._id === postId ? state.post : null;

        const getSafe = (p) => ({
          liked: !!p?.liked,
          likeCount: typeof p?.likeCount === 'number' ? p.likeCount : 0,
        });
        const backup = (inList && getSafe(inList)) ||
          (inDetail && getSafe(inDetail)) || { liked: false, likeCount: 0 };
        state.optimisticBackup[postId] = backup;

        const applyOptimistic = (p) => {
          if (!p) return p;
          const count = typeof p.likeCount === 'number' ? p.likeCount : 0;
          return {
            ...p,
            liked: !liked,
            likeCount: liked ? Math.max(0, count - 1) : count + 1,
          };
        };

        if (inList) {
          state.posts = state.posts.map((p) =>
            p._id === postId ? applyOptimistic(p) : p
          );
        }
        if (inDetail) {
          state.post = applyOptimistic(inDetail);
        }

        state.likedPosts = state.likedPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                liked: !liked,
                likeCount: liked
                  ? Math.max(0, (p.likeCount ?? 0) - 1)
                  : (p.likeCount ?? 0) + 1,
              }
            : p
        );
        if (liked) {
          state.likedPosts = state.likedPosts.filter((p) => p._id !== postId);
        }
      })
      .addCase(togglePostLike.fulfilled, (state, { meta }) => {
        const { postId } = meta.arg;
        delete state.toggling[postId];
        delete state.optimisticBackup[postId];
      })
      .addCase(togglePostLike.rejected, (state, { meta, payload }) => {
        const { postId } = meta.arg;
        const backup = state.optimisticBackup[postId];
        const rollback = (p) => (p ? { ...p, ...backup } : p);
        const idx = state.posts.findIndex((p) => p._id === postId);
        if (idx !== -1) state.posts[idx] = rollback(state.posts[idx]);
        if (state.post && state.post._id === postId)
          state.post = rollback(state.post);

        delete state.toggling[postId];
        delete state.optimisticBackup[postId];

        state.isError = true;
        state.message = payload;
      })
      .addCase(fetchLikedPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLikedPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likedPosts = action.payload;
      })
      .addCase(fetchLikedPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPostsState } = postsSlice.actions;
export default postsSlice.reducer;
