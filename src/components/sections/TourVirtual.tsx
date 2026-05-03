"use client";

import { useState } from "react";
import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

export default function TourVirtual() {
  const { paginas } = proyecto.tourVirtual;
  const [pagina, setPagina] = useState(0);
  const { frames } = paginas[pagina];

  return (
    <PageShell>
      <div
        className="h-full flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--bg-neutro)" }}
      >
        {/* Header */}
        <div
          className="shrink-0 px-8 py-5 border-b flex items-center justify-between"
          style={{ borderColor: "var(--color-borde)" }}
        >
          <p className="label-ui">3D & Tour Virtual</p>

          {/* Tabs numerados */}
          <div className="flex items-center gap-1">
            {paginas.map((_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                className="w-8 h-8 rounded-sm text-[11px] tracking-widest transition-all duration-200"
                style={{
                  backgroundColor: pagina === i ? "var(--color-fondo)" : "transparent",
                  color:           pagina === i ? "var(--color-texto)" : "var(--color-primario)",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Frames de la página activa */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {frames.map((frame) => (
            <div key={frame.url} className="flex flex-col gap-3 min-h-0">
              <div
                className="flex-1 min-h-0 overflow-hidden rounded-sm border"
                style={{ borderColor: "var(--color-borde)" }}
              >
                <iframe
                  src={frame.url}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allow="xr-spatial-tracking; gyroscope; accelerometer"
                  allowFullScreen
                />
              </div>
              <p
                className="shrink-0 text-center label-ui"
                style={{ color: "rgba(224,225,221,0.6)" }}
              >
                {frame.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
