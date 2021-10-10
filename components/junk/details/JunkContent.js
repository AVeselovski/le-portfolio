import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function JunkContent({ content, slug }) {
  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        /***
         * This needs more work & thought. Ignoring for now.
         * How to provide proper dimensions without sacrificing Image performance?
         ***/

        return (
          <div className="p-3">
            <Image
              className="rounded-md"
              alt={image.alt}
              src={`/images/junk/${slug}/${image.properties.src}`}
              height={400}
              width={600}
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
