"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { Check } from "lucide-react";

const iconosRedes: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={14} />,
  Facebook:  <Facebook size={14} />,
  TikTok: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  ),
};

export default function Contacto() {
  const { pitch } = proyecto;
  const whatsappUrl = `https://wa.me/${pitch.whatsapp}?text=${encodeURIComponent(pitch.mensajeWhatsapp)}`;

  return (
    <PageShell>
      <div
        className="h-full overflow-hidden flex flex-col items-center justify-center px-8 gap-8"
        style={{ backgroundColor: "var(--bg-neutro)" }}
      >
        <span className="label-ui">Para Desarrolladoras</span>

        <h1
          className="font-display text-center leading-tight max-w-2xl"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", color: "var(--color-texto)" }}
        >
          {pitch.titulo}
        </h1>

        <p
          className="text-center font-light"
          style={{ fontSize: "0.9rem", color: "rgba(224,225,221,0.5)", letterSpacing: "0.04em" }}
        >
          {pitch.subtitulo}
        </p>

        <div
          className="w-full max-w-lg flex flex-col gap-3 px-8 py-6"
          style={{ backgroundColor: "var(--color-superficie)", border: "1px solid var(--color-borde)" }}
        >
          {pitch.servicios.map((servicio) => (
            <div key={servicio} className="flex items-center gap-3">
              <Check size={13} style={{ color: "var(--color-primario)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.85rem", color: "rgba(224,225,221,0.75)", letterSpacing: "0.03em" }}>
                {servicio}
              </span>
            </div>
          ))}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: "var(--color-primario)", color: "var(--color-fondo)" }}
        >
          <MessageCircle size={14} />
          Solicitar Showroom para mi Proyecto
        </a>

        <div
          className="flex items-center gap-3 w-full max-w-lg flex-wrap justify-center"
          style={{ borderTop: "1px solid var(--color-borde)", paddingTop: "1.25rem" }}
        >
          {pitch.redes.map((red) => (
            <a
              key={red.plataforma}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-80"
              style={{
                border: "1px solid var(--color-borde)",
                color: "var(--color-texto)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ color: "var(--color-primario)" }}>{iconosRedes[red.plataforma] ?? null}</span>
              {red.plataforma}
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
