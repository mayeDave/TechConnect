import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useProfileStore } from "../store/useProfileStore";

const FriendRequest = ({ request }) => {
  const { acceptRequest, rejectRequest } = useProfileStore();

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center sm:justify-between transition-all hover:shadow-md">
      {/* Profile & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to={`/profile/${request.sender?.username}`}>
          <LazyLoadImage
            src={request.sender?.profilePicture || "/avatar.png"}
            alt={request.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={`/profile/${request.sender?.username}`} className="font-semibold text-lg">
            {request.sender?.name}
          </Link>
          <p className="text-gray-600">{request.sender?.headline}</p>
        </div>
      </div>

      {/* Buttons - Positioned in Column on Mobile, Row on Larger Screens */}
      <div className="flex flex-col sm:flex-row w-full sm:w-auto mt-4 sm:mt-0 gap-2">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full sm:w-auto"
          onClick={() => acceptRequest(request._id)}
        >
          Accept
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors w-full sm:w-auto"
          onClick={() => rejectRequest(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
