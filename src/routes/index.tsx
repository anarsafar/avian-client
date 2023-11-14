import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AuthView from '@/pages/auth/AuthView';
import ErrorPage from '@/pages/layout/Error';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="auth/signin" element={<AuthView isSignUp={false} />} />
        <Route path="auth/signup" element={<AuthView isSignUp />} />
        <Route path="/" index element={<>home page</>} />
        <Route path="profile" element={<>protected</>} />
        <Route path="/reset-password" element={<>forgot password</>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
