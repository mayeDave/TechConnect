import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";
import { sendCommentNotificationEmail } from "../nodemailer/email.js";

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({author:{$in: [...req.user.connections, req.user._id]}})
        .populate("author", "name username profilePicture headline")
        .populate("likes.user", "name username profilePicture")
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
		const { content, image } = req.body;
		let newPost;

		if (image) {
			const imgResult = await cloudinary.uploader.upload(image);
			newPost = new Post({
				author: req.user._id,
				content,
				image: imgResult.secure_url,
			});
		} else {
			newPost = new Post({
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

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
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
        .populate("likes.user", "name username profilePicture")
        .populate("comments.user", "name username profilePicture headline");
        
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
        .populate("author", "name email username profilePicture headline");

        // create a notification if the user who commented is not the author of the post
        if (post.author._id.toString() !== req.user._id.toString()) {
            const newNotification = new Notification({
                recipient: post.author,
                type: "comment",
                relatedUser: req.user._id,
                relatedPost: postId,
                
            });

            await newNotification.save();


            try {
                const postUrl = process.env.CLIENT_URL + "/post/" + postId;
                await sendCommentNotificationEmail(
                    post.author.email, 
                    post.author.name,
                    req.user.name, 
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

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const userId = req.user._id;

        if (post.likes.includes(userId)) {
            // if the user already liked the post, used to unlike the post
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            // if the user has not liked the post, used to like the post
            post.likes.push(userId);
            // create a notification if the user who liked is not the author of the post
            if (post.author.toString() !== userId.toString()) {
                const newNotification = new Notification({
                    recipient: post.author,
                    type: "like",
                    relatedUser: userId,
                    relatedPost: postId,
                });
                await newNotification.save();
            }
        }
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error("Error in likePost controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};