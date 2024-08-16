// import "@/styles/scss/main.scss";
// import { AuthProvider } from "../context/AuthContext";
// import { ToastProvider } from "../context/ToastContext";

// export default function App({ Component, pageProps }) {
//   return (
//     <ToastProvider>
//       <AuthProvider>
//         <Component {...pageProps} />
//       </AuthProvider>
//     </ToastProvider>
//   );
// }

import "@/styles/scss/main.scss";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="app-container">
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer 
          position="top-center" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="colored" 
        />
      </AuthProvider>
    </div>

    
  );
}

