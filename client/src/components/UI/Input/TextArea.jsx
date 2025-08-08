const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 6,
  className = '',
  error,
  ...rest
}) => {
  return (
    <div className={`w-full ${label ? 'mb-4' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-vertical min-h-[120px]"
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-rose-600">{error}</p>}
    </div>
  );
};

export default Textarea;
