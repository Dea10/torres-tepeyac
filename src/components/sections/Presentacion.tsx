"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const YOUTUBE_ID = "tYh7ClRZlXk";

export default function Presentacion() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="presentacion" className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
      {/* Thumbnail de YouTube como fondo */}
      {!playing && (
        <img
          src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
          alt="Presentación Torres Tepeyac"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* iframe de YouTube — solo se monta cuando el usuario da play */}
      {playing && (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title="Presentación completa Torres Tepeyac"
        />
      )}

      {/* Overlay con botón play */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: "rgba(10,10,10,0.65)" }}
            onClick={() => setPlaying(true)}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-6"
            >
              <div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: "var(--color-primario)" }}
              >
                <Play size={32} fill="var(--color-primario)" color="var(--color-primario)" className="ml-1" />
              </div>
              <div className="text-center">
                <p className="text-xs tracking-[0.4em] uppercase font-medium mb-1" style={{ color: "var(--color-primario)" }}>
                  Presentación Completa
                </p>
                <p className="text-white/50 text-xs font-light">Torres Tepeyac · Video oficial del proyecto</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
