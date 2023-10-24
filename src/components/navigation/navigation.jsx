import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Link, Outlet, useLocation } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {GiGroundSprout} from 'react-icons/gi';
import './navigation.css'

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const isProtectedRoute =
    location.pathname === "/exchangerate" || location.pathname === "/";
  return (
    <header className="header-wrapper">
    <nav className="wrapper">

    <div className="logo-wrapper">
    <GiGroundSprout className="logo"/>
    <Link  to='/' className="logo-text">With Bloom</Link>
    </div>
      <Link className="nav-link" to="/">Coins</Link>
      <Link className="nav-link" to="/exchangerate">Calculator</Link>

      {currentUser ? (
        <Link className="nav-link" onClick={signOutUser}>Sign out</Link>
      ) : (
        <div>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </div>
      )}
      <Outlet />
   
    </nav>
    {isProtectedRoute && !currentUser && (
        <div  className="auth-text">
          <h2>Please sign in or log in to access additional features.</h2>
          <div className="align-text">
          <p> Please click link below to</p>
          <Link className="link-color" to="/signup">
            Sign Up
          </Link>
          <p>or</p>
          <Link className="link-color" to="/signin">
            Sign In
          </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
