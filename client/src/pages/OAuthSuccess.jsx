import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuth';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { applyCredentials } = useAuthActions();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');
    if (token) {
      applyCredentials(token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [search, navigate, applyCredentials]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Yönlendirme tamamlanıyor…</p>
    </div>
  );
};

export default OAuthSuccess;
