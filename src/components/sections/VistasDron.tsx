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

// invertida=false → banda arriba (15%) / imagen abajo (85%)
// invertida=true  → imagen arriba (85%) / banda abajo (15%)
function CeldaBanda({ src, label, invertida }: { src: string; label: string; invertida: boolean }) {
  const rows = invertida ? "85fr 15fr" : "15fr 85fr";

  const banda = (
    <div
      className="flex items-center px-4"
      style={{
        backgroundColor: "var(--color-superficie)",
        borderBottom: "1px solid var(--color-borde)",
        borderTop: "1px solid var(--color-borde)",
      }}
    >
      <span className="label-ui">{label}</span>
    </div>
  );

  const img = (
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      <Vignette />
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateRows: rows, gap: "1px", backgroundColor: "var(--color-borde)" }}>
      {invertida ? <>{img}{banda}</> : <>{banda}{img}</>}
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
        {/* I-20 — panorámica superior: banda arriba + imagen */}
        <CeldaBanda src={img20} label="Vista aérea — conjunto" invertida={false} />

        {/* I-19 + I-21 — dos tomas inferiores con alternating split */}
        <div
          className="overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--color-borde)" }}
        >
          <CeldaBanda src={img19} label="Acceso principal" invertida={true} />
          <CeldaBanda src={img21} label="Torre frontal"    invertida={false} />
        </div>
      </div>
    </PageShell>
  );
}
