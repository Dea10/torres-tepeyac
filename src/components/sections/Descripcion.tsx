"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Descripcion() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="descripcion" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="El Proyecto"
          title="Conjunto Torres Tepeyac"
          subtitle={proyecto.descripcion.texto}
        />

        {/* Números */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20" style={{ backgroundColor: "var(--color-borde)" }}>
          {proyecto.descripcion.caracteristicas.map((c, i) => (
            <motion.div
              key={c.etiqueta}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{ backgroundColor: "var(--color-fondo)" }}
            >
              <span
                className="font-display text-6xl font-light mb-2"
                style={{ color: "var(--color-primario)" }}
              >
                {c.valor}
              </span>
              <span className="text-white/40 text-xs tracking-widest uppercase">{c.etiqueta}</span>
            </motion.div>
          ))}
        </div>

        {/* Precio y galería de fachadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3">Precio desde</p>
            <p
              className="font-display text-6xl md:text-7xl font-light mb-6"
              style={{ color: "var(--color-primario)" }}
            >
              {proyecto.descripcion.precio}
            </p>
            <div className="w-12 h-px mb-6" style={{ backgroundColor: "var(--color-primario)" }} />
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Departamentos con 2 y 3 recámaras, acabados de primer nivel y diseño interior personalizable.
              Cada unidad cuenta con estacionamiento y espacio de almacenamiento.
            </p>
          </motion.div>

          {/* Grid de fachadas */}
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            {proyecto.descripcion.imagenes.map((src, i) => (
              <motion.div
                key={src}
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
                  <Image src={src} alt={`Fachada ${i + 1}`} fill className="object-cover" sizes="25vw" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
