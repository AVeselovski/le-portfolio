// domain.com/admin
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useContext, useState } from "react";
import { getSession } from "next-auth/client";

import siteConf from "../../data/config.json";
import { getLocale } from "../../locales";
import {
  updateTags,
  deletePost,
  deleteProject,
  getAllPosts as refetchPosts,
  getAllProjects as refetchProjects,
} from "../../services/client";
import { getAllPosts, getAllProjects, getAllTags } from "../../lib/api-utils";
import NotificationContext from "../../store/notificatons";

import PinIcon from "../../components/icons/PinIcon";
import EditIcon from "../../components/icons/EditIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import Table from "../../components/ui/Table";
import TagsForm from "../../components/admin/TagsForm";
import Dropdown from "../../components/ui/Dropdown";

export default function Admin(props) {
  const t = props.translation;

  const [posts, setPosts] = useState(props.posts);
  const [projects, setProjects] = useState(props.projects);
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
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  async function handleDeletePost(id) {
    try {
      setIsSubmitting(true);

      await deletePost(id);
      const posts = await refetchPosts();

      showNotification("Post deleted.", "warning");
      setPosts(posts);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error(error?.info?.message || error);
      showNotification(error?.info?.message || "Something went wrong!");
    }
  }

  async function handleDeleteProject(id) {
    try {
      setIsSubmitting(true);

      await deleteProject(id);
      const projects = await refetchProjects();

      showNotification("Project deleted.", "warning");
      setProjects(projects);
      setIsSubmitting(false);
    } catch (error) {
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
              <PlusIcon className="inline mr-1" size={18} />
              {t.adminAddNewPost}
            </a>
          </Link>
          <Link href="/admin/projects/new">
            <a className="item-button flex-1">
              <PlusIcon className="inline mr-1" size={18} />
              {t.adminAddNewProject}
            </a>
          </Link>
          <Link href="/admin/about">
            <a className="item-button flex-1">
              <EditIcon className="inline mr-1" size={18} />
              {t.adminEditAbout}
            </a>
          </Link>
        </div>

        <h2 className="text-2xl mb-4">{t.adminPosts}</h2>
        <Table className="mb-8">
          <Table.Head>
            <tr>
              <th>{t.postTitle}</th>
              <td className="md:px-0 text-gray-700">
                <PinIcon />
              </td>
            </tr>
          </Table.Head>
          <Table.Body>
            {posts.map((post) => (
              <tr key={post._id}>
                <th>{post.title}</th>
                <td className="md:px-1 md:w-12">
                  {post.pinned ? (
                    <span className="block rounded-full h-4 w-4 bg-blue-400"></span>
                  ) : (
                    <span className="block rounded-full h-4 w-4 bg-gray-100"></span>
                  )}
                </td>
                <td className="md:w-48">
                  <Link href={`/admin/posts/${post.slug}`}>
                    <a className="button ml-5 text-blue-500">{t.adminEdit}</a>
                  </Link>
                  <Dropdown
                    className="ml-5 text-red-500"
                    position="bottom"
                    toggleContent={t.adminDelete}
                  >
                    <div className="px-3 py-2 text-center">
                      <p className="font-medium mb-2 whitespace-nowrap">
                        {t.adminConfirmation}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="button px-2 py-1 border border-red-500 text-red-600 rounded whitespace-nowrap w-48"
                          onClick={handleDeletePost.bind(null, post._id)}
                        >
                          {t.adminConfirmDelete}
                        </button>
                      </div>
                    </div>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>

        <h2 className="text-2xl mb-4">{t.adminProjects}</h2>
        <Table className="mb-8">
          <Table.Head>
            <tr>
              <th>{t.projectTitle}</th>
              <td className="md:px-0 text-gray-700">
                <PinIcon />
              </td>
            </tr>
          </Table.Head>
          <Table.Body>
            {projects.map((project) => (
              <tr key={project._id}>
                <th>{project.title}</th>
                <td className="md:px-1 md:w-12">
                  {project.pinned ? (
                    <span className="block rounded-full h-4 w-4 bg-blue-400"></span>
                  ) : (
                    <span className="block rounded-full h-4 w-4 bg-gray-100"></span>
                  )}
                </td>
                <td className="md:w-48">
                  <Link href={`/admin/projects/${project._id}`}>
                    <a className="button ml-5 text-blue-500">{t.adminEdit}</a>
                  </Link>
                  <Dropdown
                    className="ml-5 text-red-500"
                    position="bottom"
                    toggleContent={t.adminDelete}
                  >
                    <div className="px-3 py-2 text-center">
                      <p className="font-medium mb-2 whitespace-nowrap">
                        {t.adminConfirmation}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="button px-2 py-1 border border-red-500 text-red-600 rounded whitespace-nowrap w-48"
                          onClick={handleDeleteProject.bind(null, project._id)}
                        >
                          {t.adminConfirmDelete}
                        </button>
                      </div>
                    </div>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </Table.Body>
        </Table>

        <h2 className="text-2xl mb-4">{t.adminTags}</h2>
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
