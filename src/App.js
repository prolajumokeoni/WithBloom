import React, { useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ExchangeRate from './components/Exchange/ExchangeRate';
import SignIn from './components/SignIn.jsx/SignIn';
import SignUp from './components/SignUp/SignUp';
import Navigation from './components/navigation/navigation';
import { UserContext } from './contexts/user.context'; 
import Coins from './components/Coins/Coins';
import ExchangeRateCalculator from './components/Exchange/ExchangeRate';

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
              element={<ExchangeRateCalculator />}
              authenticated={isAuthenticated}
            />
          )}
          {!isAuthenticated && <Route path="signin" element={<SignIn />} />}
          {!isAuthenticated && <Route path="/signup" element={<SignUp />} />}
        </Route>
      </Routes>
    </>
  );
}

export default App;
