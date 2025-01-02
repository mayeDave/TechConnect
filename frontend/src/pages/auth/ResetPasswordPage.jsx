import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full pt-4 mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#fff] to-[#79caed] text-transparent bg-clip-text">
        Reset Password
        </h2>
      </div>

      <ResetPasswordForm />

    </motion.div>
  );
};

export default ResetPasswordPage;
