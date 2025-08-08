const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  variant = 'default',
}) => {
  const sizeMap = {
    default: 'px-7 py-2',
    tall: 'py-3 px-4',
  };

  const base =
    'flex items-center justify-center cursor-pointer text-white font-medium rounded-sm transition-all duration-200 hover:shadow-lg';
  const activeBg =
    'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg';
  const warningBg =
    'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700';
  const disabledBg = 'bg-gray-400 !cursor-not-allowed';

  const bgClass = disabled
    ? disabledBg
    : variant === 'warning'
    ? warningBg
    : activeBg;

  const classes = [base, bgClass, className, sizeMap[size]]
    .filter(Boolean)
    .join(' ');

  const clickProps = onClick ? { onClick } : {};
  return (
    <button type={type} {...clickProps} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
