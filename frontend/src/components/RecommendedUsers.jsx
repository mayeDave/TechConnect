import useNetworkStore from "../store/useNetworkStore";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect } from "react";

const RecommendedUsers = ({ user }) => {
  const {
    fetchConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    connectionStatuses, // Access connectionStatuses directly from the store
  } = useNetworkStore();

  useEffect(() => {
    fetchConnectionStatus(user._id); // Fetch status for the recommended user
  }, [user._id, fetchConnectionStatus]);

  const connectionStatus = connectionStatuses[user._id]?.status; // Get the status dynamically

  const handleConnect = async () => {
    if (connectionStatus === "not_connected") {
      await sendConnectionRequest(user._id);
    }
  };

  const handleAccept = async () => {
    if (connectionStatus === "received") {
      await acceptConnectionRequest(user._id);
    }
  };

  const handleReject = async () => {
    if (connectionStatus === "received") {
      await rejectConnectionRequest(user._id);
    }
  };

  const renderButton = () => {
    switch (connectionStatus) {
      case "pending":
        return (
          <button
            className="px-2 ml-1 py-1 rounded-full text-sm bg-yellow-400 text-gray-900 flex items-center cursor-not-allowed"
            disabled
          >
            <Clock size={16} />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleAccept}
              className="rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleReject}
              className="rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white"
            >
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="px-2 ml-1 py-1 rounded-full text-xs bg-green-500 text-white flex items-center cursor-not-allowed"
            disabled
          >
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button
            onClick={handleConnect}
            className="px-2 ml-1 py-1 rounded-full text-sm border border-primary text-base-300 hover:bg-primary duration-200 flex items-center"
          >
            <UserPlus size={16} />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md">
      <Link
        to={`/profile/${user.username}`}
        className="flex flex-col text-slate-600 items-center"
      >
        <LazyLoadImage
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <div className="flex flex-col items-center">
          <h3 className="text-base-200 font-semibold text-sm">{user.name}</h3>
          <p className="text-gray-600 text-center">{user.headline}</p>
          <p className="text-sm text-gray-500 mt-2">
            {user.connections?.length} connections
          </p>
        </div>
      </Link>
      {renderButton()}
    </div>
  );
};

export default RecommendedUsers;
