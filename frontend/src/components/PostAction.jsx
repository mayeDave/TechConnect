export default function PostAction({ icon, text, count, onClick }) {
	return (
		<button className="flex items-center gap-1" onClick={onClick}>
			<span>{icon}</span>
			{/* Show count always, but hide text on small screens */}
			<span className="sm:hidden">{count}</span>
			<span className="hidden sm:inline">{text} {count}</span>
		</button>
	);
}
