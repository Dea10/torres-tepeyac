"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { proyecto } from "@/data/proyecto";

const links = [
  { href: "#conceptualizacion", label: "Proceso" },
  { href: "#interiorismo", label: "Interiorismo" },
  { href: "#planos", label: "Planos" },
  { href: "#ubicacion", label: "Ubicación" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5"
          style={{
            background: "rgba(10,10,10,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(201,169,110,0.1)",
          }}
        >
          <span
            className="font-display text-lg font-light tracking-widest"
            style={{ color: "var(--color-primario)" }}
          >
            {proyecto.nombre}
          </span>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/${proyecto.contacto.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] uppercase px-5 py-2 transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: "var(--color-primario)", color: "#0A0A0A" }}
          >
            Contactar
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
