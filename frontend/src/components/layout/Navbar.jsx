import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import useNetworkStore from "../../store/useNetworkStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Navbar = () => {
	const { authUser, logout } = useAuthStore();


	const { notifications, getNotifications } = useNotificationStore();
	const { connectionRequests, fetchConnectionRequests } = useNetworkStore();

	useEffect(() => {
		if (authUser?.isVerified) {
		  getNotifications();
		  fetchConnectionRequests();
		}
	  }, [authUser, getNotifications, fetchConnectionRequests]);

	

	const unreadNotificationCount = notifications?.filter(
		(notification) => !notification.read
	).length;
	const unreadConnectionRequestsCount = connectionRequests?.length;

	return (
		<nav className="bg-base-100 border-b border-base-300 sticky w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <p className="font-bold md:text-2xl ">Tech Connect</p>
              <LazyLoadImage className="h-20 shadow-md hidden md:block" src="/techConnectLogo.jpg" alt="Tech-Connect Logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 md:gap-6">
						{authUser? (
							authUser.isVerified ? (
								
							
							<>

								{/* Personalized greeting
								<span className="text-white text-xl font-bold ">
                 					 Hello, {authUser?.username}!
               					 </span> */}

								<Link to={"/"} className="text-white flex flex-col items-center hover:text-[#00d9ff] transition duration-200"
								>
									<Home size={20} />
									<span className='text-x hidden md:block'>Home</span>
								</Link>
								<Link to='/network' className="text-white flex flex-col items-center relative hover:text-[#00d9ff] transition duration-200"
								>
									<Users size={20} />
									<span className='text-x hidden md:block'>My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-5 bg-blue-500 text-white text-x 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link to='/notifications' className="text-white flex flex-col items-center relative hover:text-[#00d9ff] transition duration-200"
								>
									<Bell size={20} />
									<span className='text-x hidden md:block'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-6 bg-blue-500 text-white text-x 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className="text-white flex flex-col items-center hover:text-[#00d9ff] transition duration-200"

								>
									<User size={20} />
									<span className='text-x hidden md:block'>Me</span>
								</Link>
								<button
									className="flex items-center space-x-1 text-sm text-white hover:text-[#00d9ff] transition duration-200"
									onClick={() => logout()}
								>
									<LogOut size={24} />
									<span className='hidden md:inline'>Logout</span>
								</button>
							</>
							) : (
								<>
								<Link to='/login' className="btn btn-ghost border border-white text-white hover:bg-[#1e3a8a] transition">
									Sign In
								</Link>
								<Link to='/signup' className="btn btn-primary bg-[#1e3a8a] text-white px-4 py-2 rounded-full hover:bg-[#00d9ff] transition">
									Join now
								</Link>
							</>
							)
						) : (
							<>
								<Link to='/login' className="btn btn-ghost border border-white text-white hover:bg-[#1e3a8a] transition">
									Sign In
								</Link>
								<Link to='/signup' className="btn btn-primary bg-[#1e3a8a] text-white px-4 py-2 rounded-full hover:bg-[#00d9ff] transition">
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;