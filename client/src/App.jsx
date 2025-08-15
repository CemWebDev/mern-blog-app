import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from './components/UI/Spinner/Spinner';
import AuthGate from './guards/AuthGate';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const OAuthSuccess = lazy(() => import('./pages/OAuthSuccess'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const NewPost = lazy(() => import('./pages/NewPost'));
const ViewPost = lazy(() => import('./pages/ViewPost'));
const Posts = lazy(() => import('./pages/Posts'));
const EditPost = lazy(() => import('./pages/EditPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

const ProtectedRoute = lazy(() => import('./guards/ProtectedRoute'));
const PublicOnlyRoute = lazy(() => import('./guards/PublicOnlyRoute'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[60] grid place-items-center bg-white/70 backdrop-blur-sm">
          <Spinner size="lg" label="Yükleniyor…" />
        </div>
      }
    >
      <AuthGate>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Route>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthGate>
    </Suspense>
  );
}
