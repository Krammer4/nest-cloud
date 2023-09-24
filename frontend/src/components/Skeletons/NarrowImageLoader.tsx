import React from "react";
import ContentLoader from "react-content-loader";

const NarrowImageLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={150}
    height={200}
    viewBox="0 0 150 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="2" rx="10" ry="10" width="144" height="196" />
    <rect x="199" y="454" rx="0" ry="0" width="23" height="0" />
  </ContentLoader>
);

export default NarrowImageLoader;
