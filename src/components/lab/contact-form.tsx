"use client";

import { type FormEvent, useState } from "react";

/**
 * Formulário de contato. Enquanto o site não tem um serviço de envio,
 * ele monta a mensagem e abre o aplicativo de e-mail do visitante.
 */
export function ContactForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const remetente = String(data.get("email") ?? "").trim();
    const assunto = String(data.get("assunto") ?? "").trim() || "Vamos conversar?";
    const mensagem = String(data.get("mensagem") ?? "").trim();
    const body = `${mensagem}\n\n— ${nome}${remetente ? ` (${remetente})` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form className="c-form" aria-label="Formulário de contato" onSubmit={onSubmit}>
      <div className="cl-field">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" autoComplete="name" required placeholder="Como posso te chamar?" />
      </div>
      <div className="cl-field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="voce@empresa.com"
        />
      </div>
      <div className="cl-field full">
        <label htmlFor="assunto">Assunto</label>
        <input
          id="assunto"
          name="assunto"
          placeholder="Ex.: performance em SQL Server, automação, um projeto"
        />
      </div>
      <div className="cl-field full">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          placeholder="Conte o contexto: o que você está tentando resolver?"
        />
      </div>
      <div className="send">
        <span className="cl-meta" aria-live="polite">
          {opened
            ? "Abrimos seu aplicativo de e-mail com a mensagem pronta."
            : "Sem lista de e-mails. Só a resposta."}
        </span>
        <button className="cl-btn cl-btn--primary" type="submit">
          Enviar mensagem
        </button>
      </div>
    </form>
  );
}
