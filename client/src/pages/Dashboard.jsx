import WelcomeCard from '../components/Dashboard/WelcomeCard';
import { useAuthActions } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin!</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
      <WelcomeCard />
    </div>
  );
};

export default Dashboard;
