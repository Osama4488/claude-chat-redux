
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import posthog from "../lib/posthog";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(
        process.env.NEXT_PUBLIC_LOGIN_URL,
        { email, password }
      );

      if (loginResponse.status !== 200) {
        throw new Error("Login failed");
      }

      const loginData = loginResponse.data;

      // Save the access token in cookies
      Cookies.set("accessToken", loginData.accessToken, { expires: 7 });

       // Encrypt and save the email
      //  const encryptedEmail = CryptoJS.AES.encrypt(email, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
      //  console.log(encryptedEmail,"encryptedEmail")
       Cookies.set("encryptedEmail", email, { expires: 7 });
 

       // Fetch user history
    const historyData = await fetchHistory(email);
      return { ...loginData, userHistory: historyData,email:email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchHistory = async (email) => {


  try {
    const historyResponse = await axios.get(process.env.NEXT_PUBLIC_HISTORY_URL, {
      params: { email },
    });

   
    return historyResponse.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};



export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      // First, execute the signup request
      const signupResponse = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_URL, {
        email,
        password,
      });

      // If signup is successful, proceed with login
      const loginResponse = await dispatch(login({ email, password })).unwrap();

      // Return both signup and login data
      return { signupData: signupResponse.data, loginData: loginResponse };
    } catch (error) {
      // Handle errors from both signup and login
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during signup.";
      return rejectWithValue(errorMessage);
    }
  }
);



export const logout = createAsyncThunk("auth/logout", async () => {
   // Clear all cookies
   Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
  posthog.capture("user_logged_out");
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      userHistory: [],
    },
    authenticated: false,
    email: null, // Ensure email is part of the initial state
    loading: false,
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    setAuthenticated(state, action) {
      state.authenticated = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUserHistory(state, action) {
      state.user.userHistory = action.payload; // Save the fetched user history
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.authenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authenticated = false;
      });
  },
});

export const { resetError,setAuthenticated,setEmail,setUserHistory   } = authSlice.actions;
export default authSlice.reducer;
