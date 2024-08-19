import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { state, fetchHistory } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
          try {
            // Check if the token is valid by fetching user history
              
              await fetchHistory();
            if (!state.authenticated) {
              console.log(state,"if ke andr private route")
              // window.location.href = "/login";
            }
          } catch (error) {
            console.error('Authentication error:', error);
            await router.push('/login');
          }
        } else {
          console.log("else ke andr")
          router.push('/login');
        }

        setLoading(false);
      };

      checkAuth();
    }, [state.authenticated,router,fetchHistory]);

    if (loading) {
      return <div>Loading...</div>; // Customize loading state as needed
    }

    return state.authenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default PrivateRoute;
