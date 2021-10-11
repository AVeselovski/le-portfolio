import Image from "next/image";
import ReactMarkdown from "react-markdown";

import siteConf from "../../data/config.json";
import profileImg from "../../public/images/profile.jpg";

import KeyWords from "./KeyWords";

export default function Content({ content = "" }) {
  return (
    <>
      <h1 className="text-4xl mb-10 text-center">{siteConf.name}</h1>
      <div className="flex justify-center">
        <div className="profile-image mb-10">
          <Image alt="Profile picture" placeholder="blur" src={profileImg} />
        </div>
      </div>
      <section className="markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
      <KeyWords
        softSkills={["Agile", "Scrum"]}
        hardSkills={[
          "JavaScript",
          "Node",
          "React",
          "NextJS",
          "Ruby on Rails",
          "SQL",
          "NoSQL",
        ]}
      />
    </>
  );
}
