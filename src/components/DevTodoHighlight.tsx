"use client";

import { useEffect } from "react";

const TODO_PATTERN = /TODO\(julio\)[^\n]*/g;

/**
 * Dev-only. Marks TODO(julio) text with the CSS Custom Highlight API, so the DOM
 * that React owns is never touched.
 */
export function DevTodoHighlight() {
  useEffect(() => {
    if (typeof CSS === "undefined" || !("highlights" in CSS)) return;

    function paint() {
      const ranges: Range[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? "";
        for (const match of text.matchAll(TODO_PATTERN)) {
          const range = new Range();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + match[0].length);
          ranges.push(range);
        }
      }
      CSS.highlights.set("todo", new Highlight(...ranges));
    }

    paint();
    const observer = new MutationObserver(paint);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => {
      observer.disconnect();
      CSS.highlights.delete("todo");
    };
  }, []);

  return null;
}
