import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";


const EmailVerificationForm = () => {
  const [ code, setCode ] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: verifyEmailMutation, isLoading } = useMutation({
	mutationFn: (data) => axiosInstance.post("/auth/verify-email", data),
	onSuccess: () => {
	  queryClient.invalidateQueries({ queryKey: ["authUser"] });
	  navigate("/login");
	},
	onError: (err) => {
	  toast.error(err.response.data.message || "Something went wrong");
	},
  })

  const handleChange = (index, value) => {
    const newCode = [...code];
    //  Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

  const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

 const handleSubmit = (e) => {
		e.preventDefault();
		verifyEmailMutation({ code: code.join("") });
	};

  // Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

  

  return (
    <form onSubmit={handleSubmit} className='space-y-6 px-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-[#79caed] focus:outline-none'
							/>
						))}
					</div>
					
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
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
				</form>
  );
};
export default EmailVerificationForm;
