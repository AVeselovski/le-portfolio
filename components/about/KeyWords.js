export default function KeyWords({ softSkills = [], hardSkills = [] }) {
  return (
    <section>
      <h2 className="text-2xl mt-8 mb-6">Relevant key words</h2>
      <ul className="tag-container">
        {softSkills.map((s) => (
          <li>
            <span className="tag bg-gray-100 border border-gray-700 text-black">
              {s}
            </span>
          </li>
        ))}
        {hardSkills.map((s) => (
          <li>
            <span className="tag bg-gray-700 border border-gray-700 text-white">
              {s}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
