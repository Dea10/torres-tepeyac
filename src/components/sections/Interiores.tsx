"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import MediaModal, { type MediaItem } from "@/components/ui/MediaModal";
import { proyecto } from "@/data/proyecto";

const BASE = "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/";

const gap1 = { gap: "1px" } as const;

function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
    />
  );
}

function Label({ text }: { text: string }) {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)" }}
      />
    </>
  );
}

function CeldaPortada({ src, onClick }: { src: string; onClick?: () => void }) {
  return (
    <div className={`relative overflow-hidden${onClick ? " cursor-pointer group" : ""}`} onClick={onClick}>
      <video
        src={src} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <Vignette />
      <Label text="Llave en mano" />
    </div>
  );
}

function CeldaEspacio({
  label, video, invertida, onClickVideo,
}: { label: string; video: string; invertida: boolean; onClickVideo?: () => void }) {
  const labelBlock = (
    <div
      className="shrink-0 flex items-center px-4 py-3 justify-center"
      style={{ height: "52px", borderColor: "var(--color-borde)" }}
    >
      <span className="label-ui">{label}</span>
    </div>
  );

  const videoBlock = (
    <div
      className={`relative flex-1 min-h-0 overflow-hidden${onClickVideo ? " cursor-pointer group" : ""}`}
      onClick={onClickVideo}
    >
      <video
        src={video} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <Vignette />
    </div>
  );

  return (
    <div className="flex flex-col overflow-hidden" style={{ borderColor: "var(--color-borde)" }}>
      {invertida ? (
        <>
          {videoBlock}
          <div style={{ borderTop: "1px solid var(--color-borde)", height: "30%" }}>{labelBlock}</div>
        </>
      ) : (
        <>
          <div style={{ borderBottom: "1px solid var(--color-borde)", height: "30%", display: "flex", flexDirection: "column-reverse" }}>{labelBlock}</div>
          {videoBlock}
        </>
      )}
    </div>
  );
}

function CeldaImg({ src, onClick }: { src: string; onClick?: () => void }) {
  return (
    <div
      className={`relative overflow-hidden${onClick ? " cursor-pointer group" : ""}`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <Vignette />https://meet.google.com/zya-xium-qpf
    </div>
  );
}

function Bloque({ imagenes, baseIndex, onOpen }: { imagenes: readonly string[]; baseIndex: number; onOpen: (i: number) => void }) {
  return (
    <div
      className="overflow-hidden pb-4 pl-2 pr-2 pt-16"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", ...gap1 }}
    >
      {imagenes.map((id, i) => (
        <CeldaImg key={id} src={`${BASE}${id}`} onClick={() => onOpen(baseIndex + i)} />
      ))}
    </div>
  );
}

export default function Interiores() {
  const { videoPortada, espacios, bloques } = proyecto.interiores;
  const [activo, setActivo] = useState<number | null>(null);

  // 0: videoPortada, 1-4: espacios videos, 5-16: bloques images (flattened)
  const items: MediaItem[] = [
    { src: videoPortada, type: "video", label: "Llave en mano" },
    ...espacios.map((e) => ({ src: e.video, type: "video" as const, label: e.label })),
    ...bloques.flat().map((id) => ({ src: `${BASE}${id}`, type: "image" as const })),
  ];

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  return (
    <PageShell>
      <div className="h-full" style={{ backgroundColor: "var(--bg-neutro)" }}>
        <div
          className="h-full overflow-hidden"
          style={{ display: "grid", gridTemplateRows: "60fr 40fr", ...gap1 }}
        >
          {/* Parte superior: video portada + 4 espacios */}
          <div
            className="overflow-hidden"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", ...gap1 }}
          >
            <CeldaPortada src={videoPortada} onClick={() => setActivo(0)} />
            {espacios.map((e, i) => (
              <CeldaEspacio
                key={e.label}
                label={e.label}
                video={e.video}
                invertida={i % 2 === 1}
                onClickVideo={() => setActivo(1 + i)}
              />
            ))}
          </div>

          {/* Parte inferior: 4 bloques × 3 imágenes */}
          <div
            className="overflow-hidden"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", ...gap1 }}
          >
            {bloques.map((b, i) => (
              <Bloque key={i} imagenes={b} baseIndex={5 + i * 3} onOpen={setActivo} />
            ))}
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
