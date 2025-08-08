import * as yup from 'yup';

export const postSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Başlık zorunlu')
    .min(3, 'Başlık en az 3 karakter olmalı')
    .max(120, 'Başlık en fazla 120 karakter olabilir'),
  content: yup
    .string()
    .trim()
    .required('İçerik zorunlu')
    .min(10, 'İçerik en az 10 karakter olmalı'),
});
