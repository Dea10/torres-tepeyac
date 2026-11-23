"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/ui/PageShell";
import VideoIntro from "@/components/ui/VideoIntro";
import { proyecto } from "@/data/proyecto";

const { video, videoIntro, nivelDestino } = proyecto.portada;
const nivel = proyecto.disponibilidad.niveles.find((n) => n.id === nivelDestino);
const rutaDestino = `/disponibilidad?nivel=${nivelDestino}&intro=1`;

// Desktop = 768px o más (en móvil no hay video intro ni precarga pesada)
const MQ_DESKTOP = "(min-width: 768px)";
const suscribirDesktop = (cb: () => void) => {
  const mq = window.matchMedia(MQ_DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useEsDesktop = () =>
  useSyncExternalStore(suscribirDesktop, () => window.matchMedia(MQ_DESKTOP).matches, () => false);

export default function PortadaPage() {
  const router = useRouter();
  const [reproduciendo, setReproduciendo] = useState(false);
  const esDesktop = useEsDesktop();

  useEffect(() => {
    router.prefetch(rutaDestino);
  }, [router]);

  // Desktop: mientras el usuario ve la portada, dejar en caché las imágenes de
  // todos los niveles para que Disponibilidad no se vea cargando
  useEffect(() => {
    if (!esDesktop) return;
    proyecto.disponibilidad.niveles.forEach((n) => {
      const img = new Image();
      img.src = n.imagen;
      img.decode().catch(() => {});
    });
  }, [esDesktop]);

  return (
    <>
    <PageShell>
      <div className="relative h-full w-full overflow-hidden bg-black">

        {/* Video fondo completo */}
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0) 100%)" }}
        />

        {/* Contenido centrado */}
        <AnimatePresence>
          {!reproduciendo && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full flex flex-col items-center justify-between px-8"
            >
              <div className="flex flex-col items-center text-center gap-6 py-32">
                <p
                  className="text-[24px] tracking-[0.4em] uppercase"
                  style={{ color: "var(--color-texto)" }}
                >
                  {proyecto.header1}
                </p>
                <h1
                  className="font-display text-6xl md:text-8xl font-light leading-none"
                  style={{ color: "var(--color-texto)" }}
                >
                  {proyecto.nombre}
                </h1>
                <button
                  onClick={() => {
                    // Móvil: directo a las cards, sin video (ahorra datos)
                    if (window.matchMedia("(max-width: 767px)").matches) router.push("/disponibilidad");
                    else setReproduciendo(true);
                  }}
                  className="mt-4 px-8 py-3 text-[18px] tracking-[0.3em] uppercase border transition-colors duration-300 border-[var(--color-texto)] text-[var(--color-texto)] hover:bg-[var(--color-texto)] hover:text-[var(--color-fondo)]"
                >
                  Explorar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageShell>

    {/* Fuera de PageShell: su transform rompería el position: fixed.
        En desktop se monta desde el inicio (oculto) para precargar el video. */}
    {esDesktop && nivel && (
      <VideoIntro
        src={videoIntro}
        activo={reproduciendo}
        imagenDestino={nivel.imagen}
        onFinish={() => router.push(rutaDestino)}
      />
    )}
    </>
  );
}
