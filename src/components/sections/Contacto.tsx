"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { proyecto } from "@/data/proyecto";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contacto() {
  const whatsappUrl = `https://wa.me/${proyecto.contacto.whatsapp}?text=${encodeURIComponent(proyecto.contacto.mensajeWhatsapp)}`;

  return (
    <section id="contacto" className="py-24 px-6 max-w-3xl mx-auto text-center">
      <SectionHeader
        label="Contacto"
        title="¿Te interesa?"
        subtitle="Nuestros asesores están listos para resolver todas tus dudas"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass p-10 space-y-6"
      >
        <p className="text-white/60 text-sm font-light">
          {proyecto.contacto.nombre}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 px-8 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
        >
          <MessageCircle size={18} />
          Escribir por WhatsApp
        </a>

        <a
          href={`mailto:${proyecto.contacto.email}`}
          className="flex items-center justify-center gap-3 w-full py-4 px-8 text-sm tracking-widest uppercase font-medium border transition-all duration-300 hover:bg-white/5"
          style={{
            borderColor: "var(--color-borde)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <Mail size={18} />
          {proyecto.contacto.email}
        </a>
      </motion.div>
    </section>
  );
}
