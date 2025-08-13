import { useMemo, useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { FileText, PlusCircle, LogOut, Menu, X } from 'lucide-react';

import Avatar from './UI/Avatar/Avatar';
import Button from './UI/Button/Button';
import { useAuth, useAuthActions } from '../hooks/useAuth';

export default function Header() {
  const { user: authUser } = useAuth();
  const { logout } = useAuthActions();

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

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to={homeHref}
            className="flex items-center cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
              MERN BLOG
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1">
            {[...primaryLinks, ...authedLinks].map(
              ({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2.5" />
                  {label}
                </NavLink>
              )
            )}

            {currentUser ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <Link
                  to="/profile"
                  className="block rounded-full ring-2 ring-transparent hover:ring-emerald-200 transition-all duration-200"
                >
                  <Avatar size={42} src={currentUser.avatarUrl} />
                </Link>

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
                <Link to="/register">
                  <Button variant="primary" size="tall">
                    Hesap Oluştur
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" size="tall">
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileOpen((s) => !s)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
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
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
          >
            <div className="px-2 pt-4 pb-6 space-y-2">
              {[...primaryLinks, ...authedLinks].map(
                ({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-emerald-700 bg-emerald-50 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {label}
                  </NavLink>
                )
              )}

              {currentUser ? (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    Profil
                  </Link>

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
                  <Link
                    to="/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="primary" size="tall" className="w-full">
                      Hesap Oluştur
                    </Button>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="primary" size="tall" className="w-full">
                      Giriş Yap
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
