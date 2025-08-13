import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../features/users/userSlice';
import { useAuth } from '../hooks/useAuth';

export default function AuthGate({ children }) {
  const dispatch = useDispatch();

  const { token } = useAuth();
  const profile = useSelector((state) => state.users.profile);
  const loading = useSelector((state) => state.users.isLoading);

  const requestedRef = useRef(false);
  const lastTokenRef = useRef(token);

  useEffect(() => {
    if (lastTokenRef.current !== token) {
      requestedRef.current = false;
      lastTokenRef.current = token;
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    if (profile || loading) return;

    if (requestedRef.current) return;
    requestedRef.current = true;
    dispatch(fetchMe());
  }, [token, profile, loading, dispatch]);

  return children;
}
