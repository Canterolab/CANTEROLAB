import type { ReactNode } from "react";

/** Abertura de página: rótulo mono, título (com trecho em degradê opcional) e linha fina. */
export function PageIntro({
  label,
  title,
  highlight,
  description,
  children,
}: {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="wrap page-intro">
      <span className="cl-label cl-label--accent cl-rise">{`// ${label}`}</span>
      <h1 className="cl-rise d1">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="grad-text">{highlight}</span>
          </>
        ) : null}
      </h1>
      {description ? <p className="a-lede cl-rise d2">{description}</p> : null}
      {children ? <div className="page-intro__extra cl-rise d3">{children}</div> : null}
    </section>
  );
}
