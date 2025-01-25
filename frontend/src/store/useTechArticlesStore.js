import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useTechArticlesStore = create((set, get) => ({
  articles: [], // Array to store programming articles
  currentPage: 1, // Current page of pagination
  totalPages: 1, // Total number of pages (provided by the server)
  isLoading: false, // Loading state
  error: null, // Error message

  // Fetch tech articles with pagination and append new ones
  fetchTechArticles: async (page = 1) => {
    const { articles } = get(); // Get current articles state
    set({ isLoading: true, error: null }); // Reset loading and error state

    try {
      const response = await axiosInstance.get("/rss/programming", {
        params: { page }, // Send page parameter to the server
      });

      const { articles: newArticles, totalPages } = response.data;

      // Merge new articles with existing ones, avoiding duplicates using the link as a unique identifier
      const uniqueArticles = newArticles.filter(
        (article) => !articles.some((existing) => existing.link === article.link)
      );

      set({
        articles: [...articles, ...uniqueArticles], // Append unique articles
        currentPage: page, // Update the current page
        totalPages, // Update total pages
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      set({ error: error.message, isLoading: false });
    }
  },

  // Change page and fetch articles
  changePage: async (newPage) => {
    const { currentPage, totalPages } = get();

    // Ensure valid page navigation
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      await get().fetchTechArticles(newPage); // Fetch articles for the new page
    }
  },

  // Reset the store to its initial state
  resetStore: () => {
    set({
      articles: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
    });
  },
}));

export default useTechArticlesStore;
