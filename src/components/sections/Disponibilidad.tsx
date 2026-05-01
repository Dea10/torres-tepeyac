"use client";

import { useState } from "react";
import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

const BASE = "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/";

const LEYENDA = [
  { color: "#4caf50", label: "Disponible" },
  { color: "#ffc107", label: "Apartado" },
  { color: "#f44336", label: "No Disponible" },
];

export default function Disponibilidad() {
  const { niveles } = proyecto.disponibilidad;
  const [activo, setActivo] = useState(0);
  const nivel = niveles[activo];

  return (
    <PageShell>
      <div
        className="h-full flex flex-col"
        style={{ backgroundColor: "var(--bg-neutro)" }}
      >
        {/* Barra de navegación */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-3 border-b"
          style={{ borderColor: "var(--color-borde)" }}
        >
          {/* Botones de nivel */}
          <div className="flex items-center gap-1">
            {niveles.map((n, i) => (
              <button
                key={n.id}
                onClick={() => setActivo(i)}
                className="px-4 py-2 rounded-sm transition-all duration-200 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: activo === i ? "var(--color-fondo)" : "transparent",
                  color: activo === i ? "var(--color-texto)" : "var(--color-primario)",
                }}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Leyenda */}
          <div className="hidden md:flex items-center gap-5">
            {LEYENDA.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--color-primario)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Imagen del nivel */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={nivel.id}
            src={`${BASE}${nivel.imagen}`}
            alt={`Disponibilidad ${nivel.label}`}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Leyenda móvil */}
        <div
          className="md:hidden shrink-0 flex items-center justify-center gap-5 px-6 py-3 border-t"
          style={{ borderColor: "var(--color-borde)" }}
        >
          {LEYENDA.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "var(--color-primario)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
