import React from "react";
import ContentLoader from "react-content-loader";

const TextLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={100}
    height={36}
    viewBox="0 0 100 36"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="199" y="454" rx="0" ry="0" width="23" height="0" />
    <rect x="6" y="3" rx="13" ry="13" width="87" height="27" />
  </ContentLoader>
);

export default TextLoader;
