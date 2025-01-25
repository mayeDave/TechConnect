import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useTechArticlesStore from "../store/useTechArticlesStore";

const TechArticlesPage = () => {
  const {
    articles,
    currentPage,
    totalPages,
    isLoading,
    error,
    fetchTechArticles,
    changePage,
  } = useTechArticlesStore();

  const observer = useRef();

  // Fetch the first page of articles on initial load
  useEffect(() => {
    if (articles.length === 0) fetchTechArticles(currentPage);
  }, []);

  // IntersectionObserver setup for infinite scrolling
  useEffect(() => {
    const lastArticle = document.querySelector("#last-article");
    if (isLoading || !lastArticle) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && currentPage < totalPages) {
          changePage(currentPage + 1);
          observer.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback, options);
    observer.current.observe(lastArticle);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, currentPage, totalPages]);

  // Error handling
  if (error) {
    return (
      <div className="text-center text-error">
        <span>Error: {error}</span>
        <button
          onClick={() => fetchTechArticles(currentPage)}
          className="btn btn-secondary mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  // No articles available
  if (articles?.length === 0 && !isLoading) {
    return (
      <div className="text-center">
        No programming articles available at the moment.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Programming Articles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.link} // Use unique identifier
            className="card bg-base-100 shadow-xl"
            id={index === articles.length - 1 ? "last-article" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover rounded-t-xl"
                loading="lazy" // Lazy load images
              />
            ) : (
              <div className="placeholder-image"></div>
            )}

            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    article.content?.length > 150
                      ? article.content.slice(0, 150) + "..."
                      : article.content,
                }}
                className="text-sm"
              ></p>
              <div className="card-actions justify-end">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Learn more
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="text-center mt-4">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default TechArticlesPage;
