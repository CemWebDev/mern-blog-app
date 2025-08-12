import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPost,
  fetchPosts,
  createNewPost,
  updatePost,
  deletePost,
  fetchPostLikeMeta,
  togglePostLike,
  resetPostsState,
} from '../features/posts/postSlice';

export const usePosts = () => {
  const {
    posts,
    post,
    isLoading,
    isError,
    isSuccess,
    message,
    hasMore,
    nextCursor,
    toggling,
  } = useSelector((state) => state.posts);

  const isToggling = (postId) => !!toggling?.[postId];

  return {
    posts,
    post,
    isLoading,
    isError,
    isSuccess,
    message,
    hasMore,
    nextCursor,
    isToggling,
  };
};

export const usePostActions = () => {
  const dispatch = useDispatch();

  const getPost = (id) => dispatch(fetchPost(id));
  const getPosts = (params) => dispatch(fetchPosts(params));
  const createPost = (postData) => dispatch(createNewPost(postData));
  const updateExistingPost = (id, postData) =>
    dispatch(updatePost({ id, data: postData }));
  const deleteExistingPost = (id) => dispatch(deletePost(id));

  const getPostLikeMeta = (postId) => dispatch(fetchPostLikeMeta(postId));
  const toggleLike = (postId, liked) =>
    dispatch(togglePostLike({ postId, liked }));

  const loadPostWithMeta = (postId) => {
    return Promise.all([
      dispatch(fetchPost(postId)),
      dispatch(fetchPostLikeMeta(postId)),
    ]);
  };

  const reset = () => dispatch(resetPostsState());

  return {
    getPost,
    getPosts,
    createPost,
    updateExistingPost,
    deleteExistingPost,
    reset,
    getPostLikeMeta,
    toggleLike,
    loadPostWithMeta,
  };
};
