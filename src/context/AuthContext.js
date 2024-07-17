import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
        email,
        password,
      });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/app");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
        email,
        password,
        twoFactorCode: "",
        twoFactorRecoveryCode: "",
      });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/app");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const resetError = () => setError(null);


  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout,resetError }}>
      {children}
    </AuthContext.Provider>
  );
};
