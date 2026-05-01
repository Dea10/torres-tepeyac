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

function CeldaImagen({ src, label, invertida, onClick }: { src: string; label: string; invertida: boolean; onClick?: () => void }) {
  const rows = invertida ? "75fr 25fr" : "25fr 75fr";

  const banda = (
    <div
      className="flex items-center px-4"
      style={{ backgroundColor: "var(--bg-marino)", borderRight: "1px solid var(--color-borde)", borderTop: "1px solid var(--color-borde)", borderBottom: "1px solid var(--color-borde)" }}
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
      <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover p-4 transition-transform duration-500 group-hover:scale-105" style={{ borderRight: "1px solid var(--color-borde)" }} />
      <Vignette />
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateRows: rows, gap: "1px", backgroundColor: "var(--bg-marino)" }}>
      {invertida ? <>{img}{banda}</> : <>{banda}{img}</>}
    </div>
  );
}

export default function Exteriores() {
  const { video, imagenes } = proyecto.exteriores;
  const [img17, img18] = imagenes;
  const [activo, setActivo] = useState<number | null>(null);

  const items: MediaItem[] = [
    { src: img17, type: "image", label: "Fachada" },
    { src: img18, type: "image", label: "Detalle" },
    { src: video,  type: "video", label: "Vista aérea" },
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
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "1px",
            backgroundColor: "var(--bg-marino)",
          }}
        >
          <CeldaImagen src={img17} label="Fachada" invertida={true}  onClick={() => setActivo(0)} />
          <CeldaImagen src={img18} label="Detalle" invertida={false} onClick={() => setActivo(1)} />

          {/* Video panorámico */}
          <div className="relative overflow-hidden cursor-pointer group" onClick={() => setActivo(2)}>
            <video
              src={video} autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <Vignette />
            <div
              className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)" }}
            />
            <span className="absolute bottom-3 left-4 label-media">Vista aérea</span>
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
