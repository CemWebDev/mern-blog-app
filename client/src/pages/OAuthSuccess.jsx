'use client';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuth';
import { toastError, toastSuccess } from '../utils/toast';
import { jwtDecode } from 'jwt-decode';
import { Loader2, CheckCircle, XCircle, Shield, Clock } from 'lucide-react';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { applyCredentials } = useAuthActions();
  const [status, setStatus] = useState('processing');
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const params = new URLSearchParams(search);
    const token = params.get('token');

    if (!token) {
      setStatus('error');
      toastError('Geçersiz token. Lütfen tekrar deneyin.', {
        id: 'oauth-error',
      });
      setTimeout(() => navigate('/login'), 1200);
      return;
    }

    try {
      const { username } = jwtDecode(token);
      applyCredentials(token);
      toastSuccess(`Hoş geldin, ${username || 'kullanıcı'}!`, {
        id: 'welcome',
      });
      setStatus('success');
      setTimeout(() => navigate('/dashboard', { replace: true }), 800);
    } catch {
      setStatus('error');
      toastError('Geçersiz oturum bilgisi. Lütfen tekrar deneyin.', {
        id: 'oauth-error',
      });
      setTimeout(() => navigate('/login'), 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStatusContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              GitHub ile Giriş Yapılıyor
            </h2>
            <p className="text-gray-600">Kimlik bilgileriniz doğrulanıyor...</p>
          </div>
        );

      case 'success':
        return (
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Giriş Başarılı! 🎉
            </h2>
            <p className="text-gray-600">Dashboard'a yönlendiriliyorsunuz...</p>
          </div>
        );

      case 'error':
        return (
          <div className="mb-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bir Hata Oluştu
            </h2>
            <p className="text-gray-600 mb-4">
              Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.
            </p>
            <p className="text-sm text-gray-500">
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const getProgressBarClass = () => {
    switch (status) {
      case 'processing':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 w-2/3';
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 w-full';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 w-full';
      default:
        return 'w-0';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>

          {renderStatusContent()}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressBarClass()}`}
            />
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center">
              <Shield className="w-3 h-3 mr-1" />
              <span>Güvenli bağlantı ile korunuyorsunuz</span>
            </div>
            {status === 'processing' && (
              <div className="flex items-center justify-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>Bu işlem birkaç saniye sürebilir</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">MERN BLOG ile güvenli giriş</p>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;
