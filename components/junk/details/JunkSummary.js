import Image from "next/image";

export default function JunkSummary({ image, title, updatedAt }) {
  const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <header className="mb-6">
      <img className="mb-6 rounded-md" src={"/" + image} alt="" />
      <div>
        <h2 className="text-4xl">{title}</h2>
        <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span>
      </div>
    </header>
  );
}
