import * as yup from 'yup';

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Kullanıcı adı zorunlu')
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .max(20, 'Kullanıcı adı en fazla 20 karakter olmalı')
    .matches(usernameRegex, 'Sadece harf, rakam, . _ - kullanılabilir'),
  email: yup
    .string()
    .trim()
    .required('E-posta zorunlu')
    .email('Geçerli bir e-posta girin'),
  password: yup
    .string()
    .required('Şifre zorunlu')
    .min(6, 'Şifre en az 6 karakter olmalı'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('E-posta zorunlu')
    .email('Geçerli bir e-posta girin'),
  password: yup
    .string()
    .required('Şifre zorunlu')
    .min(6, 'Şifre en az 6 karakter olmalı'),
});
