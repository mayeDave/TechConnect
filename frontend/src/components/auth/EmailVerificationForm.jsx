import { useAuthStore } from "../../store/useAuthStore";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";


const EmailVerificationForm = () => {
  const [ code, setCode ] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();
  

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/");
			toast.success("Email verified successfully");
		} catch (error) {
			console.log(error);
		}
	
	};

//   // Auto submit when all fields are filled
// 	useEffect(() => {
// 		if (code.every((digit) => digit !== "")) {
// 			handleSubmit(new Event("submit"));
// 		}
// 	}, [code]);

  

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
								className='w-12 h-12 text-center text-2xl font-boldbg-transparent rounded-lg border border-gray-700 focus:border-base-100 focus:ring-2 focus:ring-base-100 text-white placeholder-base-content transition duration-200 cursor-pointer'
							/>
						))}
					</div>
					
					<motion.button
        className="mt-5 w-full py-3 px-4 bg-primary/55 
						font-bold rounded-lg flex justify-center shadow-lg hover:bg-[#1e3a8a] hover:shadow-xl transition duration-200"
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
