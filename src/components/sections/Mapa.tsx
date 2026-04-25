"use client";

import { motion } from "framer-motion";
import { GraduationCap, Heart, ShoppingBag, Trees, MapPin, ExternalLink } from "lucide-react";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";
import type { LucideProps } from "lucide-react";

const iconosPorCategoria: Record<string, React.ComponentType<LucideProps>> = {
  "Educación": GraduationCap,
  "Salud": Heart,
  "Comercio": ShoppingBag,
  "Recreación": Trees,
};

export default function Mapa() {
  const categorias = Array.from(new Set(proyecto.mapa.puntosDeInteres.map((p) => p.categoria)));

  return (
    <section
      id="ubicacion"
      className="py-24 px-6"
      style={{ backgroundColor: "var(--color-superficie)" }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Ubicación"
          title="¿Dónde estamos?"
          subtitle={proyecto.ubicacion}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps iframe */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
            style={{ aspectRatio: "4/3", border: "1px solid var(--color-borde)" }}
          >
            <iframe
              src={proyecto.mapa.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Torres Tepeyac"
            />
            {/* Link a Google Maps */}
            <a
              href={proyecto.mapa.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 text-[10px] tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--color-primario)", color: "#0A0A0A" }}
            >
              <ExternalLink size={10} />
              Abrir en Maps
            </a>
          </motion.div>

          {/* Puntos de interés */}
          <div className="space-y-8">
            {categorias.map((categoria, catIndex) => {
              const Icono = iconosPorCategoria[categoria] ?? MapPin;
              const puntos = proyecto.mapa.puntosDeInteres.filter((p) => p.categoria === categoria);

              return (
                <motion.div
                  key={categoria}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icono size={16} strokeWidth={1.5} style={{ color: "var(--color-primario)" }} />
                    <p
                      className="text-xs tracking-widest uppercase font-medium"
                      style={{ color: "var(--color-primario)" }}
                    >
                      {categoria}
                    </p>
                  </div>
                  <div className="space-y-2 pl-7">
                    {puntos.map((punto) => (
                      <div key={punto.nombre} className="flex justify-between items-center">
                        <p className="text-white/70 text-sm font-light">{punto.nombre}</p>
                        <p className="text-white/30 text-xs">{punto.distancia}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Link directo */}
            <motion.a
              href={proyecto.mapa.gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b pb-1 transition-opacity hover:opacity-70"
              style={{ color: "var(--color-primario)", borderColor: "var(--color-primario)" }}
            >
              <MapPin size={12} />
              Ver en Google Maps
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
