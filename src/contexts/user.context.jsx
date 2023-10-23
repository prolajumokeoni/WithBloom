import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
	isAuthenticated: false,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = { currentUser, setCurrentUser, isAuthenticated };

	useEffect(()=> {
		const unsubscribe = onAuthStateChangedListener((user) =>{
			setCurrentUser(user);
			  setIsAuthenticated(!!user); 
		})
		return unsubscribe;
	},[]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
