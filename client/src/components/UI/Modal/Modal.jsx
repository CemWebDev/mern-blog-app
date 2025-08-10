import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Button from '../Button/Button';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Emin misiniz?',
  message = 'Bu işlem geri alınamaz.',
  confirmText = 'Evet',
  cancelText = 'İptal',
  variant = 'danger',
  isSubmitting = false, 
}) {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const HeaderIcon = isDanger ? AlertTriangle : CheckCircle2;
  const headerBg = isDanger
    ? 'from-rose-50 to-amber-50'
    : 'from-emerald-50 to-green-50';
  const iconBg = isDanger ? 'bg-rose-600' : 'bg-emerald-600';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Kapat"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className={`relative px-6 pt-6 pb-4 bg-gradient-to-r ${headerBg}`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/80 transition"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 ${iconBg} rounded-full grid place-items-center shadow`}
            >
              <HeaderIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-600 leading-relaxed text-[15px]">{message}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <Button
            variant="ghost"
            size="tall"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>

          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="tall"
            onClick={onConfirm}
            className="flex-1"
            isLoading={isSubmitting}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
