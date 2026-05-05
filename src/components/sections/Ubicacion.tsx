"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import MediaModal, { type MediaItem } from "@/components/ui/MediaModal";
import { proyecto } from "@/data/proyecto";

export default function Ubicacion() {
  const { embedUrl } = proyecto.mapa;
  const { direccion, imagen, video, proximidad } = proyecto.seccionUbicacion;
  const [activo, setActivo] = useState<number | null>(null);

  const items: MediaItem[] = [
    { src: imagen, type: "image", label: "Croquis de ubicación" },
    { src: video,  type: "video", label: "Vista exterior" },
  ];

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % items.length), [items.length]);

  return (
    <PageShell>
      <div
        className="h-full grid grid-cols-1 md:grid-cols-[1fr_2fr] md:grid-rows-[1fr_auto] overflow-hidden"
        style={{ backgroundColor: "var(--bg-neutro)" }}
      >
        {/* Top-left: Google Maps */}
        <div
          className="overflow-hidden border-b md:border-b-0 md:border-r md:col-start-1 md:row-start-1"
          style={{ borderColor: "white" }}
        >
          <div className="p-4 w-full h-full">
            <div className="relative w-full h-full overflow-hidden rounded-sm">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                style={{
                  border: 0,
                  filter: "grayscale(1) brightness(0.55) contrast(1.1)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Top-right: croquis | proximidad + video */}
        <div className="flex flex-col overflow-hidden md:col-start-2 md:row-start-1">
          {/* Croquis | Proximidad */}
          <div
            className="grid grid-cols-2 border-b overflow-hidden"
            style={{ flex: "2", borderColor: "white" }}
          >
            {/* Croquis — clickable */}
            <div
              className="relative border-r overflow-hidden cursor-pointer group"
              style={{ borderColor: "white" }}
              onClick={() => setActivo(0)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagen}
                alt="Croquis de ubicación"
                className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 px-8 py-6">
              {proximidad.map((punto) => (
                <div
                  key={punto}
                  className="flex items-start gap-3 border-b pb-5 last:border-b-0 last:pb-0"
                  style={{ borderColor: "white" }}
                >
                  <span className="label-ui">·</span>
                  <span className="label-ui">{punto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video — clickable */}
          <div
            className="relative overflow-hidden cursor-pointer group"
            style={{ flex: "3" }}
            onClick={() => setActivo(1)}
          >
            <div className="absolute inset-0 p-4">
              <div className="relative w-full h-full overflow-hidden">
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,27,42,0.5) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-left: Dirección */}
        <div
          className="px-4 py-5 border-t md:border-r md:col-start-1 md:row-start-2"
          style={{ borderColor: "white" }}
        >
          <p className="label-ui mb-2">Dirección</p>
          <p
            className="text-sm leading-relaxed tracking-wide"
            style={{ color: "rgba(224,225,221,0.7)" }}
          >
            {direccion}
          </p>
        </div>

        {/* Bottom-right: vacío */}
        <div className="hidden md:block md:col-start-2 md:row-start-2" />
      </div>

      <AnimatePresence>
        {activo !== null && (
          <MediaModal items={items} indice={activo} onClose={cerrar} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
