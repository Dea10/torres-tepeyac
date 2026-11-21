"use client";

import { X } from "lucide-react";
import { proyecto } from "@/data/proyecto";

export const ESTADOS: Record<string, { color: string; label: string }> = {
  disponible:      { color: "#4caf50", label: "Disponible" },
  apartado:        { color: "#ffc107", label: "Apartado" },
  "no-disponible": { color: "#f44336", label: "No disponible" },
};

export const estadoDe = (estado: string) => ESTADOS[estado] ?? ESTADOS["no-disponible"];

export type Unidad = {
  id: string;
  zona: string;
  estado: string;
  costo: string;
  superficie: string;
  foto: string;
  tour: string;
  nivel: string;
};

type NivelData = (typeof proyecto.disponibilidad.niveles)[number];

/** Une los datos de cada unidad con los valores comunes de `unidadBase` */
export function resolverUnidades(nivel: NivelData): Unidad[] {
  const { unidadBase, tours } = proyecto.disponibilidad;
  return nivel.unidades.map((u) => ({
    ...unidadBase,
    tour: u.zona.endsWith("izq") ? tours.izq : tours.der,
    nivel: nivel.label,
    ...u,
  }));
}

interface Props {
  unidad: Unidad;
  onClose?: () => void;
  className?: string;
  /**
   * "plano" = card sobre la imagen del nivel. Si el plano es chico (tablet),
   * se compacta: sin foto y sin la palabra "Unidad". Usa la @container del plano.
   */
  variante?: "lista" | "plano";
}

export default function UnidadCard({ unidad, onClose, className = "", variante = "lista" }: Props) {
  const plano = variante === "plano";
  const estado = estadoDe(unidad.estado);
  const mensaje = `Hola, me interesa la unidad ${unidad.id} (${unidad.nivel}) de ${proyecto.contacto.nombre}.`;
  const whatsappUrl = `https://wa.me/${proyecto.contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div
      className={`relative overflow-hidden rounded-sm border ${className}`}
      style={{ backgroundColor: "var(--color-superficie)", borderColor: "var(--color-borde)" }}
    >
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <X size={14} />
        </button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={unidad.foto} alt={`Unidad ${unidad.id}`} className={`w-full h-28 object-cover ${plano ? "hidden @[640px]:block" : ""}`} />

      <div className="p-4 flex flex-col gap-3">
        {/* Título y estado siempre en la misma línea */}
        <div
          className={`flex items-center justify-between gap-2 ${
            onClose && plano ? "pr-6 @[640px]:pr-0" : onClose ? "pr-6" : ""
          }`}
        >
          <p className="text-[12px] tracking-[0.12em] uppercase whitespace-nowrap" style={{ color: "var(--color-texto)" }}>
            <span className={plano ? "hidden @[640px]:inline" : ""}>Unidad </span>
            <span className="font-medium">{unidad.id}</span>
          </p>
          <span
            className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] tracking-[0.06em] uppercase whitespace-nowrap"
            style={{ backgroundColor: `${estado.color}26`, color: estado.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: estado.color }} />
            {estado.label}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-y-1 text-[12px]" style={{ color: "var(--color-primario)" }}>
          <dt>Nivel</dt>
          <dd className="text-right" style={{ color: "var(--color-texto)" }}>{unidad.nivel}</dd>
          <dt>Costo</dt>
          <dd className="text-right" style={{ color: "var(--color-texto)" }}>{unidad.costo}</dd>
          <dt>Superficie</dt>
          <dd className="text-right" style={{ color: "var(--color-texto)" }}>{unidad.superficie}</dd>
        </dl>

        <div className="flex flex-col gap-2 pt-1">
          <a
            href={unidad.tour}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-3 py-2 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap border transition-colors duration-300 hover:bg-white/10"
            style={{ color: "var(--color-texto)", borderColor: "var(--color-borde)" }}
          >
            Tour Virtual 360°
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-3 py-2 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-opacity duration-300 hover:opacity-80"
            style={{ backgroundColor: "var(--color-texto)", color: "var(--color-fondo)" }}
          >
            Solicitar información
          </a>
        </div>
      </div>
    </div>
  );
}
