import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

   export const useAuthStore = create((set) => ({
        authUser: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
        isCheckingAuth: true,
        message: null,

        checkAuth: async () => {
            set({ isCheckingAuth: true });
            try {
                const res = await axiosInstance.get("/auth/me");
                set({ authUser: res.data, isAuthenticated: true, isCheckingAuth: false });
            } catch (error) {
                set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            } 
        },
        signup: async (name, username, email, password) => {
            set({ isLoading: true });
            try {
                const res = await axiosInstance.post("/auth/signup", { name, username, email, password });
                set({ authUser: res.data, isAuthenticated: true, isLoading: false });
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
                throw error;
            }
        },
        login: async ( username, password ) => {
            set({ isLoading: true });
            try {
                const res = await axiosInstance.post("/auth/login", { username, password });
                set({ authUser: res.data, isAuthenticated: true, isLoading: false, error: null });
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
                throw error
            }
        },
        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser: null, isAuthenticated: false, error: null, isLoading: false });
            } catch (error) {
                set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			    throw error;
            }
        },
        verifyEmail: async (code) => {
            set({isLoading: true});
            try{
                const res = await axiosInstance.post("/auth/verify-email", {code});
                set({ authUser: res.data, isAuthenticated: true, isLoading: false });
			    return res.data;
            } catch (error) {
                set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            }
        },
        forgotPassword: async (email) => {
            set({ isLoading: true});
            try {
                const res = await axiosInstance.post("/auth/forgot-password", {email});
                set({ message: res.data.message, isLoading: false });
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
            }
        },
        resetPassword: async (token, password) => {
            set({ isLoading: true});
            try {
                const res = await axiosInstance.post(`/auth/reset-password/${token}`, {password});
                set({ message: res.data.message, isLoading: false });
            } catch (error) {
                set({ error: error.response.data.message, isLoading: false });
            }
        },
   }));
        