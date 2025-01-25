import express from "express";
import { fetchRSSFeed, fetchMultipleFeeds } from "../services/rss.service.js";

const router = express.Router();

// Single RSS Feed
router.get("/", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const url = "http://feeds.bbci.co.uk/news/technology/rss.xml"; // BBC RSS Feed
    const articles = await fetchRSSFeed(url);

    // Add unique id using the link
    const articlesWithId = articles.map((article) => ({
      ...article,
      id: article.link, // Use the link as the unique ID
    }));

    // Pagination
    const articlesPerPage = 9;
    const totalPages = Math.ceil(articlesWithId.length / articlesPerPage);
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = page * articlesPerPage;
    const paginatedArticles = articlesWithId.slice(startIndex, endIndex);

    res.json({
      articles: paginatedArticles,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching single feed:", error.stack);
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

// Multiple RSS Feeds
router.get("/multiple", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const urls = [
      "https://feeds.bbci.co.uk/news/technology/rss.xml",
      "https://www.engadget.com/rss.xml",
      "https://www.cnet.com/rss/news/",
      "https://www.digitaltrends.com/feed/",
      "https://www.theguardian.com/technology/rss",
    ];

    // Fetch and combine articles from all feeds
    const allArticles = await fetchMultipleFeeds(urls);

    // Add unique id using the link
    const articlesWithId = allArticles.map((article) => ({
      ...article,
      id: article.link, // Use the link as the unique ID
    }));

    // Sort articles by publication date
    const sortedArticles = articlesWithId.sort(
      (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    );

    // Pagination
    const articlesPerPage = 9;
    const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = page * articlesPerPage;
    const paginatedArticles = sortedArticles.slice(startIndex, endIndex);

    res.json({
      articles: paginatedArticles,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching multiple feeds:", error.stack);
    res.status(500).json({ error: "Failed to fetch RSS feeds" });
  }
});

export default router;
