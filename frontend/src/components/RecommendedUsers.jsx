import { useState, useEffect } from "react";
import useNetworkStore from "../store/useNetworkStore";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RecommendedUsers = ({ user }) => {
  const { fetchConnectionStatus, sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest } = useNetworkStore();
  
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await fetchConnectionStatus(user._id);
        setConnectionStatus(status);
      } catch (error) {
        console.error("Failed to fetch connection status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user._id, fetchConnectionStatus]);

  const handleConnect = async () => {
    try {
      await sendConnectionRequest(user._id);
      setConnectionStatus({ status: "pending" });
    } catch (error) {
      console.error("Failed to send connection request", error);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptConnectionRequest(connectionStatus.requestId);
      setConnectionStatus({ status: "connected" });
    } catch (error) {
      console.error("Failed to accept connection request", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectConnectionRequest(connectionStatus.requestId);
      setConnectionStatus({ status: "not_connected" });
    } catch (error) {
      console.error("Failed to reject connection request", error);
    }
  };

  const renderButton = () => {
    if (loading) {
      return (
        <button
          className="px-2 ml-1 py-1 rounded-full text-sm bg-gray-200 text-gray-500 cursor-not-allowed"
          disabled
        >
          Loading...
        </button>
      );
    }

    switch (connectionStatus?.status) {
      case "pending":
        return (
          <button className="px-2 m-1 py-1 font-bold w-full rounded-full text-sm bg-yellow-400 text-gray-900 flex items-center justify-center cursor-not-allowed" disabled>
            <Clock size={16} />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button onClick={handleAccept} className="rounded-full font-bold p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white">
              <Check size={20} />
            </button>
            <button onClick={handleReject} className="rounded-full font-bold p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white">
              <X size={20} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button className="px-2 m-1 py-1 font-bold rounded-full w-full text-sm bg-green-500 text-white flex items-center justify-center cursor-not-allowed" disabled>
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button onClick={handleConnect} className="px-2 m-1 py-1 w-full rounded-full bg-base-content/70 text-sm border-base-300 text-base-300 hover:bg-base-content font-bold border-2 duration-200 flex items-center justify-center">
            <UserPlus size={16} />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md h-[320px]">
  <Link to={`/profile/${user.username}`} className="flex flex-col flex-grow min-w-0 text-slate-600 items-center">
    <LazyLoadImage
      src={user.profilePicture || "/avatar.png"}
      alt={user.name}
      className="w-24 h-24 rounded-full object-cover mb-4"
    />
    <div className="flex flex-col items-center">
      <h3 className="text-center font-bold text-lg">{user.name}</h3>

      {/* Headline with a fixed height to prevent resizing */}
      <p className="text-gray-600 text-center font-semibold line-clamp-2 max-w-[90%] w-full min-w-0 overflow-hidden text-ellipsis break-words h-[40px] sm:h-[48px]">
  {user.headline}
</p>


      <p className="text-sm text-gray-500 mt-2">{user.connections?.length} connections</p>
    </div>
  </Link>

  {renderButton()}
</div>

  );
};

export default RecommendedUsers;

