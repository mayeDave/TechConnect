import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import NotificationsPage from "./pages/NotificationsPage"
import NetworkPage from "./pages/NetworkPage"
import PostPage from "./pages/PostPage"
import ProfilePage from "./pages/ProfilePage"
import ChatPage from "./pages/ChatPage"
import CollaborationPage from "./pages/CollaborationPage"
import TechNewsPage from "./pages/TechNewsPage"
import TechArticlesPage from "./pages/TechArticlesPage"
import AiPage from "./pages/AiPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import EmailVerificationPage from "./pages/auth/EmailVerificationPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import ResetPasswordPage from "./pages/auth/ResetPasswordPage"
import SettingsPage from "./pages/SettingsPage"
import  { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, authUser } = useAuthStore();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated, "authUser:", authUser);
  
	if (!isAuthenticated && !authUser) {
		return <Navigate to='/login' replace />;
	}

	if (!authUser?.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectedAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, authUser } = useAuthStore();
  console.log(authUser);

	if ( isAuthenticated && authUser?.isVerified) {
		return <Navigate to='/' replace />;
	}

  

	return children;
};

function App() {
  
  const { isCheckingAuth, checkAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

	useEffect(() => {
		checkAuth();
  }, [ checkAuth ]);

	if (isCheckingAuth) return null;

  return (
    <Layout>
      <Routes>
        
        <Route path="/signup" element={<RedirectedAuthenticatedUser><SignupPage /></RedirectedAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<RedirectedAuthenticatedUser><ForgotPasswordPage /></RedirectedAuthenticatedUser>} />
        <Route path="/reset-password/:token" element={<RedirectedAuthenticatedUser><ResetPasswordPage /></RedirectedAuthenticatedUser>} />
        <Route path="/login" element={<RedirectedAuthenticatedUser><LoginPage /></RedirectedAuthenticatedUser>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
        <Route path="/post/:postId" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/collaboration" element={<ProtectedRoute><CollaborationPage /></ProtectedRoute>} />
        <Route path="/tech-news" element={<ProtectedRoute><TechNewsPage /></ProtectedRoute>} />
        <Route path="/tech-articles" element={<ProtectedRoute><TechArticlesPage /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AiPage /></ProtectedRoute>} />
        <Route path='/*' element={<NotFoundPage />} />

      </Routes>
      <Toaster />
    </Layout>
  )
  

  

  // return (
  //   // <Layout>
  //   //   <Routes>
  //   //     <Route path="/" element={authUser && authUser.isVerified ? <HomePage /> : <LoginPage />} />
  //   //     <Route path="/signup" element={!authUser ? <SignupPage /> : <HomePage />} />
  //   //     <Route path="/verify-email" element={!authUser ? <EmailVerificationPage /> : <HomePage />} />
  //   //     <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <HomePage />} />
  //   //     <Route path="/reset-password/:token" element={!authUser ? <ResetPasswordPage /> : <HomePage />} />
  //   //     <Route path="/login" element={!authUser ? <LoginPage /> : <HomePage />} />
  //   //   </Routes>
  //   //   <Toaster />
  //   // </Layout>
  // )
}

export default App
