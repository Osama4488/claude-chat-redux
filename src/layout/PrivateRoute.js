import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthAndSetState } from "../utils/authUtils";

const PrivateRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { authenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuthentication = async () => {
        console.log(authenticated,"authenticated in login page")
        const isAuthenticated = await checkAuthAndSetState(dispatch);
        console.log(isAuthenticated, "isAuthenticated in private route");
    
        if (!isAuthenticated) {
          router.push("/login");
        }
    
        setLoading(false);
      };
    
      checkAuthentication();
    }, [router, dispatch]); 
    

    if (loading) {
      return <div>Loading...</div>; // Customize loading state as needed
    }

    return authenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default PrivateRoute;
