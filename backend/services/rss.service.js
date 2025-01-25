import xml2js from "xml2js";

const fetchRSS = async (url) => {
  const res = await fetch(url);
  const data = await res.text();
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(data);
};

export const fetchRSSFeed = async (url) => {
  try {
    const result = await fetchRSS(url);
    const items = result.rss.channel[0].item;

    return items.map((item) => {
      const image =
        item["media:thumbnail"]?.[0]?.$.url ||
        item["media:content"]?.[0]?.$.url ||
        item.enclosure?.[0]?.$.url ||
        null;

      return {
        title: item.title[0],
        link: item.link[0],
        content: item.description?.[0] || "",
        image,
        publishedDate: item.pubDate?.[0] || "",
      };
    });
  } catch (error) {
    console.error(`Error fetching RSS feed from ${url}:`, error.stack);
    throw new Error("Failed to fetch or parse RSS feed");
  }
};

export const fetchMultipleFeeds = async (urls) => {
  try {
    const feedResults = await Promise.allSettled(
      urls.map((url) => fetchRSSFeed(url))
    );

    // Filter out rejected promises and log errors
    const successfulFeeds = feedResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    const failedFeeds = feedResults.filter(
      (result) => result.status === "rejected"
    );

    failedFeeds.forEach((feed) => {
      console.error("Failed to fetch RSS feed:", feed.reason);
    });

    // Flatten the feeds into a single array
    return successfulFeeds.flat();
  } catch (error) {
    console.error("Unexpected error fetching multiple RSS feeds:", error.stack);
    throw new Error("Failed to fetch or parse RSS feeds");
  }
};

