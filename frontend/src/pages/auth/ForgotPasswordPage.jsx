import { motion } from "framer-motion";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import AuthImagePattern from "../../components/AuthImagePattern";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Forgot Password Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-start p-6 sm:p-12"
      >
        <div className="max-w-md w-full pt-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#fff] to-[#79caed] text-transparent bg-clip-text">
              Forgot Password
            </h2>
          </div>

          <ForgotPasswordForm />
        </div>
      </motion.div>

      {/* Right side: AuthImagePattern */}
      <AuthImagePattern
        title="Reset your password"
        subtitle="Enter your email to reset your password and regain access to your account."
      />
    </div>
  );
};

export default ForgotPasswordPage;
