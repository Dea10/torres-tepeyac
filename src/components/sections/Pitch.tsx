"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { proyecto } from "@/data/proyecto";

export default function Pitch() {
  const { pitch } = proyecto;
  const whatsappUrl = `https://wa.me/${pitch.whatsapp}?text=${encodeURIComponent(pitch.mensajeWhatsapp)}`;

  return (
    <section
      id="pitch"
      className="py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-superficie)" }}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-primario), transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.5em] uppercase mb-5 font-medium"
          style={{ color: "var(--color-primario)" }}
        >
          Para Desarrolladoras
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h2
            className="font-display text-4xl md:text-6xl text-white font-light"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {pitch.titulo}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-base mb-12 font-light"
        >
          {pitch.subtitulo}
        </motion.p>

        {/* Servicios */}
        <div className="text-left glass px-8 py-6 mb-10 space-y-4">
          {pitch.servicios.map((servicio, i) => (
            <motion.div
              key={servicio}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primario)" }} />
              <p className="text-white/70 text-sm font-light">{servicio}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 hover:opacity-80"
          style={{ backgroundColor: "var(--color-primario)", color: "#0A0A0A" }}
        >
          Solicitar Showroom para mi Proyecto
        </motion.a>
      </div>
    </section>
  );
}
