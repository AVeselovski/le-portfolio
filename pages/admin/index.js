// domain.com/admin
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import { updateTags } from "../../services/client";
import { getAllPosts, getAllProjects, getAllTags } from "../../lib/api-utils";
import NotificationContext from "../../store/notificatons";

import PinIcon from "../../components/icons/PinIcon";
import EditIcon from "../../components/icons/EditIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import Table from "../../components/ui/Table";
import TagsForm from "../../components/admin/TagsForm";

export default function Admin(props) {
  const t = props.translation;

  const [tags, setTags] = useState(props.tags);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  async function handleSubmitTags(tags) {
    try {
      setIsSubmitting(true);

      const updatedTags = await updateTags(tags);

      setTags(updatedTags);
      showNotification("Tags updated.", "success");
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <Head>
        <title>
          {t.adminName} | {siteConf.shortName}
        </title>
      </Head>

      <div className="container">
        <div className="item-button-container">
          <Link href="/admin/posts/new">
            <a className="item-button flex-1">
              <PlusIcon className="inline mr-1" size={18} /> Add new post
            </a>
          </Link>
          <Link href="/admin/projects/new">
            <a className="item-button flex-1">
              <PlusIcon className="inline mr-1" size={18} /> Add new project
            </a>
          </Link>
          <Link href="/admin/about">
            <a className="item-button flex-1">
              <EditIcon className="inline mr-1" size={18} /> Edit about
            </a>
          </Link>
        </div>

        <h2 className="text-2xl mb-4">Posts</h2>
        <Table className="mb-8">
          <Table.Head>
            <tr>
              <th>Title</th>
              <td className="md:px-0 text-gray-700">
                <PinIcon />
              </td>
            </tr>
          </Table.Head>
          <Table.Body>
            {props.posts.map((post) => (
              <tr key={post._id}>
                <th>{post.title}</th>
                <td className="md:px-1 md:w-12">
                  {post.pinned ? (
                    <span className="block rounded-full h-4 w-4 bg-blue-400"></span>
                  ) : (
                    <span className="block rounded-full h-4 w-4 bg-gray-100"></span>
                  )}
                </td>
                <td className="md:w-40">
                  <Link href={`/admin/posts/${post.slug}`}>
                    <a className="button ml-5 text-blue-500">Edit</a>
                  </Link>
                  <button className="button ml-5 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>

        <h2 className="text-2xl mb-4">Projects</h2>
        <Table className="mb-8">
          <Table.Head>
            <tr>
              <th>Title</th>
              <td className="md:px-0 text-gray-700">
                <PinIcon />
              </td>
            </tr>
          </Table.Head>
          <Table.Body>
            {props.projects.map((project) => (
              <tr key={project._id}>
                <th>{project.title}</th>
                <td className="md:px-1 md:w-12">
                  {project.pinned ? (
                    <span className="block rounded-full h-4 w-4 bg-blue-400"></span>
                  ) : (
                    <span className="block rounded-full h-4 w-4 bg-gray-100"></span>
                  )}
                </td>
                <td className="md:w-40">
                  <Link href={`/admin/projects/${project._id}`}>
                    <a className="button ml-5 text-blue-500">Edit</a>
                  </Link>
                  <button className="button ml-5 text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>

        <h2 className="text-2xl mb-4">Tags</h2>
        <TagsForm
          isSubmitting={isSubmitting}
          submitTags={handleSubmitTags}
          tags={tags}
          t={t}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ locale, req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/admin/auth",
        permanent: false,
      },
    };
  }

  const translation = getLocale(locale);
  const posts = await getAllPosts();
  const projects = await getAllProjects();
  const tags = await getAllTags();

  return {
    props: { posts, projects, tags, session, translation },
  };
}
