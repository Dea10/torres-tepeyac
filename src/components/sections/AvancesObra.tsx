"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

const BASE = "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/";


/** Video (iframe) a pantalla completa, sobre todo el sitio */
function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <iframe
        src={url}
        className="absolute inset-x-0 bottom-0 top-14 w-full h-[calc(100%-3.5rem)]"
        style={{ border: 0 }}
        allow="autoplay; fullscreen; gyroscope; accelerometer; xr-spatial-tracking"
        allowFullScreen
      />
      {/* Franja superior para la X, sin tapar los controles de YouTube */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-3 right-4 p-2 text-white transition-opacity hover:opacity-70"
      >
        <X size={22} />
      </button>
    </motion.div>
  );
}

function ImagenModal({
  imagenes,
  indice,
  onClose,
  onPrev,
  onNext,
}: {
  imagenes: typeof proyecto.avancesObra.imagenes;
  indice: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const imagen = imagenes[indice];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(13,27,42,0.95)" }}
      onClick={onClose}
    >
      {/* Contador y cierre */}
      <div
        className="absolute top-4 left-0 right-0 flex items-center justify-between px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ color: "var(--color-texto)", fontSize: "10px", letterSpacing: "0.2em" }}>
          {indice + 1} / {imagenes.length}
        </span>
        <button
          className="p-2 rounded-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-texto)" }}
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Imagen — ocupa casi toda la pantalla */}
      <motion.div
        key={indice}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center w-full h-full px-16 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}${imagen.id}`}
          alt={imagen.label}
          style={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain" }}
        />
      </motion.div>

      {/* Label */}
      <span
        className="absolute bottom-6 right-6 px-3 py-1.5 rounded-sm"
        style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a", fontSize: "10px", letterSpacing: "0.15em" }}
      >
        {imagen.label}
      </span>

      {/* Prev */}
      <button
        className="absolute left-4 p-3 rounded-sm transition-opacity hover:opacity-60"
        style={{ color: "var(--color-texto)" }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next */}
      <button
        className="absolute right-4 p-3 rounded-sm transition-opacity hover:opacity-60"
        style={{ color: "var(--color-texto)" }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={28} />
      </button>
    </motion.div>
  );
}

export default function AvancesObra() {
  const { imagenes } = proyecto.avancesObra;
  const [activo, setActivo] = useState<number | null>(null);
  const [videoAbierto, setVideoAbierto] = useState<string | null>(null);
  const cerrarVideo = useCallback(() => setVideoAbierto(null), []);

  const cerrar = useCallback(() => setActivo(null), []);
  const prev   = useCallback(() => setActivo((i) => i === null ? null : (i - 1 + imagenes.length) % imagenes.length), [imagenes.length]);
  const next   = useCallback(() => setActivo((i) => i === null ? null : (i + 1) % imagenes.length), [imagenes.length]);

  const { frames } = proyecto.avancesObra;

  return (
    <>
    <PageShell>
      <div
        className="h-full flex flex-col"
        style={{ backgroundColor: "var(--bg-marino)", padding: "16px", gap: "16px" }}
      >
        {/* Contenedores multimedia (~2/3 de alto) — mitad y mitad. En móvil se apilan */}
        <div className="flex-[2] min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6">
          {frames.map((frame) => (
            <div key={frame.url} className="flex flex-col gap-3 min-h-0">
              <div
                className="flex-1 min-h-0 overflow-hidden rounded-sm border"
                style={{ borderColor: "white" }}
              >
                <iframe
                  src={frame.url}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allow="autoplay; xr-spatial-tracking; gyroscope; accelerometer"
                  allowFullScreen
                />
              </div>
              {frame.label && (
                <p
                  className="shrink-0 text-center label-ui"
                  style={{ color: "rgba(224,225,221,0.6)" }}
                >
                  {frame.label}
                </p>
              )}
              {"boton" in frame && frame.boton && (
                <button
                  onClick={() => setVideoAbierto(frame.boton.url)}
                  className="shrink-0 self-center px-6 py-2.5 rounded-sm text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-opacity duration-300 hover:opacity-80"
                  style={{ backgroundColor: "var(--color-texto)", color: "var(--color-fondo)" }}
                >
                  {frame.boton.label}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Imágenes en una sola fila, todas visibles (~1/3) */}
        <div
          className="flex-1 min-h-0 grid overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${imagenes.length}, 1fr)`, gap: "4px" }}
        >
          {imagenes.map((img, i) => (
            <button
              key={img.id}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => setActivo(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}${img.id}`}
                alt={img.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="absolute bottom-2 right-2 px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a", fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {img.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activo !== null && (
          <ImagenModal
            imagenes={imagenes}
            indice={activo}
            onClose={cerrar}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </PageShell>

    {/* Fuera de PageShell: su transform rompería el position: fixed */}
    <AnimatePresence>
      {videoAbierto && <VideoModal url={videoAbierto} onClose={cerrarVideo} />}
    </AnimatePresence>
    </>
  );
}
