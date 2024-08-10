


import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext"; 
import { CircularProgress, Box } from "@mui/material";


const PrivateRoute = (WrappedComponent) => {
 
  const PrivateRouteComponent = (props) => {
    const { state } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
      if (!state.loading_auth) {
        if (!state.authenticated) {
         
          window.location.href = "/login";
        } else {
         
          setLoading(false);
        }
      }
    }, [state.loading_auth, state.authenticated]);

    if (loading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  
  PrivateRouteComponent.displayName = `PrivateRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return PrivateRouteComponent;
};

export default PrivateRoute;
