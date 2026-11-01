import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "@/components/lab/code-block";

export function Callout({
  title = "Nota",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="callout">
      <span className="cl-label">{title}</span>
      <div>{children}</div>
    </aside>
  );
}

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      {...props}
    />
  );
}

export const articleMdxComponents: MDXComponents = {
  a: MdxLink,
  pre: CodeBlock,
  Callout,
};
