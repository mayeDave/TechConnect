import { create } from "zustand";
import {axiosInstance} from "../lib/axios";

const useCollaborationStore = create((set) => ({
  collaborations: [],
  loading: false,
  error: null,

  fetchCollaborations: async (search = "", includeConnected = false) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axiosInstance.get("/users/collaborators", {
        params: { search, includeConnected },
      });
      set({ collaborations: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch collaborations:", error);
      set({ error: "Failed to load collaborations", loading: false });
    }
  },
}));

export default useCollaborationStore;
