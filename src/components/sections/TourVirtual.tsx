"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

/** Tiempo que dura el splash de D5 después de que el iframe termina de cargar */
const ESPERA_SPLASH_MS = 2000;
/** Si el iframe nunca avisa que cargó, quitar la cortina de todos modos */
const TOPE_MS = 12000;

/**
 * Iframe con una cortina encima que tapa el splash de D5 (no se puede quitar
 * porque vive dentro del iframe, en otro dominio). La cortina se desvanece
 * cuando el iframe cargó y pasó el tiempo del splash.
 */
function FrameConCortina({ url }: { url: string }) {
  const [cargado, setCargado] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), cargado ? ESPERA_SPLASH_MS : TOPE_MS);
    return () => clearTimeout(t);
  }, [cargado]);

  return (
    <div className="relative w-full h-full">
      <iframe
        src={url}
        onLoad={() => setCargado(true)}
        className="w-full h-full"
        style={{ border: 0 }}
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-neutro)" }}
          >
            {/* Loader: línea que recorre de lado a lado */}
            <div className="relative w-24 h-px overflow-hidden" style={{ backgroundColor: "rgba(224,225,221,0.15)" }}>
              <motion.div
                className="absolute inset-y-0 w-1/3"
                style={{ backgroundColor: "var(--color-texto)" }}
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          style={{ borderColor: "white" }}
        >
          <p className="label-ui">Maqueta virtual</p>

          {/* Tabs numerados — solo si hay más de una página */}
          {paginas.length > 1 && (
          <div className="flex items-center gap-1">
            {paginas.map((_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                className={`w-8 h-8 rounded-sm text-[11px] tracking-widest transition-all duration-200 ${pagina === i ? "" : "hover:!bg-white/10 hover:!text-[var(--color-texto)]"}`}
                style={{
                  backgroundColor: pagina === i ? "var(--color-fondo)" : "transparent",
                  color:           pagina === i ? "var(--color-texto)" : "var(--color-primario)",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          )}
        </div>

        {/* Frames de la página activa */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {frames.map((frame) => (
            <div key={frame.url} className="flex flex-col gap-3 min-h-0">
              <div
                className="flex-1 min-h-0 overflow-hidden rounded-sm border"
                style={{ borderColor: "white" }}
              >
                <FrameConCortina url={frame.url} />
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
