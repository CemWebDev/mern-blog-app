const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
}) => {


  const sizeMap = {
    default: 'px-7 py-2',
    tall: 'py-3 px-4',
  };

  const base =
    'px-7 py-2 cursor-pointer text-white font-medium rounded-sm transition-all duration-300';
  const activeBg =
    'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg';
  const disabledBg = 'bg-gray-400 !cursor-not-allowed';

  const classes = [
    base,
    disabled ? disabledBg : activeBg,
    className,
    sizeMap[size],
  ]
    .filter(Boolean)
    .join(' ');

  const clickProps = onClick ? { onClick } : {};
  return (
    <button type={type} {...clickProps} className={classes}>
      {children}
    </button>
  );
};

export default Button;
