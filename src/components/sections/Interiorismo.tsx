"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";

type Espacio = { id: number; nombre: string; descripcion: string; imagen: string; video: string };

function EspacioCard({ espacio, index, onClick }: { espacio: Espacio; index: number; onClick: () => void }) {
  const isLarge = index === 0 || index === 3;
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${isLarge ? "md:row-span-2" : ""}`}
      style={{ minHeight: "320px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      <Image
        src={espacio.imagen}
        alt={espacio.nombre}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Play hint */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(201,169,110,0.9)" }}
        >
          <Play size={14} fill="#0A0A0A" color="#0A0A0A" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-1 font-medium"
          style={{ color: "var(--color-primario)" }}
        >
          Interiorismo
        </p>
        <h3 className="font-display text-xl text-white font-light mb-1">{espacio.nombre}</h3>
        <p className="text-white/50 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {espacio.descripcion}
        </p>
      </div>
    </motion.div>
  );
}

function VideoModal({ espacio, onClose }: { espacio: Espacio; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 280 }}
        className="w-full md:max-w-4xl md:mx-6 overflow-hidden flex flex-col"
        style={{
          borderRadius: "16px 16px 0 0",
          height: "92dvh",         // ocupa casi todo el viewport en móvil
          backgroundColor: "#0D0D0D",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Video ocupa el espacio disponible */}
        <video
          autoPlay
          controls
          playsInline
          className="w-full flex-1 min-h-0 object-contain"
          style={{ backgroundColor: "#000" }}
        >
          <source src={espacio.video} type="video/mp4" />
        </video>

        <div className="p-5 flex-shrink-0" style={{ backgroundColor: "#0D0D0D" }}>
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-1"
            style={{ color: "var(--color-primario)" }}
          >
            Interiorismo
          </p>
          <h3 className="font-display text-xl text-white font-light">{espacio.nombre}</h3>
          <p className="text-white/40 text-sm mt-1 font-light">{espacio.descripcion}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Interiorismo() {
  const [activo, setActivo] = useState<Espacio | null>(null);

  return (
    <section id="interiorismo" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Interiorismo"
          title={proyecto.interiorismo.titulo}
          subtitle={proyecto.interiorismo.subtitulo}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:grid-rows-2">
          {proyecto.interiorismo.espacios.map((espacio, i) => (
            <EspacioCard
              key={espacio.id}
              espacio={espacio}
              index={i}
              onClick={() => setActivo(espacio)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/25 text-xs tracking-widest uppercase mt-8"
        >
          Toca cualquier espacio para ver el render en video
        </motion.p>
      </div>

      <AnimatePresence>
        {activo && <VideoModal espacio={activo} onClose={() => setActivo(null)} />}
      </AnimatePresence>
    </section>
  );
}
