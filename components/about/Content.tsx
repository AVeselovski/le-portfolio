import Image from "next/image";
import ReactMarkdown from "react-markdown";

import profileImg from "../../public/images/profile.jpg";
import styles from "./Content.module.css";

import KeyWords from "./KeyWords";

type Props = {
  content: string;
  hardSkills: string[];
  softSkills: string[];
};

export default function Content({
  content = "",
  hardSkills = [],
  softSkills = [],
}: Props) {
  return (
    <>
      <div className="flex justify-center">
        <div className={`${styles.profileImage} mb-10`}>
          <Image alt="Profile picture" placeholder="blur" src={profileImg} />
        </div>
      </div>
      <section className="markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
      <KeyWords softSkills={softSkills} hardSkills={hardSkills} />
    </>
  );
}
