import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto w-full pt-4 bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#fff] to-[#79caed] text-transparent bg-clip-text">
          Create Account
        </h2>
      </div>

      <SignupForm />

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm my-3">
            <span className="px-2 bg-gradient-to-r from-[#fff] to-[#79caed] text-black font-medium bg-opacity-500">
              Already on Tech Connect?
            </span>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center w-full">
          <Link
            to="/login"
            className="text-sm text-[#79caed] hover:text-[#fff] flex items-center"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
