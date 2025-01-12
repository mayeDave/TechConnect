import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import AuthImagePattern from "../../components/AuthImagePattern";

const ResetPasswordPage = () => {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Left side: Reset Password Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-start p-6 sm:p-12"
      >
        <div
          className="max-w-md w-full pt-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#fff] to-[#79caed] text-transparent bg-clip-text">
              Reset Password
            </h2>
          </div>

          <ResetPasswordForm />
        </div>
      </motion.div>

      {/* Right side: AuthImagePattern */}
      <AuthImagePattern
        title="Reset Your Password"
        subtitle="Secure your account by resetting your password and regaining access effortlessly."
      />
    </div>
  );
};

export default ResetPasswordPage;
