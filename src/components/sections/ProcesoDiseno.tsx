"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

function CeldaVideo({ label, video }: { label: string; video: string }) {
  return (
    <div className="relative overflow-hidden group">
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Vignette base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(13,27,42,0.6) 100%)",
        }}
      />
      {/* Gradiente inferior para el label */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)",
        }}
      />
      {/* Label */}
      <div className="absolute bottom-3 left-4">
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-light"
          style={{ color: "rgba(224,225,221,0.75)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function CeldaPlaceholder() {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--color-superficie)" }}
    >
      <span
        className="text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "rgba(224,225,221,0.2)" }}
      >
        Próximamente
      </span>
    </div>
  );
}

export default function ProcesoDiseno() {
  const { celdas } = proyecto.procesoDiseno;

  const [plantaTipo, conceptual, estudioSolar, sketch, maqueta] = celdas;

  return (
    <PageShell>
      <div
        className="h-full grid grid-cols-3 grid-rows-2 overflow-hidden"
        style={{
          gap: "1px",
          backgroundColor: "var(--color-borde)",
        }}
      >
        {/* Fila superior */}
        <CeldaVideo label={plantaTipo.label}   video={plantaTipo.video} />
        <CeldaVideo label={conceptual.label}   video={conceptual.video} />
        <CeldaVideo label={estudioSolar.label} video={estudioSolar.video} />

        {/* Fila inferior */}
        <CeldaVideo label={sketch.label}  video={sketch.video} />
        <CeldaPlaceholder />
        <CeldaVideo label={maqueta.label} video={maqueta.video} />
      </div>
    </PageShell>
  );
}
