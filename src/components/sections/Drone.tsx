"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { proyecto } from "@/data/proyecto";

export default function Drone() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} id="drone" className="relative h-[80vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={proyecto.drone.videoUrl} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Texto centrado con parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          className="text-[10px] tracking-[0.5em] uppercase mb-4 font-medium"
          style={{ color: "var(--color-primario)" }}
        >
          Vista Aérea
        </motion.p>
        <h2 className="font-display text-5xl md:text-7xl text-white font-light max-w-2xl">
          {proyecto.descripcion.texto.split(".")[0]}.
        </h2>
        <div className="w-px h-16 mt-10" style={{ backgroundColor: "rgba(201,169,110,0.4)" }} />
      </motion.div>
    </section>
  );
}
