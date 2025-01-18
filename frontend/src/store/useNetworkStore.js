// stores/networkStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useNetworkStore = create((set, get) => ({
  connectionRequests: [],
  connections: [],
  recommendedUsers: [],
  displayedUsers: [],
  connectionStatuses: {},

  // Fetch connection requests
  fetchConnectionRequests: async () => {
    try {
      const { data } = await axiosInstance.get("/connections/requests");
      set({ connectionRequests: data });
    } catch (error) {
      console.error("Failed to fetch connection requests:", error);
    }
  },

  // Fetch all user connections
  fetchConnections: async () => {
    try {
      const { data } = await axiosInstance.get("/connections");
      set({ connections: data });
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  },

  // Fetch recommended users
  fetchRecommendedUsers: async () => {
    try {
      const { data } = await axiosInstance.get("/users/suggestions");
      set({ recommendedUsers: data, displayedUsers: data.slice(0, 3) });

    } catch (error) {
      console.error("Failed to fetch recommended users:", error);
    }
  },

  // Fetch connection status
  fetchConnectionStatus: async (userId) => {
    try {
      const { connectionStatuses } = get();
      if (connectionStatuses[userId]) return connectionStatuses[userId]; // Cached

      const { data } = await axiosInstance.get(`/connections/status/${userId}`);
      set((state) => ({
        connectionStatuses: { ...state.connectionStatuses, [userId]: data },
      }));
      return data;
    } catch (error) {
      console.error("Failed to fetch connection status:", error);
    }
  },

  // Send connection request
  sendConnectionRequest: async (userId) => {
    try {
      await axiosInstance.post(`/connections/request/${userId}`);
      toast.success("Connection request sent successfully");

      // Update connection status
      set((state) => ({
        connectionStatuses: {
          ...state.connectionStatuses,
          [userId]: { status: "pending" },
        },
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send request");
    }
  },

  // Accept connection request
  acceptConnectionRequest: async (requestId) => {
    try {
      await axiosInstance.put(`/connections/accept/${requestId}`);
      toast.success("Connection request accepted");

      // Update state
      set((state) => ({
        connectionRequests: state.connectionRequests.filter(
          (req) => req.id !== requestId
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to accept request");
    }
  },

  // Reject connection request
  rejectConnectionRequest: async (requestId) => {
    try {
      await axiosInstance.put(`/connections/reject/${requestId}`);
      toast.success("Connection request rejected");

      // Update state
      set((state) => ({
        connectionRequests: state.connectionRequests.filter(
          (req) => req.id !== requestId
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reject request");
    }
  },
}));

export default useNetworkStore;
