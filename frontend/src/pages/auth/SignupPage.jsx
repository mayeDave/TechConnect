import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SignupForm from "../../components/auth/SignupForm";
import AuthImagePattern from "../../components/AuthImagePattern";

const SignupPage = () => {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Left side: Signup Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-start p-6 sm:p-12"
      >
        <div
          className="max-w-md w-full bg-base-300 pt-4 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
					overflow-hidden"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-base-content to-base-content/45 text-transparent bg-clip-text">
              Create Account
            </h2>
          </div>

          <SignupForm />

          <div className="mt-6">
            
              
              <div className="flex justify-center text-sm my-3">
                <span className="px-2 font-medium">
                  Already on Tech Connect?
                </span>
              </div>
           
            <div>
              <Link
                to="/login"
                className="text-xl bg-accent px-8 py-4 flex justify-center w-full"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right side: AuthImagePattern */}
      <AuthImagePattern
        title="Welcome to Tech Connect"
        subtitle="Connect with like-minded individuals and explore endless possibilities!"
      />
    </div>
  );
};

export default SignupPage;
