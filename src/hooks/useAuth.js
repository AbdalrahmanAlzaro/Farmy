import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuth = () => {
  const [error, setError] = useState(null);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Signup successful:", user);
    } catch (error) {
      if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("The email address is already in use by another account.");
      } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        setError("The email address is not valid.");
      } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("The password is too weak.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
      console.error("Signup error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Login successful:", user);
    } catch (error) {
      if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        setError("The email address is not valid.");
      } else if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
        setError("There is no user corresponding to the email address.");
      } else if (error.code === AuthErrorCodes.WRONG_PASSWORD) {
        setError("The password is invalid.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful");
    } catch (error) {
      setError("An error occurred during logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return { error, signup, login, logout };
};
