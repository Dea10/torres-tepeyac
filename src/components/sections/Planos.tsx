"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Planos() {
  return (
    <section
      id="planos"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--color-superficie)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Distribución"
          title="Planta Tipo"
          subtitle={proyecto.planos.descripcion}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Plano */}
          <motion.div
            className="relative overflow-hidden"
            style={{ aspectRatio: "4/3", border: "1px solid var(--color-borde)" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={proyecto.planos.imagen}
              alt="Planta tipo Torres Tepeyac"
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Datos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-2">Superficie</p>
              <p className="font-display text-4xl text-white font-light">{proyecto.planos.superficie}</p>
            </div>
            <div className="w-12 h-px" style={{ backgroundColor: "var(--color-borde)" }} />
            <div>
              <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-2">Recámaras</p>
              <p className="font-display text-4xl text-white font-light">{proyecto.planos.recamaras}</p>
            </div>
            <div className="w-12 h-px" style={{ backgroundColor: "var(--color-borde)" }} />

            {/* Composición de la planta */}
            <div className="space-y-3">
              {[
                "Recámara principal",
                "Recámara secundaria",
                "Baño completo",
                "½ Baño de servicio",
                "Cocina",
                "Comedor · Sala",
                "Estacionamiento incluido",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-primario)" }} />
                  <p className="text-white/60 text-sm font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
