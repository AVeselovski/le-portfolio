import type { ITranslation } from "../../types";

type Props = {
  children: JSX.Element;
  t: ITranslation;
};

function PostsHeader({ children, t = {} }: Props) {
  return (
    <header className="mb-8">
      <p className="text-lg mb-10 bg-gray-100 rounded-md p-2 px-3">
        {t.blogDescription}
      </p>
      {children}
    </header>
  );
}

export default PostsHeader;
