import "@/styles/scss/main.scss";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ToastProvider>
  );
}
