import React from "react";

function BlogTemplate({ siteTitle, articles }) {
  return (
    <html>
      <head>
        <title>{siteTitle}</title>
        <style>
          {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          header {
            background: #5E0B4D;
            color: white;
            text-align: center;
            padding: 20px;
          }
          .article-list {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .article {
            border-bottom: 1px solid #ddd;
            padding: 15px 0;
          }
          .article h2 {
            margin: 0 0 10px;
          }
          `}
        </style>
      </head>
      <body>
        <header>
          <h1>{siteTitle}</h1>
        </header>

        <div className="article-list">
          {articles.map((article, index) => (
            <div key={index} className="article">
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                続きを読む
              </a>
            </div>
          ))}
        </div>
      </body>
    </html>
  );
}

export default BlogTemplate;
