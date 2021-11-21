import { useTranslation } from "../../store/i18n";

type Props = {
  hardSkills: string[];
  softSkills: string[];
};

export default function KeyWords({ softSkills = [], hardSkills = [] }: Props) {
  const { t } = useTranslation(); // hooky way (source is always default lang), left as example

  return (
    <section>
      <h2 className="text-2xl mt-8 mb-6">{t.aboutKeywords}</h2>
      <ul className="tag-container">
        {softSkills.map((s, i) => (
          <li key={`${i}-${s}`}>
            <span className="tag bg-gray-100 border border-gray-700 text-black">
              {s}
            </span>
          </li>
        ))}
        {hardSkills.map((s, i) => (
          <li key={`${i}-${s}`}>
            <span className="tag bg-gray-700 border border-gray-700 text-white">
              {s}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
