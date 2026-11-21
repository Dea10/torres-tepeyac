"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import UnidadCard, { resolverUnidades } from "@/components/ui/UnidadCard";
import ZonasNivel from "@/components/ui/ZonasNivel";
import { proyecto } from "@/data/proyecto";

const LEYENDA = [
  { color: "#4caf50", label: "Disponible" },
  { color: "#ffc107", label: "Apartado" },
  { color: "#f44336", label: "No Disponible" },
];

const EASE = [0.65, 0, 0.35, 1] as const;

/** Duración del "viaje": más pisos = viaje más largo */
const duracionViaje = (pisos: number) => 0.9 + 0.15 * pisos;

type Viaje = { dir: number; pisos: number };

/*
 * Efecto "atravesar el piso" (zoom-through con crossfade):
 * - Bajar (dir < 0): la cámara desciende. El piso actual crece hacia la cámara
 *   y se desvanece (lo atraviesas) mientras el de abajo aparece desde lejos.
 * - Subir (dir > 0): al revés. El piso actual se aleja y se desvanece
 *   mientras el de arriba se materializa desde cerca.
 * Ambos pisos se animan al mismo tiempo (se encima uno sobre otro).
 */
const CERCA = 1.6;  // escala "pegado a la cámara"
const LEJOS = 0.7;  // escala "a lo lejos"

const variantesPiso: Variants = {
  entrar: ({ dir }: Viaje) => ({
    scale: dir > 0 ? CERCA : LEJOS,
    opacity: 0,
    filter: "blur(10px)",
  }),
  centro: ({ pisos }: Viaje) => ({
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: duracionViaje(pisos),
      ease: EASE,
      opacity: { duration: duracionViaje(pisos) * 0.7, delay: duracionViaje(pisos) * 0.3, ease: "easeOut" },
    },
  }),
  salir: ({ dir, pisos }: Viaje) => ({
    scale: dir > 0 ? LEJOS : CERCA,
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: duracionViaje(pisos),
      ease: EASE,
      opacity: { duration: duracionViaje(pisos) * 0.7, ease: "easeIn" },
    },
  }),
};

const TAM = proyecto.disponibilidad.tamanoImagen;

const etiquetaCorta = (id: string) => (id === "pb" ? "PB" : id.replace(/^n/, ""));

interface Props {
  /** id del nivel con el que abre (por defecto el más alto) */
  nivelInicial?: string;
  /** true = llega desde el video de portada: arranca con la imagen a pantalla completa */
  intro?: boolean;
  /** true = muestra las zonas de los departamentos para ajustarlas */
  calibrar?: boolean;
}

type Rect = { top: number; left: number; width: number; height: number };

export default function Disponibilidad({ nivelInicial, intro = false, calibrar = false }: Props) {
  const { niveles } = proyecto.disponibilidad;
  const indiceInicial = (() => {
    const i = niveles.findIndex((n) => n.id === nivelInicial);
    return i >= 0 ? i : niveles.length - 1;
  })();

  const [activo, setActivo] = useState(indiceInicial);
  const [viaje, setViaje] = useState<Viaje>({ dir: 0, pisos: 0 });
  const [animando, setAnimando] = useState(false);
  const nivel = niveles[activo];
  const unidades = resolverUnidades(nivel);

  // ── Unidad activa (hover o fijada con click) ─────────────────
  const [hover, setHover] = useState<string | null>(null);
  const [fija, setFija] = useState<string | null>(null);
  const timerHover = useRef<ReturnType<typeof setTimeout>>(undefined);
  const idActiva = fija ?? hover;
  const unidadActiva = unidades.find((u) => u.id === idActiva) ?? null;

  const onHoverZona = (id: string | null) => {
    clearTimeout(timerHover.current);
    if (id) setHover(id);
    // Pequeño retraso al salir, para poder llegar a la card
    else timerHover.current = setTimeout(() => setHover(null), 300);
  };
  const onSelectZona = (id: string) => setFija((f) => (f === id ? null : id));

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setFija(null);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // ── Aterrizaje desde el video ────────────────────────────────
  const [introActiva, setIntroActiva] = useState(intro);
  const [destinoIntro, setDestinoIntro] = useState<Rect | null>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!introActiva) return;
    let timer: ReturnType<typeof setTimeout>;
    const img = new Image();
    img.onload = () => {
      const slot = slotRef.current;
      if (!slot) return;
      // Calcular dónde queda la imagen con object-contain dentro del área
      const r = slot.getBoundingClientRect();
      const ratio = img.naturalWidth / img.naturalHeight;
      const width = Math.min(r.width, r.height * ratio, img.naturalWidth);
      const height = width / ratio;
      timer = setTimeout(() => {
        setDestinoIntro({
          top: r.top + (r.height - height) / 2,
          left: r.left + (r.width - width) / 2,
          width,
          height,
        });
      }, 300);
    };
    img.src = niveles[indiceInicial].imagen;
    return () => clearTimeout(timer);
  }, [introActiva, indiceInicial, niveles]);

  const cambiarNivel = (i: number) => {
    if (i === activo || animando || introActiva) return;
    setViaje({ dir: Math.sign(i - activo), pisos: Math.abs(i - activo) });
    setAnimando(true);
    setActivo(i);
    setHover(null);
    setFija(null);
  };

  // Elementos de UI: aparecen después del aterrizaje
  const ui = {
    initial: intro ? { opacity: 0, y: 12 } : false,
    animate: introActiva ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <PageShell animar={!intro}>
        <div
          className="h-full flex flex-col"
          style={{ backgroundColor: "var(--bg-neutro)" }}
        >
          {/* Barra de navegación */}
          <motion.div
            {...ui}
            className="shrink-0 flex items-center justify-between gap-4 pl-16 pr-4 md:px-6 py-3 border-b"
            style={{ borderColor: "white" }}
          >
            {/* Botones de nivel */}
            <div className="flex items-center gap-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {niveles.map((n, i) => (
                <button
                  key={n.id}
                  onClick={() => cambiarNivel(i)}
                  className="shrink-0 px-4 py-2 rounded-sm transition-all duration-200 text-[14px] tracking-[0.2em] uppercase"
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
            <div className="hidden lg:flex shrink-0 items-center gap-5">
              {LEYENDA.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="text-[14px] tracking-[0.15em] uppercase"
                    style={{ color: "var(--color-primario)" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Imagen del nivel con transición de elevador */}
          <div className="hidden md:block relative flex-1 min-h-0 overflow-hidden" onClick={() => setFija(null)}>
            {/* Área de referencia para calcular el aterrizaje */}
            <div ref={slotRef} className="absolute inset-4 md:right-24 pointer-events-none" />

            {/* Oculto mientras la capa de aterrizaje cubre la pantalla */}
            <div className="absolute inset-0" style={{ opacity: introActiva ? 0 : 1 }}>
            <AnimatePresence initial={false} custom={viaje}>
              <motion.div
                key={nivel.id}
                custom={viaje}
                variants={variantesPiso}
                initial="entrar"
                animate="centro"
                exit="salir"
                onAnimationComplete={(def) => def === "centro" && setAnimando(false)}
                className="absolute inset-4 md:right-24 flex items-center justify-center"
                style={{ containerType: "size" }}
              >
                {/* Caja con la proporción exacta de la imagen: las zonas escalan con ella */}
                <div
                  className="relative @container"
                  style={{
                    width: `min(100cqw, calc(100cqh * ${TAM.ancho / TAM.alto}))`,
                    aspectRatio: `${TAM.ancho} / ${TAM.alto}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nivel.imagen}
                    alt={`Disponibilidad ${nivel.label}`}
                    className="absolute inset-0 w-full h-full"
                  />
                  <ZonasNivel
                    zonas={nivel.zonas}
                    unidades={unidades}
                    activa={idActiva}
                    onHover={onHoverZona}
                    onSelect={onSelectZona}
                    calibrar={calibrar}
                  />
                  {/* Card de la unidad, abajo a la izquierda */}
                  <AnimatePresence>
                    {unidadActiva && !animando && (
                      <motion.div
                        key={unidadActiva.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-3 bottom-3 w-52 @[640px]:w-64 z-20"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => clearTimeout(timerHover.current)}
                        onMouseLeave={() => onHoverZona(null)}
                      >
                        <UnidadCard
                          unidad={unidadActiva}
                          onClose={fija ? () => setFija(null) : undefined}
                          className="shadow-2xl"
                          variante="plano"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>


                </div>
              </motion.div>
            </AnimatePresence>
            </div>

            {/* Indicador tipo elevador */}
            <motion.div
              {...ui}
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-1"
            >
              {[...niveles].map((n, i) => ({ n, i })).reverse().map(({ n, i }) => (
                <button
                  key={n.id}
                  onClick={() => cambiarNivel(i)}
                  aria-label={n.label}
                  className="relative w-12 h-12 flex items-center justify-center text-[13px] tracking-[0.15em]"
                  style={{ color: activo === i ? "var(--color-texto)" : "var(--color-primario)" }}
                >
                  {activo === i && (
                    <motion.span
                      layoutId="elevador-marcador"
                      className="absolute inset-1 rounded-full border"
                      style={{ borderColor: "var(--color-texto)" }}
                      transition={{ duration: duracionViaje(viaje.pisos), ease: EASE }}
                    />
                  )}
                  <span className="relative">{etiquetaCorta(n.id)}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Móvil: solo las cards del nivel (sin plano ni animaciones) */}
          <div className="md:hidden flex-1 min-h-0 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={nivel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onAnimationComplete={() => setAnimando(false)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
              >
                {unidades.map((u) => (
                  <UnidadCard key={u.id} unidad={u} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </PageShell>

      {/* Capa de aterrizaje: empieza idéntica al último frame de VideoIntro
          (imagen a pantalla completa) y se encoge hasta su lugar en el layout */}
      {introActiva && (
        <motion.div
          className="fixed z-50 overflow-hidden bg-black"
          style={{ top: 0, left: 0, width: "100vw", height: "100vh" }}
          animate={destinoIntro ?? undefined}
          transition={{ duration: 1.2, ease: EASE }}
          onAnimationComplete={() => destinoIntro && setIntroActiva(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={niveles[indiceInicial].imagen}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </>
  );
}
