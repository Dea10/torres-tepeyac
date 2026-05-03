"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import MediaModal, { type MediaItem } from "@/components/ui/MediaModal";
import { proyecto } from "@/data/proyecto";

function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
    />
  );
}

function CeldaBanda({ src, label, invertida, onClick }: { src: string; label: string; invertida: boolean; onClick?: () => void }) {
  const rows = invertida ? "85fr 15fr" : "15fr 85fr";

  const banda = (
    <div
      className="flex items-center px-4"
      style={{
        backgroundColor: "var(--bg-marino)",
        borderBottom: "1px solid var(--color-borde)",
        borderTop: "1px solid var(--color-borde)",
      }}
    >
      <span className="label-ui">{label}</span>
    </div>
  );

  const img = (
    <div
      className={`relative overflow-hidden${onClick ? " cursor-pointer group" : ""}`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover p-4 transition-transform duration-500 group-hover:scale-105" />
      <Vignette />
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateRows: rows, gap: "1px", backgroundColor: "var(--bg-marino)" }}>
      {invertida ? <>{img}{banda}</> : <>{banda}{img}</>}
    </div>
  );
}

export default function VistasDron() {
  const [img20, img19, img21] = proyecto.vistasDron.imagenes;
  const [activo, setActivo] = useState<number | null>(null);

  const items: MediaItem[] = [
    { src: img20, type: "image", label: "Vista aérea — conjunto" },
    { src: img19, type: "image", label: "Acceso principal" },
    { src: img21, type: "image", label: "Torre frontal" },
  ];

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  return (
    <PageShell>
      <div className="h-full" style={{ backgroundColor: "var(--bg-marino)" }}>
        <div
          className="h-full overflow-hidden"
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gap: "1px",
            backgroundColor: "var(--color-borde)",
          }}
        >
          <CeldaBanda src={img20} label="Vista aérea — conjunto" invertida={false} onClick={() => setActivo(0)} />
          <div
            className="overflow-hidden"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "var(--color-borde)" }}
          >
            <CeldaBanda src={img19} label="Acceso principal" invertida={true}  onClick={() => setActivo(1)} />
            <CeldaBanda src={img21} label="Torre frontal"    invertida={false} onClick={() => setActivo(2)} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activo !== null && (
          <MediaModal items={items} indice={activo} onClose={cerrar} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
