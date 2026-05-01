"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import MediaModal, { type MediaItem } from "@/components/ui/MediaModal";
import { proyecto } from "@/data/proyecto";

function CeldaVideo({
  label,
  video,
  objectPosition = "center",
  onClick,
}: {
  label: string;
  video: string;
  objectPosition?: string;
  onClick?: () => void;
}) {
  return (
    <div className={`relative overflow-hidden group${onClick ? " cursor-pointer" : ""}`} onClick={onClick}>
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover p-4 transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(13,27,42,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)",
        }}
      />
      <span className="absolute bottom-3 left-4 label-media px-3 py-1.5 rounded-sm m-3"
        style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a" }}>
        {label}
      </span>
    </div>
  );
}

function CeldaCompuesta({
  imagenSupIzq,
  imagenSupDer,
  imagenInf,
  onClickSupIzq,
  onClickSupDer,
  onClickInf,
}: {
  imagenSupIzq: string;
  imagenSupDer: string;
  imagenInf: string;
  onClickSupIzq?: () => void;
  onClickSupDer?: () => void;
  onClickInf?: () => void;
}) {
  return (
    <div className="relative overflow-hidden flex flex-col p-4" style={{ gap: "1px", background: "radial-gradient(transparent 30%, rgba(13,27,42,0.6) 100%)" }}>
      {/* Fila superior: dos imágenes */}
      <div className="flex flex-1 min-h-0" style={{ gap: "1px" }}>
        {[
          { src: imagenSupIzq, label: "Inicial", onClick: onClickSupIzq },
          { src: imagenSupDer, label: "Final",   onClick: onClickSupDer },
        ].map(({ src, label, onClick }) => (
          <div
            key={label}
            className={`relative flex-1 overflow-hidden${onClick ? " cursor-pointer group" : ""}`}
            onClick={onClick}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div
              className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)" }}
            />
            <span
              className="absolute bottom-3 left-4 label-media px-3 py-1.5 rounded-sm"
              style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Fila inferior: imagen completa */}
      <div
        className={`relative flex-1 min-h-0 overflow-hidden${onClickInf ? " cursor-pointer group" : ""}`}
        style={{ backgroundColor: "var(--color-fondo)" }}
        onClick={onClickInf}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagenInf} alt="" className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
        <div
          className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)" }}
        />
        <span className="absolute bottom-3 left-4 label-media px-3 py-1.5 rounded-sm"
          style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a" }}>
          Diagrama
        </span>
      </div>
    </div>
  );
}

export default function ProcesoDiseno() {
  const { celdas, celdaCompuesta } = proyecto.procesoDiseno;
  const [plantaTipo, conceptual, estudioSolar, sketch, maqueta] = celdas;
  const [activo, setActivo] = useState<number | null>(null);

  // 0-4: videos, 5-7: imágenes de CeldaCompuesta
  const items: MediaItem[] = [
    { src: plantaTipo.video,            type: "video", label: plantaTipo.label },
    { src: conceptual.video,            type: "video", label: conceptual.label },
    { src: estudioSolar.video,          type: "video", label: estudioSolar.label },
    { src: sketch.video,                type: "video", label: sketch.label },
    { src: maqueta.video,               type: "video", label: maqueta.label },
    { src: celdaCompuesta.imagenSupIzq, type: "image", label: "Inicial" },
    { src: celdaCompuesta.imagenSupDer, type: "image", label: "Final" },
    { src: celdaCompuesta.imagenInf,    type: "image", label: "Diagrama" },
  ];

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  return (
    <PageShell>
      <div className="h-full" style={{ backgroundColor: "var(--bg-marino)" }}>
        <div
          className="h-full grid grid-cols-3 grid-rows-2 overflow-hidden"
          style={{
            gap: "1px",
            backgroundColor: "var(--color-borde)",
          }}
        >
          <CeldaVideo label={plantaTipo.label}   video={plantaTipo.video}   onClick={() => setActivo(0)} />
          <CeldaVideo label={conceptual.label}   video={conceptual.video}   onClick={() => setActivo(1)} />
          <CeldaVideo label={estudioSolar.label} video={estudioSolar.video} objectPosition="right center" onClick={() => setActivo(2)} />
          <CeldaVideo label={sketch.label}       video={sketch.video}       onClick={() => setActivo(3)} />
          <CeldaCompuesta
            imagenSupIzq={celdaCompuesta.imagenSupIzq}
            imagenSupDer={celdaCompuesta.imagenSupDer}
            imagenInf={celdaCompuesta.imagenInf}
            onClickSupIzq={() => setActivo(5)}
            onClickSupDer={() => setActivo(6)}
            onClickInf={() => setActivo(7)}
          />
          <CeldaVideo label={maqueta.label} video={maqueta.video} onClick={() => setActivo(4)} />
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
