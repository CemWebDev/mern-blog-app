import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../components/UI/Avatar/Avatar.jsx';
import Button from '../components/UI/Button/Button.jsx';
import Input from '../components/UI/Input/Input.jsx';
import { updateProfile } from '../features/users/userSlice.js';
import { Pencil, Save, X as XIcon } from 'lucide-react';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, isLoading, isUpdating, error, updateError } = useSelector(
    (s) => s.users
  );


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
      });
    }
  }, [profile]);

  const isGitHubUser = Boolean(profile?.githubId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    if (!profile) return;
    setFormData({
      username: profile.username || '',
      email: profile.email || '',
    });
    setIsEditing(false);
  };

  if (isLoading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full animate-pulse"></div>
          <p className="text-gray-500">Kullanıcı bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">{error || 'Profil bulunamadı.'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Profil Ayarları
        </h1>
        <p className="text-gray-600">
          Hesap bilgilerinizi görüntüleyin ve düzenleyin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="mb-6">
              <Avatar size={120} src={profile.avatarUrl} />
              {isGitHubUser && (
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Kullanıcısı
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.username}
              </h2>
              <p className="text-gray-600">@{profile.username}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-600">0</p>
                  <p className="text-xs text-gray-500">Yazılar</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">0</p>
                  <p className="text-xs text-gray-500">Beğeniler</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Hesap Bilgileri
              </h3>

              {!isGitHubUser && !isEditing && (
                <Button
                  variant="primary"
                  size="tall"
                  onClick={() => setIsEditing(true)}
                  leftIcon={<Pencil className="w-4 h-4" />}
                >
                  Düzenle
                </Button>
              )}

              {!isGitHubUser && isEditing && (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="tall"
                    onClick={handleCancel}
                    leftIcon={<XIcon className="w-4 h-4" />}
                  >
                    İptal
                  </Button>

                  <Button
                    variant="primary"
                    size="tall"
                    onClick={handleSave}
                    isLoading={isUpdating}
                    disabled={isUpdating}
                    leftIcon={!isUpdating && <Save className="w-4 h-4" />}
                  >
                    Kaydet
                  </Button>
                </div>
              )}
            </div>

            {updateError && (
              <div className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                {updateError}
              </div>
            )}

            <div className="space-y-6">
              <div>
                {isEditing ? (
                  <Input
                    label="Kullanıcı Adı"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Kullanıcı adınızı girin"
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kullanıcı Adı
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                      {profile.username}
                      {isGitHubUser && (
                        <span className="ml-2 text-xs text-gray-500">
                          (GitHub'dan alındı)
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                {isEditing ? (
                  <Input
                    label="E-posta Adresi"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-posta adresinizi girin"
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900">
                      {profile.email}
                      {isGitHubUser && (
                        <span className="ml-2 text-xs text-gray-500">
                          (GitHub'dan alındı)
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Hesap Detayları
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kullanıcı ID
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono">
                      {profile.id}
                    </div>
                  </div>
                  {isGitHubUser && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub ID
                      </label>
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono">
                        {profile.githubId}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isGitHubUser && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h5 className="text-sm font-medium text-blue-900 mb-1">
                        GitHub Hesabı
                      </h5>
                      <p className="text-sm text-blue-700">
                        GitHub ile giriş yaptığınız için bilgileriniz GitHub
                        hesabınızdan alınır ve değiştirilemez.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
