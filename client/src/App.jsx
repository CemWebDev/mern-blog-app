import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './guards/ProtectedRoute';
import Home from './pages/Home';
import OAuthSuccess from './pages/OAuthSuccess';
import DashboardLayout from './layouts/DashboardLayout';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost';
import ViewPost from './pages/ViewPost';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/posts/:id" element={<ViewPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
