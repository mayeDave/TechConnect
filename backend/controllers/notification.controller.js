import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "relatedUser",
                select: "name username profilePicture",
                match: { isVerified: true }, // Optional: Only include verified users
            })
            .populate("relatedPost", "content image");

        // Filter out notifications where relatedUser or relatedPost is null
        const validNotifications = notifications.filter(notification => 
            notification.relatedUser !== null && notification.relatedPost !== null
        );

        res.status(200).json(validNotifications);
    } catch (error) {
        console.error("Error in getUserNotifications controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        
        const notification = await Notification.findByIdAndUpdate(
            { _id: notificationId, recipient: req.user._id },
            { read: true },
            { new: true }
        )

        res.status(200).json(notification);
    } catch (error) {
        console.error("Error in markNotificationAsRead controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        
        await Notification.findOneAndDelete({
             _id: notificationId, 
             recipient: req.user._id 
            });

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error in deleteNotification controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
        