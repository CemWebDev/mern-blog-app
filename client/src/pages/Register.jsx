import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, AtSign, Lock } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthLayout from '../layouts/AuthLayout';
import AuthFields from '../components/Auth/AuthFields';
import { useAuthActions } from '../hooks/useAuth';

export default function RegisterPage() {
  const { form, onChange, onSubmit, isLoading, isError, message } =
    useAuthForm('register');

  const [acceptTerms, setAcceptTerms] = useState(false);

  const { signWithGithub } = useAuthActions();
  return (
    <AuthLayout
      title="Hesap Oluştur"
      onSocialClick={signWithGithub}
      bottomText="Zaten hesabınız var mı?"
      bottomLinkText="Buradan giriş yapın"
      bottomLinkTo="/login"
      noteText="Kayıt olarak Hizmet Şartları ve Gizlilik Politikası’nı kabul etmiş olursunuz"
    >
      <AuthFields
        fields={[
          {
            name: 'username',
            label: 'Kullanıcı Adı',
            type: 'text',
            placeholder: 'Kullanıcı adınızı girin',
            Icon: User,
          },
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
        acceptTermsConfig={{
          value: acceptTerms,
          onChange: (e) => setAcceptTerms(e.target.checked),
          text: (
            <>
              <Link
                to="/terms"
                className="text-green-600 hover:text-green-700 underline"
              >
                Hizmet Şartları
              </Link>{' '}
              ve{' '}
              <Link
                to="/privacy"
                className="text-green-600 hover:text-green-700 underline"
              >
                Gizlilik Politikası
              </Link>{' '}
              nı kabul ediyorum
            </>
          ),
        }}
        submitLabel="Hesap Oluştur"
        isLoading={isLoading}
        onSubmit={onSubmit}
        onChange={onChange}
        formValues={form}
      />
    </AuthLayout>
  );
}
