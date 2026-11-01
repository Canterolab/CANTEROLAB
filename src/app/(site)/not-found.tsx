import Link from "next/link";

import { ArrowIcon } from "@/components/lab/icons";

export default function NotFound() {
  return (
    <section className="wrap page-intro not-found-v2">
      <span className="cl-label cl-label--accent">{"// erro 404"}</span>
      <h1>
        Este registro <span className="grad-text">não está no Lab.</span>
      </h1>
      <p className="a-lede">O endereço pode ter mudado ou o conteúdo ainda não foi publicado.</p>
      <div className="cl-code not-found-code" aria-hidden="true">
        <pre>
          <span className="k">SELECT</span> * <span className="k">FROM</span> paginas <span className="k">WHERE</span> url = <span className="s">&apos;?&apos;</span>;{"\n"}
          <span className="c">-- (0 linhas afetadas)</span>
        </pre>
      </div>
      <Link className="cl-btn cl-btn--primary" href="/">
        Voltar para a Home <ArrowIcon />
      </Link>
    </section>
  );
}
