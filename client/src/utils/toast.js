import { toast } from 'react-hot-toast';

const normalizeError = (err) =>
  typeof err === 'string'
    ? err
    : err?.response?.data?.message || err?.message || 'Bir hata oluştu';

export const toastSuccess = (message, options = {}) =>
  toast.success(message, { ...options });
export const toastError = (error, options = {}) =>
  toast.error(normalizeError(error), { ...options });

export const toastPromise = (
  promise,
  {
    loading = 'İşlem yapılıyor',
    success = 'Başarılı!',
    error = 'Bir hata oluştu',
    ...options
  } = {}
) =>
  toast.promise(promise, {
    loading,
    success,
    error: (err) => normalizeError(err) || error,
    ...options,
  });
