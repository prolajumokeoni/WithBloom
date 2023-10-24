import React, { useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ExchangeRate from './components/ExchangeRate';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navigation from './components/navigation';
import { UserContext } from './contexts/user.context'; 
import Coins from './components/Coins';

const App = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Outlet />}>
          {isAuthenticated && (
            <Route
              path="/"
              element={<Coins />}
              authenticated={isAuthenticated}
            />
          )}
          {isAuthenticated && (
            <Route
              path="exchangerate"
              element={<ExchangeRate />}
              authenticated={isAuthenticated}
            />
          )}
          {!isAuthenticated && <Route path="signin" element={<SignIn />} />}
          {!isAuthenticated && <Route path="signup" element={<SignUp />} />}
        </Route>
      </Routes>
    </>
  );
}

export default App;
