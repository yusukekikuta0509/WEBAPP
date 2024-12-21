import React from "react";

function PortfolioTemplate({ name, about, projects, contactInfo }) {
  return (
    <html>
      <head>
        <title>{name}のポートフォリオ</title>
        <style>
          {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          header {
            background: #091933;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .about, .portfolio, .contact {
            padding: 20px;
            max-width: 1200px;
            margin: 20px auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }
          .project {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
          }
          .contact-form input, .contact-form textarea {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          `}
        </style>
      </head>
      <body>
        <header>
          <h1>{name}のポートフォリオ</h1>
        </header>

        <section className="about">
          <h2>自己紹介</h2>
          <p>{about}</p>
        </section>

        <section className="portfolio">
          <h2>プロジェクト</h2>
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div key={index} className="project">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  プロジェクトを見る
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="contact">
          <h2>連絡先</h2>
          <p>{contactInfo.message}</p>
          <form className="contact-form">
            <input type="text" placeholder="名前" />
            <input type="email" placeholder="メールアドレス" />
            <textarea placeholder="メッセージ"></textarea>
            <button type="submit">送信</button>
          </form>
        </section>
      </body>
    </html>
  );
}

export default PortfolioTemplate;
