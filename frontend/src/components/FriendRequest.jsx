import useNetworkStore from "../store/useNetworkStore";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FriendRequest = ({ request }) => {
  const { acceptConnectionRequest, rejectConnectionRequest } = useNetworkStore();

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <LazyLoadImage
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={`/profile/${request.sender.username}`} className="font-semibold text-lg">
            {request.sender.name}
          </Link>
          <p className="text-gray-600">{request.sender.headline}</p>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          onClick={() => acceptConnectionRequest(request._id)}
        >
          Accept
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => rejectConnectionRequest(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};
export default FriendRequest;
