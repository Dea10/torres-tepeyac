"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { proyecto } from "@/data/proyecto";

export const navItems = [
  { href: "/",                  label: "Portada",            key: "portada"        },
  { href: "/inicio",            label: "Inicio",             key: "inicio"         },
  { href: "/ubicacion",         label: "Ubicación",          key: "ubicacion"      },
  { href: "/proceso-de-diseno", label: "Proceso de Diseño",  key: "procesoDiseno"  },
  { href: "/interiores",        label: "Interiores",         key: "interiores"     },
  { href: "/exteriores",        label: "Exteriores",         key: "exteriores"     },
  { href: "/disponibilidad",    label: "Disponibilidad",     key: "disponibilidad" },
  { href: "/vistas-con-dron",   label: "Vistas con Dron",    key: "vistasConDron"  },
  { href: "/tour-virtual",      label: "3D & Tour Virtual",  key: "tourVirtual"    },
  { href: "/avances-de-obra",   label: "Avances de Obra",    key: "avancesObra"    },
  { href: "/contacto",          label: "Contacto",           key: "contacto"       },
] as const;

type NavKey = typeof navItems[number]["key"];

function NavLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const modulos = proyecto.modulos as Record<NavKey, boolean>;

  return (
    <nav className="flex flex-col gap-1 flex-1 overflow-y-auto py-2">
      {navItems
        .filter((item) => modulos[item.key])
        .map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-sm transition-all duration-200"
              style={{
                backgroundColor: isActive ? "var(--color-medio)" : "transparent",
                color: isActive ? "var(--color-texto)" : "rgba(224,225,221,0.5)",
              }}
            >
              <span
                className="text-[10px] font-mono tabular-nums shrink-0 transition-colors duration-200"
                style={{ color: isActive ? "var(--color-primario)" : "rgba(119,141,169,0.4)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[11px] tracking-[0.15em] uppercase font-light transition-colors duration-200 group-hover:text-[var(--color-texto)]"
              >
                {item.label}
              </span>
            </Link>
          );
        })}
    </nav>
  );
}

export default function SideNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar — desktop */}
      <aside
        className="hidden md:flex flex-col w-56 shrink-0 h-screen border-r"
        style={{
          backgroundColor: "var(--color-superficie)",
          borderColor: "var(--color-borde)",
        }}
      >
        <div className="px-4 py-6 border-b" style={{ borderColor: "var(--color-borde)" }}>
          <span
            className="font-display text-base font-light tracking-widest block leading-tight"
            style={{ color: "var(--color-texto)" }}
          >
            {proyecto.nombre}
          </span>
          <span
            className="text-[10px] tracking-widest uppercase mt-1 block"
            style={{ color: "var(--color-primario)" }}
          >
            {proyecto.ubicacion}
          </span>
        </div>

        <NavLinks />

        <div className="px-4 py-5 border-t" style={{ borderColor: "var(--color-borde)" }}>
          <a
            href={`https://wa.me/${proyecto.contacto.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-2.5 text-[10px] tracking-[0.2em] uppercase rounded-sm transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: "var(--color-medio)", color: "var(--color-texto)" }}
          >
            Contactar
          </a>
        </div>
      </aside>

      {/* Mobile: hamburger + drawer */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-sm"
          style={{ backgroundColor: "var(--color-superficie)", color: "var(--color-texto)" }}
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40"
                style={{ backgroundColor: "rgba(13,27,42,0.7)" }}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 left-0 h-full z-50 w-64 flex flex-col border-r"
                style={{
                  backgroundColor: "var(--color-superficie)",
                  borderColor: "var(--color-borde)",
                }}
              >
                <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: "var(--color-borde)" }}>
                  <span
                    className="font-display text-base font-light tracking-widest"
                    style={{ color: "var(--color-texto)" }}
                  >
                    {proyecto.nombre}
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar menú"
                    style={{ color: "var(--color-primario)" }}
                  >
                    <X size={18} />
                  </button>
                </div>

                <NavLinks onClose={() => setOpen(false)} />

                <div className="px-4 py-5 border-t" style={{ borderColor: "var(--color-borde)" }}>
                  <a
                    href={`https://wa.me/${proyecto.contacto.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-full py-2.5 text-[10px] tracking-[0.2em] uppercase rounded-sm"
                    style={{ backgroundColor: "var(--color-medio)", color: "var(--color-texto)" }}
                  >
                    Contactar
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
