import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../hooks/useAuth';
import { loginSchema, registerSchema } from '../schemas/authSchema';
import { toastSuccess, toastError } from '../utils/toast';
import * as yup from 'yup';

export const useAuthForm = (type) => {
  const initialForm =
    type === 'login'
      ? { email: '', password: '' }
      : { username: '', email: '', password: '' };

  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [errors, setErrors] = useState({});
  const { user, isLoading, isError, message } = useAuth();
  const { login, register, reset } = useAuthActions();
  const navigate = useNavigate();

  const schema = useMemo(
    () => (type === 'register' ? registerSchema : loginSchema),
    [type]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (isError && message) toastError(message);
  }, [isError, message]);

  useEffect(() => {
    if (user) {
      toastSuccess(`Hoş geldin, ${user.username || 'kullanıcı'}!`);
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name])
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const order =
      type === 'login'
        ? ['email', 'password']
        : ['username', 'email', 'password'];

    try {
      for (const key of order) {
        const fieldSchema = yup.reach(schema, key);
        await fieldSchema.validate(form[key], { abortEarly: true });
      }

      if (type === 'login') {
        login({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });
      } else {
        register({
          username: form.username.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const msg = err.errors?.[0] || err.message || 'Formu kontrol edin.';
        toastError(msg);
        return;
      }
      toastError(err);
    }
  };

  return {
    form,
    errors,
    onChange,
    onSubmit,
    isLoading,
    isError,
    message,
    fieldErrors,
  };
};
