import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import PasswordStrengthMeter from "../PasswordStrengthMeter.jsx";
import { Loader, Lock, User, Mail, UserPlus, Eye, EyeOff } from "lucide-react";
import Input from "../Input";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation({ name, username, email, password });
  };

  return (
    <form className="flex flex-col gap-4">
      <Input
        icon={User}
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <Input
        icon={UserPlus}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <Input
        icon={Mail}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <Input
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-14 top-1/2 transform translate-y-[-200%] cursor-pointer text-[#79caed]"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>

      <PasswordStrengthMeter password={password} />
      



<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-[#1e3a8a] to-[#10495f] text-white 
						font-bold rounded-lg shadow-lg hover:from-[#79caed]
						hover:to-[#10495f] focus:outline-none focus:ring-2 focus:ring-[#79caed] focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
    </form>
  );
};

export default SignupForm;
