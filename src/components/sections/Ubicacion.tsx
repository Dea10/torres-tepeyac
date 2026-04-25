"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

export default function Ubicacion() {
  const { embedUrl } = proyecto.mapa;
  const { direccion, imagen, video, proximidad } = proyecto.seccionUbicacion;

  return (
    <PageShell>
      <div
        className="h-full grid grid-cols-1 md:grid-cols-3 overflow-hidden"
        style={{ backgroundColor: "var(--color-fondo)" }}
      >

        {/* ── Columna izquierda: 1/3 — mapa + dirección ───── */}
        <div
          className="flex flex-col border-b md:border-b-0 md:border-r overflow-hidden"
          style={{ borderColor: "var(--color-borde)" }}
        >
          {/* Iframe — frame pequeño con padding */}
          <div className="p-4" style={{ flex: "3" }}>
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

          {/* Dirección */}
          <div
            className="shrink-0 px-4 py-5 border-t"
            style={{ borderColor: "var(--color-borde)" }}
          >
            <p className="label-ui mb-2">Dirección</p>
            <p
              className="text-sm leading-relaxed tracking-wide"
              style={{ color: "rgba(224,225,221,0.7)" }}
            >
              {direccion}
            </p>
          </div>
        </div>

        {/* ── Columnas derecha: 2/3 ───────────────────────── */}
        <div className="col-span-1 md:col-span-2 flex flex-col overflow-hidden">

          {/* Fila superior: croquis | proximidad */}
          <div
            className="grid grid-cols-2 border-b overflow-hidden"
            style={{ flex: "2", borderColor: "var(--color-borde)" }}
          >
            {/* Croquis */}
            <div
              className="relative border-r overflow-hidden"
              style={{
                borderColor: "var(--color-borde)",
                backgroundColor: "var(--color-superficie)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagen}
                alt="Croquis de ubicación"
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>

            {/* Puntos de proximidad */}
            <div className="flex flex-col justify-center gap-5 px-8 py-6">
              {proximidad.map((punto) => (
                <div
                  key={punto}
                  className="flex items-start gap-3 border-b pb-5 last:border-b-0 last:pb-0"
                  style={{ borderColor: "var(--color-borde)" }}
                >
                  <span className="label-ui">·</span>
                  <span className="label-ui">{punto}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fila inferior: video */}
          <div className="relative overflow-hidden" style={{ flex: "3" }}>
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(13,27,42,0.5) 100%)",
              }}
            />
          </div>

        </div>
      </div>
    </PageShell>
  );
}
