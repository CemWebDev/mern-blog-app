import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({
  title,
  subtitle,
  onSocialClick,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
  noteText,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm hover:scale-105 transition-transform duration-300">
              <User className="text-white w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              {title}
            </h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={onSocialClick}
              className="w-full cursor-pointer flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <svg
                className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium">{`Github ile ${title}`}</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Ya da
              </span>
            </div>
          </div>

          {children}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {bottomText}{' '}
              <Link
                to={bottomLinkTo}
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline inline-block"
              >
                {bottomLinkText}
              </Link>
            </p>
          </div>
        </div>
        {noteText && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 px-4 py-2">{noteText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
