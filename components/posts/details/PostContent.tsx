import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import ghcolors from "react-syntax-highlighter/dist/cjs/styles/prism/ghcolors";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import ruby from "react-syntax-highlighter/dist/cjs/languages/prism/ruby";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import yml from "react-syntax-highlighter/dist/cjs/languages/prism/yaml";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("ruby", ruby);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("yml", yml);

type Props = {
  content: string;
  slug: string;
};

function PostContent({ content, slug }: Props) {
  const customRenderers: { [nodeType: string]: React.ElementType } = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        /***
         * This needs more work & thought. Ignoring for now.
         * How to provide proper dimensions without sacrificing Image performance?
         * Do I even want images here?
         ***/

        return (
          <div className="p-3">
            <Image
              className="rounded-md"
              alt={image.alt}
              src={`/images/posts/${slug}/${image.properties.src}`}
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
          style={ghcolors}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <section className="markdown">
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </section>
  );
}

export default PostContent;
