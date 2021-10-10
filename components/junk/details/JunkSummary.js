import Image from "next/image";

export default function JunkSummary({ image = null, slug, title, updatedAt }) {
  const humanReadableDate = new Date(updatedAt).toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const imagePath = `/images/junk/${slug}/${image?.src}`;
  const aspectRatio = image?.width / image?.height;
  const imageWidth = 752;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <header className="mb-6">
      {!!image?.height && (
        <div className="mb-6">
          <Image
            alt={title}
            className="rounded-md"
            priority
            height={imageHeight}
            width={imageWidth}
            src={imagePath}
          />
        </div>
      )}
      <div>
        <h2 className="text-4xl">{title}</h2>
        <span className="text-gray-500 text-sm">
          Last updated: {humanReadableDate}
        </span>
      </div>
    </header>
  );
}
