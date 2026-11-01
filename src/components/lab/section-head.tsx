import Link from "next/link";

export function SectionHead({
  id,
  title,
  href,
  linkLabel = "Ver todas",
}: {
  id?: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="cl-section-head">
      <h2 id={id}>{title}</h2>
      {href ? <Link href={href}>{linkLabel} →</Link> : null}
    </div>
  );
}
