"use client";

import { useRef } from "react";
import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

function VideoVivo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover p-6"
      />
      {/* Vignette — da el efecto de foto viva enmarcada */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(13,27,42,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default function Inicio() {
  const { unidad, conjunto, videoIzquierda, videoDerecha } = proyecto.inicio;

  return (
    <PageShell>
      <div
        className="h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden"
        style={{ backgroundColor: "var(--bg-marino)" }}
      >
        {/* ── Panel izquierdo ─────────────────────────────── */}
        <div
          className="md:col-span-6 flex flex-col border-b md:border-b-0 md:border-r overflow-hidden"
          style={{ borderColor: "var(--color-borde)" }}
        >
          {/* Video superior — solo desktop */}
          <VideoVivo src={videoIzquierda} className="hidden md:block flex-1 min-h-0" />

          {/* Características de la unidad */}
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

        {/* ── Panel derecho ───────────────────────────────── */}
        <div className="md:col-span-6 flex flex-col overflow-hidden">
          {/* Highlights del conjunto */}
          <div
            className="shrink-0 px-6 py-6 md:border-b flex-1 md:flex-none flex flex-col justify-center md:justify-start"
            style={{ borderColor: "var(--color-borde)" }}
          >
            <p className="label-ui mb-5">{conjunto.titulo}</p>

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

              {/* Descripción libre */}
              <p
                className="text-sm tracking-widest uppercase pt-1"
                style={{ color: "var(--color-primario)" }}
              >
                {conjunto.descripcion}
              </p>
            </div>
          </div>

          {/* Video inferior — solo desktop */}
          <VideoVivo src={videoDerecha} className="hidden md:block flex-1 min-h-0" />
        </div>
      </div>
    </PageShell>
  );
}
