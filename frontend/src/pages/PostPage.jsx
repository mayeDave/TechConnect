import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const PostPage = () => {
    const { postId } = useParams();
    const { post, fetchPost, isFetchingPost, error } = usePostStore();

	const { authUser } = useAuthStore();

    useEffect(() => {
        fetchPost(postId);
    }, [postId, fetchPost]);

    if (isFetchingPost) return <div>Loading post...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block lg:col-span-1">
                <Sidebar user={authUser} />
            </div>

            <div className="col-span-1 lg:col-span-3">
                <Post post={post} />
            </div>
        </div>
    );
};

export default PostPage;
