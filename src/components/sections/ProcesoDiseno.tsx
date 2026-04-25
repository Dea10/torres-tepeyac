"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

function CeldaVideo({
  label,
  video,
  objectPosition = "center",
}: {
  label: string;
  video: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative overflow-hidden group">
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
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

function CeldaCompuesta({
  imagenSupIzq,
  imagenSupDer,
  imagenInf,
}: {
  imagenSupIzq: string;
  imagenSupDer: string;
  imagenInf: string;
}) {
  return (
    <div className="relative overflow-hidden flex flex-col" style={{ gap: "1px", backgroundColor: "var(--color-borde)" }}>
      {/* Fila superior: dos imágenes */}
      <div className="flex flex-1 min-h-0" style={{ gap: "1px" }}>
        {[
          { src: imagenSupIzq, label: "Inicial" },
          { src: imagenSupDer, label: "Final" },
        ].map(({ src, label }) => (
          <div key={label} className="relative flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)" }}
            />
            <span
              className="absolute bottom-2 left-3 text-[10px] tracking-[0.3em] uppercase font-light"
              style={{ color: "rgba(224,225,221,0.75)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Fila inferior: imagen completa */}
      <div
        className="relative flex-1 min-h-0 overflow-hidden"
        style={{ backgroundColor: "var(--color-fondo)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagenInf} alt="" className="absolute inset-0 w-full h-full object-contain" />
        <div
          className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(13,27,42,0.85), transparent)" }}
        />
        <span
          className="absolute bottom-2 left-3 text-[10px] tracking-[0.3em] uppercase font-light"
          style={{ color: "rgba(224,225,221,0.75)" }}
        >
          Diagrama
        </span>
      </div>
    </div>
  );
}

export default function ProcesoDiseno() {
  const { celdas, celdaCompuesta } = proyecto.procesoDiseno;

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
        <CeldaVideo label={estudioSolar.label} video={estudioSolar.video} objectPosition="right center" />

        {/* Fila inferior */}
        <CeldaVideo label={sketch.label}  video={sketch.video} />
        <CeldaCompuesta
          imagenSupIzq={celdaCompuesta.imagenSupIzq}
          imagenSupDer={celdaCompuesta.imagenSupDer}
          imagenInf={celdaCompuesta.imagenInf}
        />
        <CeldaVideo label={maqueta.label} video={maqueta.video} />
      </div>
    </PageShell>
  );
}
