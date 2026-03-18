"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { proyecto } from "@/data/proyecto";

const words = proyecto.nombre.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax: el fondo se mueve más lento que el scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // El texto sube más rápido
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  // El overlay se oscurece al hacer scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.95]);
  // El contenido se difumina al salir
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothBgY = useSpring(bgY, { stiffness: 60, damping: 20 });

  const whatsappUrl = `https://wa.me/${proyecto.contacto.whatsapp}?text=${encodeURIComponent(proyecto.contacto.mensajeWhatsapp)}`;

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden">
      {/* Fondo con parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full scale-110"
        style={{ y: smoothBgY }}
      >
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={proyecto.hero.videoUrl} type="video/mp4" />
        </video>
        {/* Fallback imagen si el video no carga */}
        <div
          className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${proyecto.hero.imagenFallback})` }}
        />
      </motion.div>

      {/* Overlay base — oscurece toda la imagen para legibilidad del texto */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />

      {/* Overlay dinámico de bordes — funde con el fondo de la página */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 75%, #0A0A0A 100%)",
        }}
      />

      {/* Contenido sticky al centro */}
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: contentOpacity, y: textY }}
      >
        {/* Ubicación */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase mb-8 font-medium"
          style={{ color: "var(--color-primario)" }}
        >
          {proyecto.ubicacion}
        </motion.p>

        {/* Título palabra por palabra */}
        <h1 className="font-display font-light text-white leading-none mb-8">
          <span className="flex flex-wrap justify-center gap-x-6">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block text-6xl md:text-8xl lg:text-[10rem]"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.5 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Línea decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-24 mb-8 origin-left"
          style={{ backgroundColor: "var(--color-primario)" }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/90 text-lg md:text-xl font-light max-w-lg mb-12 tracking-wide"
        >
          {proyecto.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#presentacion"
            className="px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-500 hover:opacity-80"
            style={{ backgroundColor: "var(--color-primario)", color: "#0A0A0A" }}
          >
            Ver Proyecto
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium border text-white/70 hover:text-white hover:border-white/60 transition-all duration-500"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            Agendar Visita
          </a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ backgroundColor: "var(--color-primario)" }}
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
