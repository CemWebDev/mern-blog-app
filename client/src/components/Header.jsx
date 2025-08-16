import { useMemo, useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { FileText, PlusCircle, LogOut, Menu, X } from 'lucide-react';

import Avatar from './UI/Avatar/Avatar';
import Button from './UI/Button/Button';
import { useAuth, useAuthActions } from '../hooks/useAuth';

export default function Header() {
  const { user: authUser } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const { profile } = useSelector(
    (s) => ({ profile: s.users.profile }),
    shallowEqual
  );
  const currentUser =
    profile && authUser && profile.id === authUser.id ? profile : authUser;

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const homeHref = currentUser ? '/dashboard' : '/';

  const primaryLinks = useMemo(
    () => [{ to: '/posts', label: 'Yazılar', icon: FileText }],
    []
  );
  const authedLinks = useMemo(
    () =>
      currentUser
        ? [{ to: '/new-post', label: 'Yayınla', icon: PlusCircle }]
        : [],
    [currentUser]
  );

  const handleLogout = useCallback(() => {
    logout();
    setIsMobileOpen(false);
  }, [logout]);

  const handleRegisterClick = () => navigate('/register');
  const handleLoginClick = () => navigate('/login');

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={homeHref} className="flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold text-gray-900">MERN BLOG</div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {[...primaryLinks, ...authedLinks].map(
              ({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              )
            )}

            {currentUser ? (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <Link to="/profile" className="block rounded-full">
                  <Avatar
                    size={40}
                    src={currentUser.avatarUrl}
                    className="ring-2 ring-gray-100"
                  />
                </Link>

                <Button
                  onClick={handleLogout}
                  variant="danger"
                  size="md"
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  <span className="hidden xl:inline">Çıkış Yap</span>
                  <span className="xl:hidden">Çıkış</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                <Button
                  onClick={handleRegisterClick}
                  variant="outline"
                  size="md"
                >
                  Hesap Oluştur
                </Button>
                <Button onClick={handleLoginClick} variant="primary" size="md">
                  Giriş Yap
                </Button>
              </div>
            )}
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileOpen((s) => !s)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-gray-100 bg-white shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {[...primaryLinks, ...authedLinks].map(
                ({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg font-medium ${
                        isActive
                          ? 'text-emerald-600 bg-emerald-50'
                          : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </NavLink>
                )
              )}

              {currentUser ? (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                  >
                    Profil
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    size="md"
                    fullWidth={true}
                    leftIcon={<LogOut className="w-4 h-4" />}
                  >
                    Çıkış Yap
                  </Button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <Button
                    onClick={() => {
                      handleRegisterClick();
                      setIsMobileOpen(false);
                    }}
                    variant="outline"
                    size="md"
                    fullWidth={true}
                  >
                    Hesap Oluştur
                  </Button>
                  <Button
                    onClick={() => {
                      handleLoginClick();
                      setIsMobileOpen(false);
                    }}
                    variant="primary"
                    size="md"
                    fullWidth={true}
                  >
                    Giriş Yap
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
