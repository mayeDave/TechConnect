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

  // Fetch all relevant data
  fetchAllData: async (userId) => {
    await Promise.all([
      // get().fetchConnectionRequests(),
      get().fetchConnections(),
      get().fetchConnectionStatus(userId),
      get().fetchRecommendedUsers(),
    ]);
  },

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
      set((state) => ({
        recommendedUsers: data,
        displayedUsers: data.slice(0, 3),
        connectionStatuses: {
          ...state.connectionStatuses, // Preserve existing statuses
          ...data.reduce((acc, user) => {
            acc[user._id] = acc[user._id] || null; // Avoid overwriting if already fetched
            return acc;
          }, {}),
        },
      }));
      

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
      console.log(`Fetched status for ${userId}:`, data);
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
      }))
      
      // Fetch all related data to update the UI
      await get().fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send request");
    }
  },

  // Accept connection request
  acceptConnectionRequest: async (requestId, userId) => {
    try {
      await axiosInstance.put(`/connections/accept/${requestId}`);
      toast.success("Connection request accepted");
  
      // Update the specific user's connection status
      set((state) => ({
        connectionStatuses: {
          ...state.connectionStatuses,
          [userId]: { status: "connected" }, // Ensure status matches your backend
        },
      }));
  
      // Optional: Re-fetch related data if needed
      await get().fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to accept request");
    }
  },
  
  // Reject connection request
  rejectConnectionRequest: async (requestId, userId) => {
    try {
      await axiosInstance.put(`/connections/reject/${requestId}`);
      toast.success("Connection request rejected");

      // Update state
      set((state) => ({
        connectionStatuses: {
          ...state.connectionStatuses,
          [userId]: { status: "rejected" },
        },
      }))
      // Fetch all related data to update the UI
      await get().fetchAllData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reject request");
    }
  },
}));

export default useNetworkStore;
