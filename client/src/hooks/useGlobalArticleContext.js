import { useContext } from "react";

import { ArticleContext } from "../context/ArticleContext";

export const useGlobalArticleContext = () => {
  return useContext(ArticleContext);
};
