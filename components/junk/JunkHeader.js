import siteConf from "../../data/config.json";

export default function JunkHeader({ children }) {
  return (
    <header className="mb-4">
      <p className="text-lg mb-6 bg-gray-100 rounded-md p-2 px-3">
        {siteConf.blogDescription}
      </p>
      {children}
    </header>
  );
}
