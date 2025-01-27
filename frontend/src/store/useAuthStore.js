import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
import { io } from "socket.io-client";


const BASE_URL = "http://localhost:6060";

   export const useAuthStore = create((set, get) => ({
        authUser: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
        isCheckingAuth: true,
        message: null,
        onlineUsers: [],
        socket: null,

        checkAuth: async () => {
            set({ isCheckingAuth: true, error: null });
            try {
                const res = await axiosInstance.get("/auth/me");
                set({ authUser: res.data, isAuthenticated: true, isCheckingAuth: false });
                get().connectSocket();
            } catch (error) {
                set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            } 
        },
        signup: async (name, username, email, password) => {
            set({ isLoading: true });
            try {
                const res = await axiosInstance.post("/auth/signup", { name, username, email, password });
                set({ authUser: res.data.user, isAuthenticated: true, isLoading: false });
                get().connectSocket();
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
                throw error;
            }
        },
        login: async ( username, password ) => {
            set({ isLoading: true, error: null });
            try {
                const res = await axiosInstance.post("/auth/login", { username, password });
                set({ authUser: res.data.user, isAuthenticated: true, isLoading: false, error: null });
                get().connectSocket();
            } catch (error) {
                set({ error: error.response?.data?.message, isLoading: false });
                throw error
            }
        },
        logout: async () => {
            set({ isLoading: true, error: null });
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser: null, isAuthenticated: false, error: null, isLoading: false });
                get().disconnectSocket();
            } catch (error) {
                set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			    throw error;
            }
        },
        verifyEmail: async (code) => {
            set({isLoading: true, error: null});
            try{
                const res = await axiosInstance.post("/auth/verify-email", {code});
                set({ authUser: res.data.user, isAuthenticated: true, isLoading: false });
                get().connectSocket();
			    return res.data;
            } catch (error) {
                set({ error: null, isCheckingAuth: false, isAuthenticated: false });
                throw error;
            }
        },
        forgotPassword: async (email) => {
            set({ isLoading: true, error: null });
            try {
                const res = await axiosInstance.post("/auth/forgot-password", {email});
                set({ message: res.data?.message, isLoading: false });
            } catch (error) {
                set({ error: error.response?.data?.message, isLoading: false });
                throw error;
            }
        },
        resetPassword: async (token, password, confirmPassword) => {
            set({ isLoading: true, error: null });
            try {
                const res = await axiosInstance.post(`/auth/reset-password/${token}`, {password, confirmPassword});
                set({ message: res.data.message, isLoading: false });
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
            }
        },

        connectSocket: () => {
            const { authUser } = get();
            if (!authUser || get().socket?.connected) return;

            const socket = io(BASE_URL, {
                query: {
                    userId: authUser._id,
                },
            });
            socket.connect();

            set({ socket:socket });

            socket.on("getOnlineUsers", (userIds) => {
                set({ onlineUsers: userIds });
              });
            },
        disconnectSocket: () => {
            if (get().socket?.connected) get().socket.disconnect();
        },
   }));
