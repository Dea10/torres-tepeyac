"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Conceptualizacion() {
  const items = proyecto.conceptualizacion.items;

  return (
    <section
      id="conceptualizacion"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--color-superficie)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Proceso Creativo"
          title={proyecto.conceptualizacion.titulo}
          subtitle={proyecto.conceptualizacion.subtitulo}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.titulo}
              className="relative overflow-hidden group"
              style={{ aspectRatio: "3/4" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.tipo === "video" ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={item.src}
                  alt={item.titulo}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Número del paso */}
              <div
                className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center border text-xs font-medium"
                style={{ borderColor: "var(--color-primario)", color: "var(--color-primario)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-display text-xl font-light mb-1">{item.titulo}</p>
                <p className="text-white/50 text-xs font-light">{item.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
