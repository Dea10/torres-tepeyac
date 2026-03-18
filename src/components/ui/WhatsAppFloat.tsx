"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { proyecto } from "@/data/proyecto";

export default function WhatsAppFloat() {
  const whatsappUrl = `https://wa.me/${proyecto.contacto.whatsapp}?text=${encodeURIComponent(proyecto.contacto.mensajeWhatsapp)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={26} color="white" />
    </motion.a>
  );
}
