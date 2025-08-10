const sizeMap = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-11 px-5',
  tall: 'h-12 px-6 text-base',
};

const variantMap = {
  primary:
    'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm hover:shadow',
  outline:
    'text-emerald-700 border border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100',
  soft: 'text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100',
  ghost: 'text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm hover:shadow',
  gradient:
    'text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-sm hover:shadow',
  link: 'text-emerald-700 underline-offset-4 hover:underline px-0 h-auto',
};

export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...rest
}) {
  const resolvedVariant = variant === 'warning' ? 'danger' : variant;

  const base =
    'inline-flex items-center cursor-pointer justify-center gap-2 rounded-sm font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed';

  const classes = [
    base,
    sizeMap[size] ?? sizeMap.md,
    variantMap[resolvedVariant] ?? variantMap.primary,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Spinner = () => (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading ? 'true' : undefined}
      {...rest}
    >
      {isLoading && <Spinner />}
      {leftIcon && <span className="inline-flex">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </button>
  );
}
