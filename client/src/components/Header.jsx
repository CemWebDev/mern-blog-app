// !todo - THIS COMPONENT NEEDS ABSTRACTION



import { useState } from 'react';
import { Search, Menu, X, User, LogIn, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user, token } = useAuth();

  const isAuthenticated = !!(user && token);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  BlogSite
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  Discover & Share
                </div>
              </div>
            </a>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div
              className={`relative w-full transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : ''
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Yazıları, yazarları veya konuları ara..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="block w-full pl-12 pr-6 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-mono text-gray-500 bg-white">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated && (
              <>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                  <Settings className="h-5 w-5" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
              </>
            )}

            {!isAuthenticated ? (
              <>
                <a
                  href="/auth/login"
                  className="flex items-center px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Giriş Yap
                </a>
                <a
                  href="/auth/register"
                  className="flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  <User className="h-4 w-4 mr-2" />
                  Kayıt Ol
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Hoş geldin, {user?.name || user?.email}
                </span>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              aria-label="Menüyü aç/kapat"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Yazıları ara..."
              className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-gray-50/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-sm border-t border-gray-200/50">
          {isAuthenticated && (
            <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-gray-200">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-600">Ayarlar</span>
            </div>
          )}

          {!isAuthenticated ? (
            <>
              <a
                href="/auth/login"
                className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
              >
                <LogIn className="h-5 w-5 mr-3" />
                Giriş Yap
              </a>
              <a
                href="/auth/register"
                className="flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
              >
                <User className="h-5 w-5 mr-3" />
                Kayıt Ol
              </a>
            </>
          ) : (
            <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {user?.name || 'Kullanıcı'}
                </div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
