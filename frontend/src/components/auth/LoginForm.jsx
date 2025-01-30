import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader, User, Lock, Eye, EyeOff } from "lucide-react";
import Input from "../Input";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
		e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch {
      console.error(error);
      toast.error(error);
    }
  };


  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md px-6">
      <Input
        icon={User}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        autoComplete="off"
        required
      />
      <Input
        icon={Lock}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        autoComplete="off"
        required
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-14 top-1/2 transform translate-y-[-290%] cursor-pointer text-base"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>

      <div className="flex items-center mb-6">
        <Link
          to="/forgot-password"
          className="text-sm hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <motion.button
        className="mt-5 w-full py-3 px-4 bg-primary/55 
						font-bold rounded-lg flex justify-center shadow-lg hover:bg-[#1e3a8a] hover:shadow-xl transition duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Sign In"}
      </motion.button>
    </form>
  );
};
export default LoginForm;
