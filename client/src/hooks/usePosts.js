import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPost,
  fetchPosts,
  createNewPost,
  updatePost,
  deletePost,
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
  } = useSelector((state) => state.posts);

  return {
    posts,
    post,
    isLoading,
    isError,
    isSuccess,
    message,
    hasMore,
    nextCursor,
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

  return {
    getPost,
    getPosts,
    createPost,
    updateExistingPost,
    deleteExistingPost,
  };
};
