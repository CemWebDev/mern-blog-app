import { useDispatch, useSelector } from 'react-redux';
import {
  resetState,
  registerUser,
  loginUser,
  logoutUser,
  setCredentials,
  uploadAvatar

} from '../features/auth/authSlice';
import { signWithGithub as GitHub } from '../services/authService';

export const useAuth = () => {
  const { token, user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  return { token, user, isLoading, isError, message };
};

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const register = (userData) => dispatch(registerUser(userData));
  const login = (credentials) => dispatch(loginUser(credentials));
  const logout = () => dispatch(logoutUser());
  const reset = () => dispatch(resetState());
  const setAvatar = (file, token) => dispatch(uploadAvatar({ file, token }));


  const signWithGithub = () => {
    GitHub();
  };

  const applyCredentials = (token) => dispatch(setCredentials(token));
  return { register, login, logout, reset, signWithGithub, applyCredentials, setAvatar };
};
