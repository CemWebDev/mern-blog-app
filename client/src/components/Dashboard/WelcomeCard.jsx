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

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getCurrentGreeting()},{' '}
            {user?.name || user?.username || 'Kullanıcı'}! 👋
          </h1>
          <p className="text-green-100 text-lg">
            Blog yazılarınızı yönetmek için dashboard'unuza hoş geldiniz.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
}
