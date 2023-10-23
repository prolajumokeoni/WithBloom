import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signOutUser } from "../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const isProtectedRoute =
    location.pathname === "/exchangerate" || location.pathname === "/";
  return (
    <div>
      <Link to="/">Coins</Link>
      <Link to="/exchangerate">ExchangeRateCalculator</Link>

      {currentUser ? (
        <span onClick={signOutUser}>Sign out</span>
      ) : (
        <div>
          <Link to="/signin">Sign In</Link>

          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <Outlet />
      {isProtectedRoute && !currentUser && (
        <div>
          <p>Please sign in or log in to access additional features.</p>
        </div>
      )}
    </div>
  );
};

export default Navigation;
