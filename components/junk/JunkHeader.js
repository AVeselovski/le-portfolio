import { useContext } from "react";

import I18nContext from "../../store/i18n";

export default function JunkHeader({ children }) {
  const { t } = useContext(I18nContext);

  return (
    <header className="mb-4">
      <p className="text-lg mb-6 bg-gray-100 rounded-md p-2 px-3">
        {t.blogDescription}
      </p>
      {children}
    </header>
  );
}
