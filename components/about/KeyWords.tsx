import { useTranslation } from "../../store/i18n";

import styles from "./KeyWords.module.css";

import Tags from "../ui/Tags";

type Props = {
  hardSkills: string[];
  softSkills: string[];
};

export default function KeyWords({ softSkills = [], hardSkills = [] }: Props) {
  const { t } = useTranslation(); // hooky way (source is always default lang), left as example

  return (
    <section>
      <h2 className={styles.title}>{t.aboutKeywords}</h2>
      <Tags lightTags={softSkills} darkTags={hardSkills} />
    </section>
  );
}
