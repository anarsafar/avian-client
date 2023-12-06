import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AuthView from '@/pages/auth/AuthView';
import ErrorPage from '@/pages/error/Error';
import Verificaton from '@/pages/verify/Verification';
import RecoverAccount from '@/pages/password/RecoverAccount';
import ResetPassword from '@/pages/password/ResetPassword';
import Protected from './Protected';
import Animate from '@/components/Animate';

function AppRoutes() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            index
            element={<Protected element={<h1>HOME PAGE</h1>} />}
          />
          <Route
            path="auth/signin"
            element={
              <Animate>
                <AuthView isSignUp={false} />
              </Animate>
            }
          />
          <Route
            path="auth/signup"
            element={
              <Animate>
                <AuthView isSignUp />
              </Animate>
            }
          />
          <Route
            path="auth/recover-account"
            element={
              <Animate>
                <RecoverAccount />
              </Animate>
            }
          />
          <Route
            path="verify"
            element={
              <Animate>
                <Verificaton />
              </Animate>
            }
          />
          <Route
            path="reset-password"
            element={
              <Animate>
                <ResetPassword />
              </Animate>
            }
          />
          <Route
            path="*"
            element={
              <Animate>
                <ErrorPage />
              </Animate>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default AppRoutes;
