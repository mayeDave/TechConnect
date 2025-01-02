import { motion } from "framer-motion";
import EmailVerificationForm from "../../components/auth/EmailVerificationForm";

const EmailVerificationPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md pt-4 mx-auto w-full bg-gray-800 bg-opacity-40 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#fff] to-[#79caed] text-transparent bg-clip-text">
        Verify Your Email
        </h2>
        <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
      </div>

      <EmailVerificationForm />

    </motion.div>
  );
};

export default EmailVerificationPage;
