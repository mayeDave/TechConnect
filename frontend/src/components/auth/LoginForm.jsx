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
          className="text-sm hover:underline"
        >
          Forgot password?
        </Link>
      </div>
      {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

      <motion.button
        className="mt-5 w-full py-3 px-4 bg-primary/55 
						font-bold rounded-lg flex justify-center shadow-lg hover:bg-[#1e3a8a] hover:shadow-xl transition duration-200"
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
