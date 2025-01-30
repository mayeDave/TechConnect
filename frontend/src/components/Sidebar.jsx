import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Home, UserPlus, Bell } from "lucide-react";

export default function Sidebar({ user }) {
	
	return (
		<div className="bg-base-300 rounded-lg shadow-lg overflow-hidden">
			{/* Banner Section */}
			<div className="relative">
				<div
					className="h-20 bg-cover bg-center"
					style={{
						backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
					}}
				/>
				<Link to={`/profile/${user.username}`}>
					<LazyLoadImage
						src={user.profilePicture || "/avatar.png"}
						alt={user.name}
						className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md absolute left-1/2 transform -translate-x-1/2 top-10"
					/>
				</Link>
			</div>

			{/* User Info Section */}
			<div className="pt-16 pb-4 text-center ">
				<Link to={`/profile/${user.username}`} className="hover:underline">
					<h2 className="text-xl hover:text-base-content font-bold">{user.name}</h2>
				</Link>
				<p className="text-sm ">{user.headline || "No headline available"}</p>
				<p className="text-xs ">{user.connections?.length || 0} connections</p>
			</div>

			{/* Navigation Links */}
			<div className="border-t border-gray-700 p-4">
				<nav>
					<ul className="space-y-3">
						<li>
							<Link
								to="/"
								className="flex items-center py-3 px-4 rounded-md bg-base-content/70 hover:bg-base-content text-white transition duration-200 shadow-sm"
							>
								<Home className="mr-3" size={20} />
								<span className="text-sm font-medium">Home</span>
							</Link>
						</li>
						<li>
							<Link
								to="/network"
								className="flex items-center py-3 px-4 rounded-md bg-base-content/70 hover:bg-base-content text-white transition duration-200 shadow-sm"
							>
								<UserPlus className="mr-3" size={20} />
								<span className="text-sm font-medium">Connections</span>
							</Link>
						</li>
						<li>
							<Link
								to="/notifications"
								className="flex items-center py-3 px-4 rounded-md bg-base-content/70 hover:bg-base-content text-white transition duration-200 shadow-sm"
							>
								<Bell className="mr-3" size={20} />
								<span className="text-sm font-medium">Notifications</span>
							</Link>
						</li>
					</ul>
				</nav>
			</div>

			{/* Footer Section */}
			<div className="border-t border-gray-700 p-4 text-center">
				<Link
					to={`/profile/${user.username}`}
					className="text-sm font-semibold hover:text-base-content transition duration-200"
				>
					Visit your profile
				</Link>
			</div>
		</div>
	);
}
