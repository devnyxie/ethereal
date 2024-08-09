import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import rehypePrism from "rehype-prism-plus";
import rehypePrettyCode from "rehype-pretty-code";

const rehypeAddStyles = () => {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "pre") {
        if (node.properties) {
          const classes =
            "relative rounded-sm border p-2 mt-2 mb-2 overflow-x-auto";
          if (node.properties.class) {
            node.properties.class += classes;
          } else {
            node.properties = { class: classes, ...node.properties };
          }
        }
      } else if (node.tagName === "ul" || node.tagName === "ol") {
        node.properties = { ...node.properties, class: "list-inside" };
      } else if (node.tagName === "blockquote") {
        node.properties = {
          ...node.properties,
          class: "text-lg italic border-l-4 border-gray-300 pl-4 py-2 mb-4",
        };
      }
    });
  };
};

const parseMarkdown = async (markdownContent: string) => {
  let html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    // .use(rehypePrism)
    .use(rehypePrettyCode, {
      theme: {
        dark: "aurora-x",
        light: "one-light",
      },
      defaultLang: "plaintext",
    })
    .use(rehypeAddStyles)
    .use(rehypeStringify)
    .process(markdownContent);

  const result = html.toString();
  return result;
};

export default parseMarkdown;
