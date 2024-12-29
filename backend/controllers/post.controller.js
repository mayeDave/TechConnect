import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({author:{$in: req.user.connections}})
        .populate("author", "name username profilePicture, headline")
        .populate("likes", "name username profilePicture")
        .populate("comments.user", "name username profilePicture")
        .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error in getFeedPosts controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createPost = async (req, res) => {
    try {
        const {content, image} = req.body;

        let newPost;  

        if(image) {
            const imgResult = await cloudinary.uploader.upload(image);
            newPost = await Post.create({
                author: req.user._id,
                content,
                image: imgResult.secure_url
            });
        } else {
            newPost = await Post.create({
                author: req.user._id,
                content,
            });
        }
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error in createPost controller:", error);
        res.status(500).json({ message: "Server error" });
        }  
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized to delete this post" });
        }

        // delete the image from cloudinary
        if (post.image) {
            //cloudinary img template: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deletePost controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        .populate("author", "name username profilePicture headline")
        .populate("likes", "name username profilePicture")
        .populate("comments.user", "name username profilePicture");
        
        res.status(200).json(post);
    } catch (error) {
        console.error("Error in getPostById controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;
        const post = await Post.findByIdAndUpdate(postId, { $push: { comments: { content, user: req.user._id } } }, { new: true })
        .populate("author", "name username profilePicture headline");

        // create a notification if the user who commented is not the author of the post
        if (post.author.toString() !== req.user._id.toString()) {
            const newNotification = new Notification({
                recipient: post.author,
                type: "comment",
                relatedUser: req.user._id,
                relatedPost: post._id,
                
            });

            await newNotification.save();


            try {
                const postUrl = process.env.CLIENT_URL + "/post/" + postId;
                await sendCommentNotificationEmail(
                    post.author.email, 
                    post.author.username,
                    req.user.username, 
                    postUrl,
                    content
                );
                
            } catch (error) {
                console.error("Error in sending comment notification:", error);
            }
        }
        

        res.status(200).json(post);
    } catch (error) {
        console.error("Error in createComment controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};