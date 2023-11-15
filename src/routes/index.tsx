import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import AuthView from '@/pages/auth/AuthView';
import ErrorPage from '@/pages/Error';
import Verificaton from '@/pages/Verification';
import RecoverAccount from '@/pages/password/RecoverAccount';
import ResetPassword from '@/pages/password/ResetPassword';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<h1>HOME PAGE</h1>} />
        <Route path="auth/signin" element={<AuthView isSignUp={false} />} />
        <Route path="auth/signup" element={<AuthView isSignUp />} />
        <Route path="auth/recover-account" element={<RecoverAccount />} />
        <Route path="verify" element={<Verificaton />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
