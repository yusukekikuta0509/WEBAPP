import React from "react";
import ReactDOMServer from "react-dom/server";
import EcPageTemplate from "./templates/EcPageTemplate";
import PortfolioTemplate from "./templates/PortfolioTemplate";
import BlogTemplate from "./templates/BlogTemplate";

export function generateTemplate(data) {
  const { template_type } = data;

  let html;
  switch (template_type) {
    case "ec":
      html = ReactDOMServer.renderToStaticMarkup(
        <EcPageTemplate
          title={data.title}
          heroText={data.heroText}
          heroImage={data.heroImage}
          products={data.products}
          footerText={data.footerText}
        />
      );
      break;
    case "portfolio":
      html = ReactDOMServer.renderToStaticMarkup(
        <PortfolioTemplate
          name={data.name}
          about={data.about}
          projects={data.projects}
          contactInfo={data.contactInfo}
        />
      );
      break;
    case "blog":
      html = ReactDOMServer.renderToStaticMarkup(
        <BlogTemplate siteTitle={data.siteTitle} articles={data.articles} />
      );
      break;
    default:
      throw new Error("無効なテンプレートタイプが選択されました");
  }

  return `<!DOCTYPE html>${html}`;
}
