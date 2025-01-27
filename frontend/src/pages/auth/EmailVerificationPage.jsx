import { motion } from "framer-motion";
import EmailVerificationForm from "../../components/auth/EmailVerificationForm";
import AuthImagePattern from "../../components/AuthImagePattern";

const EmailVerificationPage = () => {
  return (
    <div className="grid lg:grid-cols-2">
      {/* Left side: Email Verification Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-start p-6 sm:p-12"
      >
        <div className="max-w-md w-full pt-4 bg-base-300 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-base-content to-base-content/45 text-transparent bg-clip-text">
              Verify Your Email
            </h2>
            <p className="text-center mb-6">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>

          <EmailVerificationForm />
        </div>
      </motion.div>

      {/* Right side: AuthImagePattern */}
      <AuthImagePattern
        title="Almost there!"
        subtitle="Check your email for the verification code to complete your registration."
      />
    </div>
  );
};

export default EmailVerificationPage;
