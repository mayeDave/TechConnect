import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Sidebar from "../components/Sidebar";
import { useNotificationStore } from "../store/useNotificationStore";
import { useAuthStore } from "../store/useAuthStore";
import NotificationsSkeleton from "../components/skeletons/NotificationsSkeleton";

const NotificationsPage = () => {
  const { authUser } = useAuthStore();
  const {
    notifications,
    isNotificationsLoading,
    getNotifications,
    markAsRead,
    deleteNotification,
  } = useNotificationStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-500" />;
      case "comment":
        return <MessageSquare className="text-green-500" />;
      case "connectionAccepted":
        return <UserPlus className="text-purple-500" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong>{notification.relatedUser.name}</strong> liked your post
          </span>
        );
      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser?.username}`}
              className="font-bold"
            >
              {notification.relatedUser?.name}
            </Link>{" "}
            commented on your post
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification?.relatedUser?.username}`}
              className="font-bold"
            >
              {notification?.relatedUser?.name}
            </Link>{" "}
            accepted your connection request
          </span>
        );
      default:
        return null;
    }
  };

  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost._id}`}
        className="mt-2 p-2 bg-base-300 rounded-md flex items-center space-x-2 hover:bg-base-200 transition-colors overflow-hidden"
      >
        {relatedPost.image && (
          <LazyLoadImage
            src={relatedPost.image}
            alt="Post preview"
            className="w-10 h-10 object-cover rounded flex-shrink-0"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-base-content/70 text-sm truncate">
            {relatedPost.content}
          </p>
        </div>
        <ExternalLink
          size={14}
          className="text-base-content/70 flex-shrink-0"
        />
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1 hidden lg:block ">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-base-300 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          {isNotificationsLoading ? (
            <NotificationsSkeleton />
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification._id}
                  className={`bg-base-100 rounded-lg p-4 my-4 transition-all hover:shadow-md border border-gray-200 overflow-hidden ${
                    !notification.read ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-grow items-center space-x-4 overflow-hidden">
                      <Link
                        to={`/profile/${notification?.relatedUser?.username}`}
                        className="flex-shrink-0"
                      >
                        <LazyLoadImage
                          src={
                            notification?.relatedUser?.profilePicture ||
                            "/avatar.png"
                          }
                          alt={notification?.relatedUser?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </Link>

                      <div className="w-full overflow-hidden">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-gray-100 rounded-full">
                            {renderNotificationIcon(notification.type)}
                          </div>
                          <p className="text-sm truncate">
                            {renderNotificationContent(notification)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            { addSuffix: true }
                          )}
                        </p>

                        {/* Related Post (Truncated) */}
                        <div className="w-full truncate">
                          {renderRelatedPost(notification.relatedPost)}
                        </div>
                      </div>
                    </div>

                    {/* Buttons: Keep them from shifting */}
                    <div className="flex gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                          aria-label="Mark as read"
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        aria-label="Delete notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
