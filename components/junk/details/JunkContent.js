import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function JunkContent({ content, slug }) {
  const customRenderers = {
    // img(image) {
    //   return (
    //     <div className="image-container px-3">
    //       <Image
    //         className="image"
    //         alt={image.alt}
    //         src={`/images/junk/${slug}/${image.src}`}
    //         layout="fill"
    //       />
    //     </div>
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className="image-container p-3">
            <Image
              className="image rounded-md"
              alt={image.alt}
              src={`/images/junk/${slug}/${image.properties.src}`}
              layout="fill"
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children, inline } = code;
      if (inline) {
        return <code>{children}</code>;
      }
      const language = className?.split("-")[1] || null;

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <section className="mb-6">
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </section>
  );
}
