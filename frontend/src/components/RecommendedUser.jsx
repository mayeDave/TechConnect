import useNetworkStore from "../store/useNetworkStore";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";

const RecommendedUser = ({ user }) => {
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
          className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500 cursor-not-allowed"
          disabled
        >
          Loading...
        </button>
      );
    }

    switch (connectionStatus?.status) {
      case "pending":
        return (
          <button className="px-4 py-2 rounded-full text-sm bg-yellow-400 text-gray-900 flex items-center gap-2 cursor-not-allowed" disabled>
            <Clock size={16} />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2">
            <button onClick={handleAccept} className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
              <Check size={20} />
            </button>
            <button onClick={handleReject} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
              <X size={20} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button className="px-4 py-2 rounded-full text-sm bg-green-400 text-white flex items-center gap-2 cursor-not-allowed" disabled>
            <UserCheck size={16} />
            Connected
          </button>
        );
      default:
        return (
          <button onClick={handleConnect} className="px-4 py-2 rounded-full text-sm bg-blue-400 text-white flex items-center gap-2">
            <UserPlus size={16} />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-blue-800 rounded-lg shadow-lg">
      <Link to={`/profile/${user.username}`} className="flex items-center gap-3">
        <LazyLoadImage
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-white font-semibold">{user.name}</h3>
          <p className="text-gray-400 text-sm">{user.headline}</p>
        </div>
      </Link>
      {renderButton()}
    </div>
  );
};

export default RecommendedUser;
