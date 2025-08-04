import { useDispatch, useSelector } from 'react-redux';
import {
  resetState,
  registerUser,
  loginUser,
  logoutUser,
} from '../features/auth/authSlice';

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
  return { register, login, logout, reset };
};
