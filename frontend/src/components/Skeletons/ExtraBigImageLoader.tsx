import React from "react";
import ContentLoader from "react-content-loader";

const ExtraBigLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={400}
    height={300}
    viewBox="0 0 400 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="3" rx="10" ry="10" width="389" height="289" />
    <rect x="199" y="454" rx="0" ry="0" width="23" height="0" />
  </ContentLoader>
);

export default ExtraBigLoader;
