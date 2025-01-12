import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useNotificationStore = create((set) => ({
  notifications: [],
  isNotificationsLoading: false,

  // Fetch all notifications
  getNotifications: async () => {
    set({ isNotificationsLoading: true });
    try {
      const res = await axiosInstance.get("/notifications");
      set({ notifications: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isNotificationsLoading: false });
    }
  },

  // Mark a notification as read
  markAsRead: async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification._id === id ? { ...notification, read: true } : notification
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Delete a notification
  deleteNotification: async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification._id !== id
        ),
      }));
      toast.success("Notification deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
