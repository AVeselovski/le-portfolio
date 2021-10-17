// domain.com/junkyard
import Head from "next/head";

import siteConf from "../../data/config.json";
import en from "../../locales/en.json";
import fi from "../../locales/fi.json";
import { readAllPosts, readAllTags } from "../../lib/api-utils";

import PostsHeader from "../../components/posts/PostsHeader";
import PostTags from "../../components/posts/PostTags";
import PostList from "../../components/posts/PostList";

export default function Junkyard({ posts = [], tags = [], translation }) {
  const t = translation;

  return (
    <>
      <Head>
        <title>
          {t.blogName} | {siteConf.name}
        </title>
        <meta description={t.blogDescription} />
      </Head>

      <div className="container">
        <PostsHeader>
          <PostTags tags={tags} />
        </PostsHeader>

        <PostList posts={posts} />
      </div>
    </>
  );
}

/** The static generation way. */
export async function getStaticProps({ locale }) {
  /*** File based example:
   * const filePath = path.join(process.cwd(), "data", "dummy_data.json");
   * const jsonData = await fs.readFile(filePath);
   * const data = JSON.parse(jsonData);
   ***/

  const allTags = readAllTags();
  const allPosts = readAllPosts();
  const translation = locale === "en" ? en : fi;

  if (!allPosts) {
    return {
      // notFound: true,
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { posts: allPosts, tags: allTags, translation },
    revalidate: 30,
  };
}
