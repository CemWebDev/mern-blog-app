import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useAuthActions } from '../hooks/useAuth.js';
import Button from './UI/Button/Button.jsx';

export default function Header() {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between py-5 px-8">
        <div
          className="text-3xl font-bold text-gray-800 cursor-pointer tracking-tight"
          onClick={() => navigate('/')}
        >
          MERN BLOG
        </div>

        <nav className="flex items-center space-x-8">
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 py-2 ${
                isActive
                  ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full'
                  : 'hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-300 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
              }`
            }
          >
            Posts
          </NavLink>

          {user && (
            <NavLink
              to="/posts/new"
              className={({ isActive }) =>
                `relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 py-2 ${
                  isActive
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full'
                    : 'hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-gray-300 hover:after:rounded-full hover:after:transition-all hover:after:duration-300'
                }`
              }
            >
              New Post
            </NavLink>
          )}

          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
