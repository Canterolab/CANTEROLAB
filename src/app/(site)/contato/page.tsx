import { ContactForm } from "@/components/lab/contact-form";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/lab/icons";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contato",
  description:
    "Quer trocar uma ideia sobre dados, automação ou um projeto? Fale com Alef Cantero.",
  path: "/contato",
});

export default function ContactPage() {
  const { links } = siteConfig;
  const email = links.email.replace(/^mailto:/, "");

  return (
    <>
      <div className="wrap">
        <section className="c-grid" aria-labelledby="contato-titulo">
          <div>
            <span className="cl-label cl-label--accent cl-rise">{"// Contato"}</span>
            <h1 id="contato-titulo" className="cl-rise d1">
              Vamos <span className="grad-text">conversar?</span>
            </h1>
            <p className="a-lede cl-rise d2" style={{ margin: 0 }}>
              Quer trocar uma ideia sobre dados, automação ou um projeto? Me chama.
            </p>
            <div className="c-alt">
              <a href={links.email}>
                <MailIcon size={18} />
                <span>E-mail</span>
                <span className="m">{email}</span>
              </a>
              {links.linkedin ? (
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                  <span className="m">alef-cantero</span>
                </a>
              ) : null}
              {links.github ? (
                <a href={links.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                  <span className="m">DBCantero</span>
                </a>
              ) : null}
            </div>
          </div>
          <ContactForm email={email} />
        </section>
      </div>
      <div className="foot-gap" />
    </>
  );
}
