import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import useNetworkStore from "../../store/useNetworkStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Cpu, MessageCircleMore, AlignJustify } from "lucide-react";
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

    // Poll every 5 seconds to keep connection requests up to date
    const intervalId = setInterval(() => {
      if (authUser?.isVerified) {
        fetchConnectionRequests(); // Refresh connection requests
		
      }
    }, 10000);

    // Clean up the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, [authUser, getNotifications, fetchConnectionRequests]);
  

  const unreadNotificationCount = notifications?.filter(
    (notification) => !notification.read
  ).length;
  const unreadConnectionRequestsCount = connectionRequests?.length;

  return (
	<nav
	  className="bg-base-100 border-b border-base-300 sticky w-full top-0 z-40 
	  backdrop-blur-lg bg-base-100/80"
	>
	  <div className="max-w-7xl mx-auto px-4">
		<div className="flex flex-col sm:flex-row justify-between items-center py-3">
		  {/* Logo Section */}
		  <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
			<Link to="/" className="flex items-center space-x-2">
			  <p className="font-bold text-xl md:text-2xl text-center w-full sm:w-auto">
				Tech Connect
			  </p>
			  <LazyLoadImage
				className="h-20 shadow-md hidden md:block"
				src="/techConnectLogo.jpg"
				alt="Tech-Connect Logo"
			  />
			</Link>
		  </div>
  
		  {/* Navigation Links */}
		  <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-4 sm:mt-0">
			{authUser ? (
			  authUser.isVerified ? (
				<>
				  <Link
					to={"/"}
					className="flex flex-col items-center hover:text-base-content/80 transition duration-200"
				  >
					<Home size={24} className="font-bold" />
					<span className="text-x hidden md:block">Home</span>
				  </Link>
				  <Link
					to="/network"
					className="flex flex-col items-center relative hover:text-base-content/80 transition duration-200"
				  >
					<Users size={24} className="font-bold" />
					<span className="text-x hidden md:block">Connections</span>
					{unreadConnectionRequestsCount > 0 && (
					  <span
						className="absolute -top-1 -right-1 md:right-5 bg-blue-500 text-white text-xs 
						rounded-full size-3 md:size-4 flex items-center justify-center"
					  >
						{unreadConnectionRequestsCount}
					  </span>
					)}
				  </Link>

				  <Link
					to={"/chat"}
					className="flex flex-col items-center hover:text-base-content/80 transition duration-200"
				  >
					<MessageCircleMore size={24} className="font-bold" />
					<span className="text-x hidden md:block">Chat</span>
				  </Link>

				  <Link
					to="/notifications"
					className="flex flex-col items-center relative hover:text-base-content/80 transition duration-200"
				  >
					<Bell size={24} className="font-bold" />
					<span className="text-x hidden md:block">Notifications</span>
					{unreadNotificationCount > 0 && (
					  <span
						className="absolute -top-1 -right-1 md:right-6 bg-blue-500 text-white text-xs 
						rounded-full size-3 md:size-4 flex items-center justify-center"
					  >
						{unreadNotificationCount}
					  </span>
					)}
				  </Link>
				  <Link
					to={`/profile/${authUser.username}`}
					className="flex flex-col items-center hover:text-base-content/80 transition duration-200"
				  >
					<User size={24} className="font-bold" />
					<span className="text-x hidden md:block">Account</span>
				  </Link>
				  <Link to={`/ai`} className="flex flex-col items-center hover:text-base-content/80 transition duration-200">
				  <Cpu size={24}className="font-bold" />
				  <span className="text-x hidden md:block">Maye</span>
				  </Link>
  
				  <div className="dropdown dropdown-hover dropdown-end">
  					<div tabIndex={0} role="button" className="btn flex flex-col items-center relative hover:text-base-content/80 transition duration-200 ">
					  <AlignJustify size={24} className=" font-bold" />
					  <span className="text-x hidden md:block">Explore</span>
					</div>
					  
					<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
					  <li>
						<Link to={'/collaboration'}>Collaborate</Link>
					  </li>
					  <li>
						<Link to={'/tech-news'}>Tech News</Link>
					  </li>
					  <li>
						<Link to={'/tech-articles'}>Tech Articles</Link>
					  </li>
					  <li>
						<Link to={'/settings'}>Change Theme</Link>
					  </li>
					  <li>
						<button onClick={() => logout()}>Logout</button>
					  </li>
					</ul>
				  </div>
  
				</>
			  ) : (
				<>
				  <Link
					to="/login"
					className="btn btn-ghost border border-white text-white hover:bg-[#1e3a8a] transition"
				  >
					Sign In
				  </Link>
				  <Link
					to="/signup"
					className="btn btn-primary bg-[#1e3a8a] text-white px-4 py-2 rounded-full hover:bg-[#00d9ff] transition"
				  >
					Join now
				  </Link>
				</>
			  )
			) : (
			  <>
				<Link
				  to="/login"
				  className="btn btn-primary text-lg text-white hover:bg-[#1e3a8a] transition"
				>
				  Sign In
				</Link>
				<Link
				  to="/signup"
				  className="btn btn-primary text-white text-lg px-4 py-2 rounded-full hover:bg-[#1e3a8a] transition"
				>
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
