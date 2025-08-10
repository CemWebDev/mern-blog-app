import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './UI/Avatar/Avatar.jsx';
import Button from './UI/Button/Button.jsx';
import { FileText, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { fetchMe } from '../features/users/userSlice.js';
import { useAuth, useAuthActions } from '../hooks/useAuth.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: authUser } = useAuth();
  const { logout } = useAuthActions();

  const { profile, isLoading: isUsersLoading } = useSelector((s) => s.users);
  const currentUser = profile || authUser;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (authUser && !profile && !isUsersLoading) {
      dispatch(fetchMe());
    }
  }, [authUser, profile, isUsersLoading, dispatch]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
              MERN BLOG
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `relative flex items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <FileText className="w-4 h-4 mr-2.5" />
              Yazılar
            </NavLink>

            {currentUser && (
              <NavLink
                to="/new-post"
                className={({ isActive }) =>
                  `relative flex items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <PlusCircle className="w-4 h-4 mr-2.5" />
                Yayınla
              </NavLink>
            )}

            {currentUser ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden xl:block">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {currentUser.name || currentUser.username}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @{currentUser.username}
                    </p>
                  </div>
                  <NavLink
                    to="/profile"
                    className="block rounded-full ring-2 ring-transparent hover:ring-emerald-200 transition-all duration-200"
                  >
                    <Avatar size={42} src={currentUser.avatarUrl} />
                  </NavLink>
                </div>

                <Button
                  variant="danger"
                  size="tall"
                  leftIcon={<LogOut className="w-4 h-4" />}
                  onClick={handleLogout}
                >
                  <span className="hidden xl:inline">Çıkış Yap</span>
                  <span className="xl:hidden">Çıkış</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <NavLink to="/register">
                  <Button variant="primary" size="tall">
                    Hesap Oluştur
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button variant="primary" size="tall">
                    Giriş Yap
                  </Button>
                </NavLink>
              </div>
            )}
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-4 pb-6 space-y-2">
              <NavLink
                to="/posts"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <FileText className="w-4 h-4 mr-3" />
                Yazılar
              </NavLink>

              {currentUser && (
                <NavLink
                  to="/new-post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <PlusCircle className="w-4 h-4 mr-3" />
                  Yayınla
                </NavLink>
              )}

              {currentUser ? (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50">
                    <Avatar size={44} src={currentUser.avatarUrl} />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-gray-900 leading-tight">
                        {currentUser.name || currentUser.username}
                      </p>
                      <p className="text-sm text-gray-500 leading-tight">
                        @{currentUser.username}
                      </p>
                    </div>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    Profil
                  </NavLink>

                  <Button
                    variant="danger"
                    size="tall"
                    leftIcon={<LogOut className="w-4 h-4" />}
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Çıkış Yap
                  </Button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <NavLink
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="primary" size="tall" className="w-full">
                      Hesap Oluştur
                    </Button>
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="primary" size="tall" className="w-full">
                      Giriş Yap
                    </Button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
