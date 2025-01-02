import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import EmailVerificationPage from "./pages/auth/EmailVerificationPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "./pages/auth/ResetPasswordPage"
import toast, { Toaster } from "react-hot-toast"
import { axiosInstance } from "./lib/axios"
import { useQuery } from "@tanstack/react-query"

function App() {
  // new Promise((resolve) => setTimeout(resolve, 3000));
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      }  catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
    }
  });
  
  if (isLoading) return null;

  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <HomePage />} />
        <Route path="/verify-email" element={!authUser ? <EmailVerificationPage /> : <HomePage />} />
        <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <HomePage />} />
        <Route path="/reset-password/:token" element={!authUser ? <ResetPasswordPage /> : <HomePage />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <HomePage />} />
      </Routes>
      <Toaster />
    </Layout>
  )
}

export default App
