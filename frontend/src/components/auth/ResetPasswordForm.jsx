import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import Input from "../Input";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const queryClient = useQueryClient();

  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate: resetPasswordMutation, isLoading } = useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/reset-password/:token", data),
    onSuccess: () => {
      toast.success("Password reset successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    resetPasswordMutation({ password, token });
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md px-6 pb-4">
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

<motion.button
        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#1e3a8a] to-[#10495f] text-white 
						font-bold rounded-lg shadow-lg hover:from-[#79caed]
						hover:to-[#10495f] focus:outline-none focus:ring-2 focus:ring-[#79caed] focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
      >
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
  );
};
export default ResetPasswordForm;
