import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import useNetworkStore from "../store/useNetworkStore";
import { usePostStore } from "../store/usePostStore";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import DisplayedUsers from "../components/DisplayedUsers";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import DisplayedUsersSkeleton from "../components/skeletons/DisplayedUsersSkeleton";

const HomePage = () => {
  const { authUser } = useAuthStore(); // Importing from authStore
  const { displayedUsers, fetchRecommendedUsers } = useNetworkStore(); // Importing from networkStore
  const { posts, fetchPosts, isFetchingPosts } = usePostStore(); // Placeholder for post store integration

  useEffect(() => {
    fetchPosts();
    fetchRecommendedUsers();
  }, [fetchPosts, fetchRecommendedUsers]);

  // Skeleton loader for posts and sidebar
  if (isFetchingPosts) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
        

        <PostSkeleton />

        <DisplayedUsersSkeleton />

        
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      {/* Posts Section */}
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {/* Recommended Users */}
      {displayedUsers?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-base-300 rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {displayedUsers?.map((user) => (
              <DisplayedUsers key={user._id} user={user} />
            ))}
            <Link
              to="/network"
              className="block mt-4 bg-base-100 w-full text-center py-2 rounded hover:bg-base-200"
            >
              View more users
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
