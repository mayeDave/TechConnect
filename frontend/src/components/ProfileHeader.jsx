import { useState, useEffect } from "react";
import { Camera, MapPin, UserCheck, UserPlus, X, Clock } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useProfileStore } from "../store/useProfileStore";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate(); // For navigation
  const { setSelectedUser } = useChatStore(); // Chat store function to set the selected user
  const { onlineUsers } = useAuthStore();

  const handleSendMessage = () => {
    setSelectedUser(userData); // Set the selected user in the chat store
    navigate("/chat"); // Navigate to the ChatPage
  };

	 const {
    connectionStatus,
    sendConnectionRequest,
    acceptRequest,
    rejectRequest,
    removeConnection,
	fetchConnectionStatus,
  } = useProfileStore();

  useEffect(() => {
    if (!isOwnProfile) fetchConnectionStatus(userData._id);
  }, [isOwnProfile, fetchConnectionStatus, userData._id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({ ...prev, [event.target.name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const renderConnectionButton = () => {
    const baseClass =
      "text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center";
    switch (connectionStatus?.status) {
      case "connected":
        return (
          <div className="flex gap-2 justify-center">
            <div className={`${baseClass} bg-green-500 hover:bg-green-600`}>
              <UserCheck size={20} className="mr-2" />
              Connected
            </div>
            <button
              className={`${baseClass} bg-red-500 hover:bg-red-600 text-sm`}
              onClick={() => removeConnection(userData._id)}
            >
              <X size={20} className="mr-2" />
              Remove Connection
            </button>
          </div>
        );

      case "pending":
        return (
          <button className={`${baseClass} bg-yellow-500 px-2 m-1 py-3 font-bold w-full hover:bg-yellow-600`}>
            <Clock size={20} className="mr-2" />
            Pending
          </button>
        );

      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(connectionStatus.requestId)}
              className={`${baseClass} bg-green-500 hover:bg-green-600`}
            >
              Accept
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.requestId)}
              className={`${baseClass} bg-red-500 hover:bg-red-600`}
            >
              Reject
            </button>
          </div>
        );

      default:
        return (
          <button
            onClick={() => sendConnectionRequest(userData._id)}
            className={`${baseClass} bg-base-100 px-2 m-1 py-3 font-bold w-full hover:bg-primary-dark`}
          >
            <UserPlus size={20} className="mr-2" />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="bg-base-300 shadow rounded-lg mb-6">
      {/* Banner Image */}
      <div
        className="relative h-48 rounded-t-lg bg-cover bg-center"
        style={{
          backgroundImage: `url('${editedData.bannerImg || userData.bannerImg || "/banner.png"}')`,
        }}
      >
        {isEditing && (
          <label className="absolute top-2 right-2 bg-base-100 p-2 rounded-full shadow cursor-pointer">
            <Camera size={20} />
            <input
              type="file"
              className="hidden"
              name="bannerImg"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="relative -mt-20 mb-4">
          <div className="relative">
          <LazyLoadImage
            className="w-32 h-32 rounded-full mx-auto object-cover"
            src={editedData.profilePicture || userData.profilePicture || "/avatar.png"}
            alt={userData.name}
          />
          {onlineUsers?.includes(userData._id) && (
                <span
                  className="absolute bottom-1/4 right-1/2 transform translate-x-16 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
          </div>
          
          {isEditing && (
            <label className="absolute bottom-0 right-1/2 transform translate-x-16 bg-base-100 p-2 rounded-full shadow cursor-pointer">
              <Camera size={25} />
              <input
                type="file"
                className="hidden"
                name="profilePicture"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          )}
        </div>

        <div className="text-center mb-4">
          {isEditing ? (
            <input
              type="text"
              value={editedData.name ?? userData.name}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              className="text-2xl font-bold mb-2 text-center w-full bg-base-100"
            />
          ) : (
            <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={editedData.headline ?? userData.headline}
              onChange={(e) => setEditedData({ ...editedData, headline: e.target.value })}
              className=" bg-base-100 text-center w-full"
            />
          ) : (
            <p>{userData.headline}</p>
          )}

          <div className="flex justify-center items-center mt-2">
            <MapPin size={16} className="text-base-content mr-1" />
            {isEditing ? (
              <input
                type="text"
                value={editedData.location ?? userData.location}
                onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                className="bg-base-100 text-center"
              />
            ) : (
              <span>{userData.location}</span>
            )}
          </div>
        </div>

        {/* Send Message Button */}
        {!isOwnProfile && (
          <div className="flex justify-center my-4">
            <button
              onClick={handleSendMessage}
              className="text-white bg-blue-500 hover:bg-blue-600 px-2 m-1 py-3 font-bold w-full rounded-full"
            >
              Send Message
            </button>
          </div>
        )}

        {/* Edit Button or Connection Status */}
        {isOwnProfile ? (
          isEditing ? (
            <button
              className="w-full bg-base-200 py-2 px-4 rounded-full hover:bg-primary-dark transition duration-300"
              onClick={handleSave}
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-base-200 py-2 m-1 px-4 rounded-full hover:bg-primary-dark transition duration-300"
            >
              Edit Profile
            </button>
          )
        ) : (
          <div className="flex justify-center ">{renderConnectionButton()}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
