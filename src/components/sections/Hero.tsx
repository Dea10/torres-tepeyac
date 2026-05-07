"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { proyecto } from "@/data/proyecto";

const words = proyecto.nombre.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoListo, setVideoListo] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 0.95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const smoothBgY = useSpring(bgY, { stiffness: 60, damping: 20 });

  const whatsappUrl = `https://wa.me/${proyecto.contacto.whatsapp}?text=${encodeURIComponent(proyecto.contacto.mensajeWhatsapp)}`;

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden">
      {/* Fondo con parallax */}
      <motion.div className="absolute inset-0 w-full h-full scale-110" style={{ y: smoothBgY }}>

        {/* Fallback imagen — siempre visible hasta que el video esté listo */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${proyecto.hero.imagenFallback})` }}
        />

        {/* Video — fade in solo cuando está listo para reproducir */}
        <AnimatePresence>
          {videoListo && (
            <motion.video
              key="hero-video"
              autoPlay muted loop playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={proyecto.hero.videoUrl} type="video/mp4" />
            </motion.video>
          )}
        </AnimatePresence>

        {/* Video oculto que precarga en background */}
        {!videoListo && (
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            onCanPlay={() => setVideoListo(true)}
          >
            <source src={proyecto.hero.videoUrl} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Overlay base */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />

      {/* Overlay dinámico de bordes */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 75%, #0A0A0A 100%)",
        }}
      />

      {/* Loader — visible mientras el video no está listo */}
      <AnimatePresence>
        {!videoListo && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 right-10 flex items-center gap-3 z-20"
          >
            <motion.div
              className="w-4 h-4 rounded-full border-2 border-t-transparent"
              style={{ borderColor: "var(--color-primario)", borderTopColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-primario)" }}>
              Cargando
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido sticky al centro */}
      <motion.div
        className="relative sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: contentOpacity, y: textY }}
      >
        {/* Ubicación */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm uppercase mb-8 font-medium"
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
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
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
          className="text-white text-lg md:text-xl font-light max-w-lg mb-12 tracking-wide"
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
            className="px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium border text-white hover:bg-white/10 transition-all duration-500"
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
          >
            Agendar Visita
          </a>
        </motion.div>

        {/* Indicador de scroll */}
        <AnimatePresence>
          {videoListo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
              <div className="w-px h-12 relative overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  style={{ backgroundColor: "var(--color-primario)" }}
                  animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
