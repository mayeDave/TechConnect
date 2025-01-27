import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader, Mail, ArrowLeft } from "lucide-react";
import Input from "../Input";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-6 py-3">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="bg-gradient-to-r from-base-content to-base-content/45 text-transparent bg-clip-text mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              className="mt-5 w-full py-3 px-4 bg-primary/55 
						font-bold rounded-lg flex justify-center shadow-lg hover:bg-[#1e3a8a] hover:shadow-xl transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8" />
            </motion.div>
            <p className="bg-gradient-to-r from-base-content to-base-content/45 text-transparent bg-clip-text text-center mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center w-full">
        <Link
          to={"/login"}
          className="text-sm font-semibold  hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </>
  );
};
export default ForgotPasswordForm;
