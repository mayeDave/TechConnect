import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PostAction from "./PostAction";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Post = ({ post }) => {
	const { postId } = useParams();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState(post.comments || []);
	const isOwner = authUser._id === post.author._id;
	const isLiked = post.likes.includes(authUser._id);

	const queryClient = useQueryClient();

	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Comment added successfully");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to add comment");
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});

	const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
	};

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
				},
			]);
		}
	};

	return (
		<div className="bg-gradient-to-b from-[#243b6e] to-[#1e3a8a] rounded-lg shadow-lg mb-6">
	{/* Post Header */}
	<div className="p-4">
		<div className="flex items-center justify-between mb-4">
			{/* Author Info */}
			<div className="flex items-center">
				<Link to={`/profile/${post?.author?.username}`}>
					<LazyLoadImage
						src={post.author.profilePicture || "/avatar.png"}
						alt={post.author.name}
						className="w-10 h-10 rounded-full shadow-md mr-3"
					/>
				</Link>
				<div>
					<Link to={`/profile/${post?.author?.username}`}>
						<h3 className="font-semibold text-white">{post.author.name}</h3>
					</Link>
					<p className="text-xs text-gray-300">{post.author.headline}</p>
					<p className="text-xs text-gray-400">
						{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
					</p>
				</div>
			</div>
			{/* Delete Button */}
			{isOwner && (
				<button
					onClick={handleDeletePost}
					className="text-red-400 hover:text-red-600 transition-colors duration-200"
				>
					{isDeletingPost ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
				</button>
			)}
		</div>

		{/* Post Content */}
		<p className="text-white mb-4">{post.content}</p>
		{post.image && (
			<LazyLoadImage
				src={post.image}
				alt="Post content"
				className="rounded-lg w-full mb-4 shadow-md border border-gray-700"
			/>
		)}

		{/* Actions */}
		<div className="flex justify-between text-gray-400">
			<PostAction
				icon={
					<ThumbsUp
						size={18}
						className={isLiked ? "text-blue-500 fill-blue-300" : "hover:text-blue-400"}
					/>
				}
				text={`Like (${post.likes.length})`}
				onClick={handleLikePost}
			/>
			<PostAction
				icon={<MessageCircle size={18} className="hover:text-gray-300" />}
				text={`Comment (${comments.length})`}
				onClick={() => setShowComments(!showComments)}
			/>
			<PostAction icon={<Share2 size={18} className="hover:text-gray-300" />} text="Share" />
			{/* todo: send post link to friends or connections */}
		</div>
	</div>

	{/* Comments Section */}
	{showComments && (
		<div className="px-4 pb-4">
			{/* Existing Comments */}
			<div className="mb-4 max-h-60 overflow-y-auto space-y-2">
				{comments.map((comment) => (
					<div
						key={comment._id}
						className="bg-gray-800 p-3 rounded-lg flex items-start shadow-sm"
					>
						<LazyLoadImage
							src={comment.user.profilePicture || "/avatar.png"}
							alt={comment.user.name}
							className="w-8 h-8 rounded-full mr-3"
						/>
						<div className="flex-grow">
							<div className="flex items-center justify-between mb-1">
								<span className="font-semibold text-white mr-2">{comment.user.name}</span>
								<span className="text-xs text-gray-400">
									{formatDistanceToNow(new Date(comment.createdAt))}
								</span>
							</div>
							<p className="text-gray-300">{comment.content}</p>
						</div>
					</div>
				))}
			</div>

			{/* Add Comment Form */}
			<form onSubmit={handleAddComment} className="flex items-center">
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="Add a comment..."
					className="flex-grow p-3 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff] transition-shadow"
				/>
				<button
					type="submit"
					className="bg-[#00d9ff] text-white p-3 rounded-r-full hover:bg-[#00b4cc] transition duration-300"
					disabled={isAddingComment}
				>
					{isAddingComment ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
				</button>
			</form>
		</div>
	)}
</div>

	);
};
export default Post;