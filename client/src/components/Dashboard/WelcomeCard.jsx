import { useAuth } from '../../hooks/useAuth';
import Avatar from '../UI/Avatar/Avatar';

export default function WelcomeCard() {
  const { user } = useAuth();

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  const name = user?.name || user?.username || 'Kullanıcı';

  return (
    <div className="relative overflow-hidden rounded-lg border border-emerald-200/40 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 sm:p-8 shadow-sm">
      <div className="pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-emerald-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-teal-200/30 blur-2xl" />

      <div className="relative flex items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/60">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            {getCurrentGreeting()}
          </span>

          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Hoş geldin, <span className="text-emerald-700">{name}</span> 👋
          </h1>

          <p className="mt-2 text-gray-600">
            Yazılarını buradan yönetebilir, yeni içerik oluşturabilir ve
            profilini düzenleyebilirsin.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="grid place-items-center rounded-full bg-white/60 p-1 ring-1 ring-emerald-200/60 shadow-sm">
            <div className="rounded-full ring-2 ring-white shadow">
              <Avatar size={72} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
