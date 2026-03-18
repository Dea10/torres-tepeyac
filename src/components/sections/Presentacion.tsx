"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function Presentacion() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Pequeño delay para que la animación termine antes de que el video arranque
    setTimeout(() => videoRef.current?.play(), 300);
  };

  return (
    <section id="presentacion" className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
      {/* Video */}
      <video
        ref={videoRef}
        controls={playing}
        playsInline
        className="w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
      >
        <source src="/assets/video-presentacion-completa.mp4" type="video/mp4" />
      </video>

      {/* Overlay con botón de play — desaparece cuando el video está corriendo */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: "rgba(10,10,10,0.72)" }}
            onClick={handlePlay}
          >
            {/* Botón play */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-6"
            >
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={{ borderColor: "var(--color-primario)" }}
              >
                <Play
                  size={32}
                  fill="var(--color-primario)"
                  color="var(--color-primario)"
                  className="ml-1"
                />
              </div>

              <div className="text-center">
                <p
                  className="text-xs tracking-[0.4em] uppercase font-medium mb-1"
                  style={{ color: "var(--color-primario)" }}
                >
                  Presentación Completa
                </p>
                <p className="text-white/40 text-xs font-light">
                  Torres Tepeyac · Video oficial del proyecto
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
