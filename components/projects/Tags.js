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
