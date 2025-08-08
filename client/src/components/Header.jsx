import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../hooks/useAuth.js';
import Button from './UI/Button/Button.jsx';
import Avatar from './UI/Avatar/Avatar.jsx';
import { useState } from 'react';
import { FileText, PlusCircle, User, LogOut, Menu, X } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
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

            {user && (
              <NavLink
                to="/posts/new"
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

            {user ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden xl:block">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {user.name || user.username}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      @{user.username}
                    </p>
                  </div>
                  <NavLink
                    to="/profile"
                    className="block rounded-full ring-2 ring-transparent hover:ring-emerald-200 transition-all duration-200"
                  >
                    <Avatar size={42} />
                  </NavLink>
                </div>
                <Button onClick={handleLogout} size="default" variant="warning">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden xl:inline">Çıkış Yap</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <NavLink to="/register">
                  <Button variant="default" size="tall">
                    Hesap Oluştur
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button variant="default" size="tall">
                    Giriş Yap
                  </Button>
                </NavLink>
              </div>
            )}
          </nav>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
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
                onClick={closeMobileMenu}
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

              {user && (
                <NavLink
                  to="/posts/new"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <PlusCircle className="w-4 h-4 mr-3" />
                  Gönderi Yayınla
                </NavLink>
              )}

              {user ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50">
                    <Avatar size={44} />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-gray-900 leading-tight">
                        {user.name || user.username}
                      </p>
                      <p className="text-sm text-gray-500 leading-tight">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <NavLink
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center px-7 py-2 rounded-sm text-base font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <NavLink
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full"
                  >
                    <Button className="w-full px-5 py-3 bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 rounded-xl font-medium transition-all duration-200">
                      Hesap Oluştur
                    </Button>
                  </NavLink>
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full"
                  >
                    <Button className="w-full px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200">
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
