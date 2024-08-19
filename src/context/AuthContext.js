


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import posthog from "../lib/posthog";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    authenticated: false,
    loading: false,
    error: null,
  });
  
  const router = useRouter();


 

  

  // Load user and user history from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

        // Allow access to public routes
        if (router.pathname === "/" || router.pathname === "/new") {
          return;
        }

      if (token && email) {
        try {
          
           await fetchHistory(email);

        } catch (error) {
          console.error("Failed to fetch user data", error);
          setState({
            user: null,
            authenticated: false,
            loading: false,
            error: "Failed to fetch user data.",
          });
         
         

          if (router.pathname !== "/login" && router.pathname !== "/signup") {
            router.push("/login");
          }
        }
      } else {
        setState({
          user: null,
          authenticated: false,
          loading: false,
          error: "An error occurred during login.",
        });
      

        if (router.pathname !== "/login" && router.pathname !== "/signup") {
          router.push("/login");
        }
      }
    };

    initializeAuth();
  }, []);


  // New fetchHistory function
 const fetchHistory = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
      params: { email },
    });
    const userHistory = response.data;
    
    setState({
      user: {
        email,
        userHistory,
      },
      authenticated: true,
      loading: false,
      error: null,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user history", error);
    throw new Error("Failed to fetch user history.");
  }
};

  // Login function
  const login = async (email, password) => {
    setState({ ...state, loading: true, error: null });

    try {
      const loginResponse = await axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
        email,
        password,
      });

      const { accessToken } = loginResponse.data;

      // Save token and email to localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("email", email);

      // // Fetch user history after login
      // const userHistoryResponse = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
      //   params: { email },
      // });

      // const userHistory = userHistoryResponse.data;


       const userHistory =  await fetchHistory(email);
      // Update state with user data and history
      setState({
        user: {
          email,
          userHistory,
        },
        authenticated: true,
        loading: false,
        error: null,
      });

      // Track the login event
      posthog.capture('user_logged_in', {
        distinct_id: email,
      });

      // window.location.href = "/app"; // Redirect to /app
    } catch (error) {
      console.error("Authentication error", error);
      setState({
        user: null,
        authenticated: false,
        loading: false,
        error: "An error occurred during login.",
      });
      setSnackbarMessage("An error occurred during login.");
      setSnackbarOpen(true); // Show Snackbar on error
    }
  };

  // Signup function
  const signup = async (email, password, confirmPassword) => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    if (password !== confirmPassword) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: "Passwords do not match.",
      }));
  
      return;
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
        email,
        password,
      });

      const userData = response.data;

      setState({
        user: userData,
        authenticated: true,
        loading: false,
        error: null,
      });

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.replace("/app");

      // Track the signup event
      posthog.capture('user_signed_up', {
        distinct_id: email,
      });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: "An error occurred during signup.",
      }));
     
    }
  };

 
  const logout = async () => {
    // Optionally handle cleanup or any additional async operations before logging out
    try {
      // Ensure that state updates are applied before redirecting
      setState((prevState) => ({
        ...prevState,
        user: null,
        authenticated: false,
        loading: false,
        error: null,
      }));
    
      // Remove token and other local storage items
      localStorage.removeItem("token");
      localStorage.removeItem("email");

      // Track the logout event
      posthog.capture('user_logged_out', {
        distinct_id: state.user?.email,
      });
      
      // Redirect after cleanup
      await router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const resetError = () => {
    setState((prevState) => ({ ...prevState, error: null }));
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout, resetError,fetchHistory }}>
      {children}
     
    </AuthContext.Provider>
  );
};
