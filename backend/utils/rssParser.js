import Parser from "rss-parser";

const parser = new Parser();

export const parseRSSFeed = async (url) => {
  return await parser.parseURL(url);
};
