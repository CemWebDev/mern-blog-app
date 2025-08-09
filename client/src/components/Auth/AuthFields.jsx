import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const AuthFields = ({
  fields,
  acceptTermsConfig,
  submitLabel,
  isLoading,
  onSubmit,
  onChange,
  formValues,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map(({ name, label, type, placeholder, Icon, showToggle }) => (
        <Input
          key={name}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          Icon={Icon}
          showToggle={showToggle}
          value={formValues[name] || ''}
          onChange={onChange}
        />
      ))}

      {acceptTermsConfig && (
        <div className="flex items-start">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTermsConfig.value}
            onChange={acceptTermsConfig.onChange}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
          />
          <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-600">
            {acceptTermsConfig.text}
          </label>
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full" size="tall">
        {submitLabel}
      </Button>
    </form>
  );
};

export default AuthFields;
