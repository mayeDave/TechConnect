import { create } from "zustand";
import axios from "axios";

const useTechNewsStore = create((set, get) => ({
  news: [], // Array to store the news articles
  currentPage: 1, // Current page of pagination
  totalPages: 1, // Total number of pages (provided by the server)
  isLoading: false, // Loading state
  error: null, // Error message

  // Fetch tech news with pagination and append new articles
  fetchTechNews: async (page = 1) => {
    const { news } = get(); // Get current news state
    set({ isLoading: true, error: null }); // Reset loading and error state

    try {
      const response = await axios.get("http://localhost:6060/api/v1/rss/multiple", {
        params: { page }, // Send page parameter to the server
      });

      const { articles, totalPages } = response.data;

      // Merge new articles with existing ones, avoiding duplicates using the link as a unique identifier
      const uniqueArticles = articles.filter(
        (article) => !news.some((existing) => existing.link === article.link)
      );

      set({
        news: [...news, ...uniqueArticles], // Append unique articles
        currentPage: page, // Update the current page
        totalPages, // Update total pages
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching news:", error.message);
      set({ error: error.message, isLoading: false });
    }
  },

  // Change page and fetch news
  changePage: async (newPage) => {
    const { currentPage, totalPages } = get();

    // Ensure valid page navigation
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      await get().fetchTechNews(newPage); // Fetch news for the new page
    }
  },

  // Reset the store to its initial state
  resetStore: () => {
    set({
      news: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
    });
  },
}));

export default useTechNewsStore;
