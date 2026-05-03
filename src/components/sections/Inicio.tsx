"use client";

import { useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import MediaModal, { type MediaItem } from "@/components/ui/MediaModal";
import { proyecto } from "@/data/proyecto";

function VideoVivo({ src, className = "", onClick }: { src: string; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={`relative overflow-hidden${onClick ? " cursor-pointer group" : ""} ${className}`}
      onClick={onClick}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover p-6 transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(13,27,42,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default function Inicio() {
  const { unidad, conjunto, videoIzquierda, videoDerecha } = proyecto.inicio;
  const [activo, setActivo] = useState<number | null>(null);

  const items: MediaItem[] = [
    { src: videoIzquierda, type: "video" },
    { src: videoDerecha,   type: "video" },
  ];

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  return (
    <PageShell>
      <div
        className="h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden"
        style={{ backgroundColor: "var(--bg-marino)" }}
      >
        {/* Panel izquierdo */}
        <div
          className="md:col-span-6 flex flex-col border-b md:border-b-0 md:border-r overflow-hidden"
          style={{ borderColor: "var(--color-borde)" }}
        >
          <VideoVivo src={videoIzquierda} className="hidden md:block flex-1 min-h-0" onClick={() => setActivo(0)} />

          <div
            className="shrink-0 px-6 py-6 md:border-t flex-1 md:flex-none flex flex-col justify-center md:justify-start"
            style={{ borderColor: "var(--color-borde)" }}
          >
            <p className="label-ui mb-5">{unidad.titulo}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {unidad.caracteristicas.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm leading-snug"
                  style={{ color: "rgba(224,225,221,0.65)" }}
                >
                  <span
                    className="mt-[5px] shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: "var(--color-medio)" }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="md:col-span-6 flex flex-col overflow-hidden">
          <div
            className="shrink-0 px-6 py-6 md:border-b flex-1 md:flex-none flex flex-col justify-center md:justify-start"
            style={{ borderColor: "var(--color-borde)" }}
          >
            <div className="flex flex-col gap-4">
              {conjunto.highlights.map((h) => (
                <div
                  key={h.etiqueta}
                  className="flex items-baseline gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                  style={{ borderColor: "var(--color-borde)" }}
                >
                  <span
                    className="font-display text-5xl font-light leading-none"
                    style={{ color: "var(--color-texto)" }}
                  >
                    {h.prefijo}
                    {h.valor}
                  </span>
                  <span
                    className="text-[12px] tracking-[0.2em] uppercase"
                    style={{ color: "rgba(224,225,221,0.45)" }}
                  >
                    {h.etiqueta}
                  </span>
                </div>
              ))}

              <p
                className="text-sm tracking-widest uppercase pt-1"
                style={{ color: "var(--color-primario)" }}
              >
                {conjunto.descripcion}
              </p>
            </div>
          </div>

          <VideoVivo src={videoDerecha} className="hidden md:block flex-1 min-h-0" onClick={() => setActivo(1)} />
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
