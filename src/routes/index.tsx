import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import AuthView from '@/pages/auth/AuthView';
import ErrorPage from '@/pages/layout/Error';
import Verificaton from '@/pages/layout/Verification';
import RecoverAccount from '@/pages/password/RecoverAccount';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<h1>home page</h1>} />
        <Route path="auth/signin" element={<AuthView isSignUp={false} />} />
        <Route path="auth/signup" element={<AuthView isSignUp />} />
        <Route path="/verification" element={<Verificaton />} />
        <Route path="/recover-account" element={<RecoverAccount />} />
        <Route path="/reset-password" element={<Verificaton />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
