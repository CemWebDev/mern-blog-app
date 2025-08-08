import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../hooks/useAuth';
import { loginSchema, registerSchema } from '../schemas/authSchema';

export const useAuthForm = (type) => {
  const initialForm =
    type === 'login'
      ? { email: '', password: '' }
      : { username: '', email: '', password: '' };

  const [form, setForm] = useState(initialForm);
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
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
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
        const out = {};
        for (const v of err.inner) if (!out[v.path]) out[v.path] = v.message;
        setErrors(out);
      }
    }
  };

  return { form, errors, onChange, onSubmit, isLoading, isError, message };
};
