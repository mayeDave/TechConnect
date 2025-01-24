const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-white' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 bg-transparent rounded-lg border border-gray-700 focus:border-base-100 focus:ring-2 focus:ring-base-100 text-white placeholder-base-content transition duration-200 cursor-pointer'
			/>
            
		</div>
	);
};
export default Input;