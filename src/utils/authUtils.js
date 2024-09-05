// authUtils.js
import Cookies from "js-cookie";
import { setAuthenticated,setEmail,setUserHistory } from "../store/authSlice";
import CryptoJS from "crypto-js";
import {fetchHistory} from "../store/authSlice"

export const checkAuthAndSetState = async (dispatch) => {
  const token = Cookies.get("accessToken");
  const encryptedEmail = Cookies.get("encryptedEmail");
  if (token) {
    dispatch(setAuthenticated(true));
    
    if (encryptedEmail) {
      // const bytes = CryptoJS.AES.decrypt(encryptedEmail, process.env.NEXT_PUBLIC_SECRET_KEY);
      // const email = bytes.toString(CryptoJS.enc.Utf8);

      // You can dispatch an action to set the decrypted email in your auth state if needed
      console.log("Decrypted Email:", encryptedEmail);
       dispatch(setEmail(encryptedEmail));

      // Fetch chat history
      try {
        const chatHistory =  await fetchHistory(encryptedEmail);
        console.log(chatHistory,"chatHistory in authutils")
        dispatch(setUserHistory(chatHistory)); // Save history in Redux state
      } catch (error) {
        console.error("Failed to fetch history", error);
      }
      
    }
    return true;
  } else {
    dispatch(setAuthenticated(false));
    return false;
  }
};
