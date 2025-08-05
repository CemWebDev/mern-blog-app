import { Link } from 'react-router-dom';
import { AtSign, Lock, User, Github } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthLayout from '../layouts/AuthLayout';
import AuthFields from '../components/Auth/AuthFields';

export default function Login() {
  const {
    form,
    onChange,
    onSubmit,
    isLoading,
    isError,
    message,
  } = useAuthForm('login');



  const handleSocialLogin = () => {};

  return (
    <AuthLayout
      title="Giriş Yap"
      onSocialClick={handleSocialLogin}
      bottomText="Hesabınız yok mu?"
      bottomLinkText="Buradan oluşturun"
      bottomLinkTo="/register"
      noteText="Giriş yaparak Hizmet Şartları ve Gizlilik Politikası’nı kabul edersiniz"
    >
      <AuthFields
        fields={[
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Mail adresinizi girin',
            Icon: AtSign,
          },
          {
            name: 'password',
            label: 'Şifre',
            type: 'password',
            placeholder: 'Şifrenizi girin',
            Icon: Lock,
            showToggle: true,
          },
        ]}
        submitLabel="Giriş Yap"
        isLoading={isLoading}
        onSubmit={onSubmit}
        onChange={onChange}
        formValues={form}
      />

      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-green-600 hover:text-green-700 hover:underline"
        >
          Şifremi Unuttum?
        </Link>
      </div>
    </AuthLayout>
  );
}
