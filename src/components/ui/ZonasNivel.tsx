"use client";

import { useState } from "react";
import { proyecto } from "@/data/proyecto";
import { estadoDe, type Unidad } from "@/components/ui/UnidadCard";

export type ZonasData = { y: number; alto: number; cortes: readonly number[] };

/** Orden de las zonas según los cortes: T1-izq, T1-der, T2-izq, … */
const ORDEN_ZONAS = ["T1-izq", "T1-der", "T2-izq", "T2-der", "T3-izq", "T3-der"];

interface Props {
  zonas: ZonasData;
  unidades: Unidad[];
  activa: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  /** Muestra contornos e ids, y las coordenadas del click en la imagen */
  calibrar?: boolean;
}

const T = proyecto.disponibilidad.tamanoImagen;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/**
 * Capa de zonas sobre la imagen del nivel. Las posiciones son porcentajes de la
 * imagen original, así que escalan con ella en cualquier tamaño de pantalla.
 * Debe ir dentro de una caja con la misma proporción que la imagen.
 */
export default function ZonasNivel({ zonas, unidades, activa, onHover, onSelect, calibrar = false }: Props) {
  const [punto, setPunto] = useState<string | null>(null);

  const medir = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!calibrar) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * T.ancho);
    const y = Math.round(((e.clientY - r.top) / r.height) * T.alto);
    setPunto(`x: ${x}, y: ${y}`);
    console.log(`[calibrar] x: ${x}, y: ${y}`);
  };

  return (
    <div className="absolute inset-0" onClickCapture={medir}>
      {unidades.map((u) => {
        const i = ORDEN_ZONAS.indexOf(u.zona);
        if (i < 0 || i + 1 >= zonas.cortes.length) return null;
        const z = {
          x: zonas.cortes[i],
          y: zonas.y,
          ancho: zonas.cortes[i + 1] - zonas.cortes[i],
          alto: zonas.alto,
        };
        const estado = estadoDe(u.estado);
        const esActiva = activa === u.id;
        return (
          <div
            key={u.id}
            role="button"
            tabIndex={0}
            aria-label={`Unidad ${u.id}, ${estado.label}`}
            onMouseEnter={() => onHover(u.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(u.id)}
            onBlur={() => onHover(null)}
            onClick={(e) => { e.stopPropagation(); onSelect(u.id); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(u.id); }}
            className="absolute cursor-pointer transition-all duration-300 outline-none"
            style={{
              left: pct(z.x, T.ancho),
              top: pct(z.y, T.alto),
              width: pct(z.ancho, T.ancho),
              height: pct(z.alto, T.alto),
              backgroundColor: esActiva ? `${estado.color}40` : "transparent",
              boxShadow: esActiva || calibrar ? `inset 0 0 0 2px ${calibrar ? "#00e5ff" : estado.color}` : "none",
            }}
          >
            {/* Etiqueta de estado */}
            <span
              className="absolute left-1/2 top-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full whitespace-nowrap text-[10px] font-medium shadow transition-transform duration-300"
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "#1a1a1a",
                transform: `translate(-50%, -50%) scale(${esActiva ? 1.15 : 1})`,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: estado.color }} />
              {u.id}
              {calibrar && <span className="text-[#00838f]">· {u.zona}</span>}
            </span>
          </div>
        );
      })}

      {calibrar && punto && (
        <span className="absolute top-2 left-2 px-2 py-1 rounded-sm bg-black/80 text-[#00e5ff] text-[12px] font-mono pointer-events-none">
          {punto}
        </span>
      )}
    </div>
  );
}
