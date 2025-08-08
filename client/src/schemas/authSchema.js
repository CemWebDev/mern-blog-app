import * as yup from 'yup';

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .max(20, 'Kullanıcı adı en fazla 20 karakter olmalı')
    .matches(usernameRegex, 'Sadece harf, rakam, . _ - kullanılabilir')
    .required('Kullanıcı adı zorunlu'),
  email: yup
    .string()
    .trim()
    .email('Geçerli bir e-posta girin')
    .required('E-posta zorunlu'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Geçerli bir e-posta girin')
    .required('E-posta zorunlu'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalı')
    .required('Şifre zorunlu'),
});
