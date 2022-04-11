import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "뭉크(munc) 공식 온라인몰",
  description: "뭉크의 모든 신제품을 가장 빠르게 만나보세요!",
  keywords: "cosmetics, cosmetic products, makeup",
};

export default Meta;
