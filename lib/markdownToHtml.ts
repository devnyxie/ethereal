import { unified } from "unified";
import parse from "remark-parse";
import breaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { Element } from "hast";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const parseMarkdown = async (markdownContent: string) => {
  let html = await unified()
    .use(parse)
    .use(breaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(rehypePrettyCode, {
      theme: {
        dark: "houston",
        light: "github-light",
      },
      defaultLang: "plaintext",
    })
    .use(rehypeAddStyles)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdownContent);

  const result = html.toString();
  return result;
};

export default parseMarkdown;

const rehypeAddStyles = () => {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "pre") {
        if (node.properties) {
          const classes =
            "relative rounded-sm border p-1.5 mt-2 mb-2 overflow-x-auto text-[14px] max-h-[400px] overflow-y-auto";
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
