import Markdoc, {
  type Config,
  type Node,
  type RenderableTreeNode,
  Tag,
  nodes,
} from "@markdoc/markdoc";
import React, { type ReactNode } from "react";

export interface Heading {
  id: string;
  title: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textOf(node: RenderableTreeNode): string {
  if (typeof node === "string") return node;
  if (!Tag.isTag(node)) return "";
  return node.children.map(textOf).join("");
}

const config: Config = {
  nodes: {
    heading: {
      ...nodes.heading,
      transform(node: Node, cfg: Config) {
        const attributes = node.transformAttributes(cfg);
        const children = node.transformChildren(cfg);
        const title = children.map(textOf).join("");
        return new Tag(
          `h${node.attributes["level"]}`,
          { ...attributes, id: slugify(title) },
          children,
        );
      },
    },
  },
};

function collectHeadings(
  node: RenderableTreeNode,
  out: Heading[] = [],
): Heading[] {
  if (!Tag.isTag(node)) return out;
  if (node.name === "h2" && typeof node.attributes["id"] === "string") {
    out.push({
      id: node.attributes["id"],
      title: node.children.map(textOf).join(""),
    });
  }
  node.children.forEach((child) => collectHeadings(child, out));
  return out;
}

export function renderMarkdoc(node: Node): {
  content: ReactNode;
  headings: Heading[];
} {
  const tree = Markdoc.transform(node, config);
  return {
    content: Markdoc.renderers.react(tree, React),
    headings: collectHeadings(tree),
  };
}
