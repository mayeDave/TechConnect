import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md py-2 px-10 mx-auto w-full bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
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
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-r from-[#fff] to-[#79caed] text-black font-medium bg-opacity-500">
              Already on Tech Connect?
            </span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#79caed] bg[#101b30] bg-opacity-40 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#79caed]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
