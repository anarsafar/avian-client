import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AuthView from '@/pages/auth/AuthView';
import ErrorPage from '@/pages/error/Error';
import Verificaton from '@/pages/verify/Verification';
import AppLayout from '@/pages/app';
import RecoverAccount from '@/pages/password/RecoverAccount';
import ResetPassword from '@/pages/password/ResetPassword';

import Animate from '@/components/common/Animate';

import Protected from './Protected';

function AppRoutes() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            index
            element={
              <Protected
                element={
                  <Animate>
                    <AppLayout />
                  </Animate>
                }
              />
            }
          />
          <Route path="auth/signin" element={<AuthView isSignUp={false} />} />
          <Route path="auth/signup" element={<AuthView isSignUp />} />
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
