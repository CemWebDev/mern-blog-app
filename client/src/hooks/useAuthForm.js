import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../hooks/useAuth';

export const useAuthForm = (type) => {
  const initialForm =
    type === 'login'
      ? { email: '', password: '' }
      : { username: '', email: '', password: '' };

  const [form, setForm] = useState(initialForm);
  const { user, isLoading, isError, message } = useAuth();
  const { login, register, reset } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      login({ email: form.email, password: form.password });
    } else {
      register(form);
    }
  };

  return { form, onChange, onSubmit, isLoading, isError, message };
};
