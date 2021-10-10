import Image from "next/image";

export default function JunkSummary({ image, slug, title, updatedAt }) {
  const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const imagePath = `/images/junk/${slug}/${image}`;

  return (
    <header className="mb-6">
      <div className="image-container mb-6">
        <Image
          alt={title}
          className="image rounded-md"
          layout="fill"
          priority
          src={imagePath}
        />
      </div>
      <div>
        <h2 className="text-4xl">{title}</h2>
        <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span>
      </div>
    </header>
  );
}
