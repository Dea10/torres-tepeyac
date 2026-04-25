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

// invertida=false → banda arriba (25%) / imagen abajo (75%)
// invertida=true  → imagen arriba (75%) / banda abajo (25%)
function CeldaImagen({ src, label, invertida }: { src: string; label: string; invertida: boolean }) {
  const rows = invertida ? "85fr 15fr" : "15fr 85fr";

  const banda = (
    <div
      className="flex items-center px-4"
      style={{ backgroundColor: "var(--color-superficie)", borderBottom: "1px solid var(--color-borde)", borderTop: "1px solid var(--color-borde)" }}
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

export default function ExterioresAlt() {
  const { video, imagenes } = proyecto.exteriores;
  const [img17, img18] = imagenes;

  return (
    <PageShell>
      <div
        className="h-full overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "1px",
          backgroundColor: "var(--color-borde)",
        }}
      >
        {/* Video protagonista — columna izquierda full height */}
        <div className="relative overflow-hidden" style={{ backgroundColor: "var(--color-fondo)" }}>
          <video
            src={video} autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
          <Vignette />
          <div
            className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)" }}
          />
          <span className="absolute bottom-3 left-4 label-media">Vista aérea</span>
        </div>

        {/* Columna derecha — dos imágenes apiladas con alternating split */}
        <div
          className="overflow-hidden"
          style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "1px", backgroundColor: "var(--color-borde)" }}
        >
          <CeldaImagen src={img17} label="Fachada" invertida={false} />
          <CeldaImagen src={img18} label="Detalle"  invertida={true} />
        </div>
      </div>
    </PageShell>
  );
}
