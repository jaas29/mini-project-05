import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in with email and password
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Log out
  const logOut = () => {
    return signOut(auth);
  };

  // Change password (user must be recently authenticated)
  const changePassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };

  // Update user profile (display name, photo URL)
  const updateUserProfile = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp,
    logIn,
    googleSignIn,
    logOut,
    changePassword,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
