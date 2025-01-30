import { useState } from "react";
import { axiosInstance } from "../../lib/axios.js";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import PasswordStrengthMeter from "../PasswordStrengthMeter.jsx";
import { Loader, Lock, User, Mail, UserPlus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../Input";

const SignupForm = () => {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(name, username, email, password);
      toast.success("Account created successfully");
      navigate("/verify-email");
       

    } catch {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-4 px-4" onSubmit={handleSignup}>
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
        className="absolute right-14 top-1/2 transform translate-y-[-190%] cursor-pointer text-base"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>

      <PasswordStrengthMeter password={password} />
      



<motion.button
						className="mt-5 w-full py-3 px-4 bg-primary/55 
						font-bold rounded-lg flex justify-center shadow-lg hover:bg-[#1e3a8a] hover:shadow-xl transition duration-200"
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