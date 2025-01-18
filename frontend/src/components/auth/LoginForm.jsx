import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader, User, Lock } from "lucide-react";
import Input from "../Input";
import { useAuthStore } from "../../store/useAuthStore";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
		e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error(error);
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        autoComplete="off"
        required
      />

      <div className="flex items-center mb-6">
        <Link
          to="/forgot-password"
          className="text-sm text-[#79caed] hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

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
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login"}
      </motion.button>
    </form>
  );
};
export default LoginForm;
