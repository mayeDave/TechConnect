import useNetworkStore from "../store/useNetworkStore";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";

const RecommendedUsers = ({ user }) => {
  const {
    fetchConnectionStatus,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
  } = useNetworkStore();

  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const status = await fetchConnectionStatus(user._id);
      setConnectionStatus(status);
      setLoading(false);
    };

    fetchStatus();
  }, [user._id, fetchConnectionStatus]);

  const handleConnect = () => {
    if (connectionStatus?.status === "not_connected") {
      sendConnectionRequest(user._id);
      setConnectionStatus({ status: "pending" });
    }
  };

  const handleAccept = () => {
    if (connectionStatus?.status === "received") {
      acceptConnectionRequest(connectionStatus.requestId);
      setConnectionStatus({ status: "connected" });
    }
  };

  const handleReject = () => {
    if (connectionStatus?.status === "received") {
      rejectConnectionRequest(connectionStatus.requestId);
      setConnectionStatus({ status: "not_connected" });
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
          <button className="px-2 ml-1 py-1 rounded-full text-sm bg-yellow-400 text-gray-900 flex items-center cursor-not-allowed" disabled>
            <Clock size={16} />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button onClick={handleAccept} className="rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white">
              <Check size={16} />
            </button>
            <button onClick={handleReject} className="rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white">
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button className="px-2 ml-1 py-1 rounded-full text-xs bg-green-500 text-white flex items-center cursor-not-allowed" disabled>
            <UserCheck size={16} className='mr-1' />
            Connected
          </button>
        );
      default:
        return (
          <button onClick={handleConnect} className="px-2 ml-1 py-1 rounded-full text-sm border border-primary text-base-300 hover:bg-primary duration-200 flex items-center">
            <UserPlus size={16} />
            Connect
          </button>
        );
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
      <Link to={`/profile/${user.username}`} className='flex flex-col text-slate-600 items-center'>
        <LazyLoadImage
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className='w-24 h-24 rounded-full object-cover mb-4'
        />
        <div className='flex flex-col items-center'>
          <h3 className="text-base-200 font-semibold text-sm">{user.name}</h3>
          <p  className='text-gray-600 text-center'>{user.headline}</p>
          <p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
        </div>
      </Link>
      {renderButton()}
    </div>


  );
};

export default RecommendedUsers;
