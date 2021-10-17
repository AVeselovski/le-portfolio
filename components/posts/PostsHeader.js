import { useContext } from "react";

import I18nContext from "../../store/i18n";

function PostsHeader({ children }) {
  const { t } = useContext(I18nContext);

  return (
    <header className="mb-8">
      <p className="text-lg mb-10 bg-gray-100 rounded-md p-2 px-3">
        {t.blogDescription}
      </p>
      {children}
    </header>
  );
}

export default PostsHeader;
