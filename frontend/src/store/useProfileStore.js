import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import useNetworkStore from "./useNetworkStore"; // Import the network store

export const useProfileStore = create((set, get) => ({
  userProfile: null,
  connectionStatus: null,
  isLoading: false,
  error: null,

  // Fetch a specific user profile
  fetchUserProfile: async (username) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/users/${username}`);
      set({ userProfile: res.data, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch user profile",
        isLoading: false,
      });
    }
  },

  // Update profile
  updateProfile: async (updatedData) => {
    try {
      // Send the update request
      await axiosInstance.put("/users/profile", updatedData);

      // Notify the user of success
      toast.success("Profile updated successfully");

      // Immediately update the local state
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          ...updatedData, // Merge the updated data into the existing user profile
        },
      }));
    } catch (error) {
      // Handle errors
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  },

  // Fetch connection status
  fetchConnectionStatus: async (userId) => {
    try {
      const res = await axiosInstance.get(`/connections/status/${userId}`);
      set({ connectionStatus: res.data });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch connection status",
      });
    }
  },

  // Connection actions
  sendConnectionRequest: async (userId) => {
    try {
      await axiosInstance.post(`/connections/request/${userId}`);
      toast.success("Connection request sent");
      get().fetchConnectionStatus(userId);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send connection request"
      );
    }
  },
  acceptRequest: async (requestId, userId) => {
    try {
      await axiosInstance.put(`/connections/accept/${requestId}`);
      toast.success("Connection request accepted");

      // Fetch multiple functions from the network store
      const {
        fetchConnectionRequests,
        fetchConnections,
        fetchConnectionStatus,
        fetchRecommendedUsers,
      } = useNetworkStore.getState();

      // Call the relevant functions
      await fetchConnectionRequests();
      await fetchConnections();
      await fetchConnectionStatus(userId);
      await fetchRecommendedUsers();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to accept connection request"
      );
    }
  },
  rejectRequest: async (requestId, userId) => {
    try {
      await axiosInstance.put(`/connections/reject/${requestId}`);
      toast.success("Connection request rejected");
      
      // Fetch multiple functions from the network store
      const {
        fetchConnectionRequests,
        fetchConnections,
        fetchConnectionStatus,
        fetchRecommendedUsers,
      } = useNetworkStore.getState();

      // Call the relevant functions
      await fetchConnectionRequests();
      await fetchConnections();
      await fetchConnectionStatus(userId);
      await fetchRecommendedUsers();

      
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject connection request"
      );
    }
  },
  removeConnection: async (userId) => {
    try {
      await axiosInstance.delete(`/connections/${userId}`);
      toast.success("Connection removed");

      // Fetch multiple functions from the network store
      const {
        fetchConnections,
        fetchConnectionStatus,
        fetchRecommendedUsers,
      } = useNetworkStore.getState();

      // Call the relevant functions
      await fetchConnections();
      await fetchConnectionStatus(userId);
      await fetchRecommendedUsers();

      // Fetch connection status for the specific user
      get().fetchConnectionStatus(userId);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove connection"
      );
    }
  },
}));
