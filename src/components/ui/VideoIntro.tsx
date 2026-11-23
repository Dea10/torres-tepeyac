"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  /** Video a reproducir en pantalla completa */
  src: string;
  /**
   * false = montado pero oculto, solo precargando el video mientras el usuario
   * está en la portada. true = se muestra y arranca.
   */
  activo: boolean;
  /** Imagen que coincide con el último encuadre del video (match cut) */
  imagenDestino: string;
  /** Se llama cuando la imagen destino ya cubre toda la pantalla */
  onFinish: () => void;
}

const DURACION_CORTE = 1.4; // segundos del crossfade video → imagen

/**
 * Reproductor a pantalla completa. Al terminar (o al saltar) hace un crossfade
 * del último frame del video hacia la imagen destino, para que la navegación
 * a la siguiente sección se sienta como una continuación del video.
 */
export default function VideoIntro({ src, activo, imagenDestino, onFinish }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [aterrizando, setAterrizando] = useState(false);
  const yaAterrizo = useRef(false);

  // Reproducir con audio (el click en "Explorar" cuenta como interacción del usuario)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activo) return;
    video.currentTime = 0;
    video.play().catch(() => {
      // Si el navegador bloquea el audio, reproducir en silencio
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [activo]);

  // Precargar la imagen destino para que el corte no parpadee
  useEffect(() => {
    const img = new Image();
    img.src = imagenDestino;
  }, [imagenDestino]);

  const aterrizar = useCallback(() => {
    if (yaAterrizo.current) return;
    yaAterrizo.current = true;
    setAterrizando(true);
    // Bajar el volumen durante el crossfade
    const video = videoRef.current;
    if (video && !video.muted) {
      const inicio = performance.now();
      const volInicial = video.volume;
      const paso = (t: number) => {
        const p = Math.min((t - inicio) / (DURACION_CORTE * 1000), 1);
        video.volume = volInicial * (1 - p);
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    }
  }, []);

  useEffect(() => {
    if (!activo) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") aterrizar();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [activo, aterrizar]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: activo ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-0 z-50 bg-black ${activo ? "" : "invisible pointer-events-none"}`}
      aria-hidden={!activo}
    >
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        playsInline
        onEnded={aterrizar}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Match cut: la imagen destino aparece sobre el último encuadre */}
      {aterrizando && (
        <motion.img
          src={imagenDestino}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURACION_CORTE, ease: [0.45, 0, 0.2, 1] }}
          onAnimationComplete={onFinish}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Saltar */}
      {activo && !aterrizando && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={aterrizar}
          className="absolute bottom-8 right-8 px-5 py-2 text-[12px] tracking-[0.3em] uppercase border transition-colors duration-300 hover:bg-white/10"
          style={{ color: "var(--color-texto)", borderColor: "rgba(224,225,221,0.5)" }}
        >
          Saltar
        </motion.button>
      )}
    </motion.div>
  );
}
