import React from "react";

function EcPageTemplate({ title, heroText, heroImage, products, footerText }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            header {
              background: #5E0B4D;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .hero {
              background: url(${heroImage}) no-repeat center center/cover;
              color: white;
              text-align: center;
              padding: 100px 20px;
            }
            .hero h1 {
              font-size: 3rem;
              margin: 0;
            }
            .product-list {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
              padding: 20px;
              max-width: 1200px;
              margin: 0 auto;
            }
            .product-card {
              background: white;
              border: 1px solid #ddd;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .product-card img {
              max-width: 100%;
              height: auto;
            }
            .product-card h3 {
              margin: 15px 0;
            }
            .footer {
              background: #333;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
          `}
        </style>
      </head>
      <body>
        {/* ヘッダー */}
        <header>
          <h1>{title}</h1>
        </header>

        {/* ヒーローセクション */}
        <div className="hero">
          <h1>{heroText}</h1>
        </div>

        {/* 商品一覧 */}
        <section className="product-list">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>価格: {product.price}円</p>
            </div>
          ))}
        </section>

        {/* フッター */}
        <footer className="footer">
          <p>{footerText}</p>
        </footer>
      </body>
    </html>
  );
}

export default EcPageTemplate;

