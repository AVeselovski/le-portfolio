export function TagSelector({ tags, selected, onSelect }) {
  const activeClasses = [
    "bg-gray-700",
    "border",
    "border-gray-700",
    "text-white",
  ];
  const inactiveClasses = [
    "bg-gray-300",
    "border",
    "border-gray-300",
    "text-gray-500",
  ];

  function getClasses(tag) {
    return selected.includes(tag) ? activeClasses : inactiveClasses;
  }

  return (
    <div className="tag-container">
      {tags.map((tag) => (
        <button key={tag} onClick={onSelect.bind(null, tag)}>
          <span className={`tag ${getClasses(tag).join(" ")}`}>{tag}</span>
        </button>
      ))}
    </div>
  );
}

function Tags({ tags = [] }) {
  return (
    <ul className="tag-container">
      {tags.map((s, i) => (
        <li key={`${i}-${s}`}>
          <span className="tag bg-gray-700 border border-gray-700 text-white">
            {s}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Tags;
