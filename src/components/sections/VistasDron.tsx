"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
    />
  );
}

function CeldaImagen({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: "var(--color-fondo)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      <Vignette />
      <div
        className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)" }}
      />
      <span className="absolute bottom-3 left-4 label-media">{label}</span>
    </div>
  );
}

export default function VistasDron() {
  const [img20, img19, img21] = proyecto.vistasDron.imagenes;

  return (
    <PageShell>
      <div
        className="h-full overflow-hidden"
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gap: "1px",
          backgroundColor: "var(--color-borde)",
        }}
      >
        {/* I-20 — panorámica superior full width */}
        <CeldaImagen src={img20} label="Vista aérea — conjunto" />

        {/* I-19 + I-21 — dos tomas inferiores */}
        <div
          className="overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--color-borde)" }}
        >
          <CeldaImagen src={img19} label="Acceso principal" />
          <CeldaImagen src={img21} label="Torre frontal" />
        </div>
      </div>
    </PageShell>
  );
}
