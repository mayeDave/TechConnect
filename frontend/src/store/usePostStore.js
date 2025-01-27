import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePostStore = create((set, get) => ({
    posts: [], // List of all posts
    post: null, // Single post details
    isDeleting: false,
    isCreating: false,
    isFetchingPosts: false,
    isFetchingPost: false,
    error: null,
    message: null,

    // Fetch all posts for the homepage
    fetchPosts: async () => {
        set({ isFetchingPosts: true });
        try {
            const res = await axiosInstance.get("/posts");
            set({ posts: res.data, isFetchingPosts: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch posts", isLoading: false });
        }
    },

    // Fetch a single post for the post page
    fetchPost: async (postId) => {
        set({ isFetchingPost: true });
        try {
            const res = await axiosInstance.get(`/posts/${postId}`);
            set({ post: res.data, isFetchingPost: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch post", isLoading: false });
        }
    },

    // Create a new post
    createPost: async (postData) => {
        set({ isCreating: true });
        try {
            const res = await axiosInstance.post("/posts/create", postData );
            //update the post list and render immediately
            set((state) => ({
                posts: [...state.posts, res.data],
                isCreating: false,
                message: "Post created successfully",
            }))
            get().fetchPosts();
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to create post", isLoading: false });
        }
    },

    // Delete a post
    deletePost: async (postId) => {
        set({ isDeleting: true });
        try {
            await axiosInstance.delete(`/posts/delete/${postId}`);
            set((state) => ({
                posts: state.posts.filter((post) => post._id !== postId),
                isDeleting: false,
                message: "Post deleted successfully",
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to delete post", isLoading: false });
        }
    },

    // Like a post
    likePost: async (postId, userId) => {
        try {
            await axiosInstance.post(`/posts/${postId}/like`);
    
            set((state) => {
                const isPostLiked = (post) => post.likes.includes(userId);
    
                return {
                    // Update the posts array
                    posts: state.posts.map((post) =>
                        post._id === postId
                            ? {
                                  ...post,
                                  likes: isPostLiked(post)
                                      ? post.likes.filter((id) => id !== userId) // Unlike
                                      : [...post.likes, userId], // Like
                              }
                            : post
                    ),
                    // Update the current single post
                    post:
                        state.post && state.post._id === postId
                            ? {
                                  ...state.post,
                                  likes: isPostLiked(state.post)
                                      ? state.post.likes.filter((id) => id !== userId) // Unlike
                                      : [...state.post.likes, userId], // Like
                              }
                            : state.post,
                };
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to like post" });
        }
    },
    
    

    // Add a comment to a post
    addComment: async (postId, commentContent) => {
        try {
            const res = await axiosInstance.post(`/posts/${postId}/comment`, { content: commentContent });
            set((state) => ({
                posts: state.posts.map((post) =>
                    post._id === postId ? { ...post, comments: [...post.comments, res.data] } : post
                ),
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to add comment" });
        }
    },
}));
