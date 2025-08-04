import { Link } from 'react-router-dom';
import { useAuthForm } from '../hooks/useAuthForm';

const Login = () => {
  const { form, onChange, onSubmit, isLoading, isError, message } =
    useAuthForm('login');

  return (
    <div >
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in…' : 'Login'}
        </button>
      </form>
      {isError && <p>{message}</p>}
      <p>
        Don’t have an account? <Link to="/auth/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
