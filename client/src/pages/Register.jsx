import { Link } from 'react-router-dom';
import { useAuthForm } from '../hooks/useAuthForm';

const Register = () => {
  const { form, onChange, onSubmit, isLoading, isError, message } =
    useAuthForm('register');

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={onChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: '0.5rem 1rem' }}
        >
          {isLoading ? 'Registering…' : 'Register'}
        </button>
      </form>
      {isError && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/auth/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
