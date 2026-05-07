import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";
import Link from "next/link";

export default function PortadaPage() {
  return (
    <PageShell>
      <div className="relative h-full w-full overflow-hidden">

        {/* Video fondo completo */}
        <video
          src={proyecto.portada.video}
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
        <div className="relative z-10 h-full flex flex-col items-center justify-between px-8">
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
            <p
              className="text-lg tracking-widest uppercase max-w-sm"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              {proyecto.tagline}
            </p>
            <Link
              href="/inicio"
              className="mt-4 px-8 py-3 text-[18px] tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-80 py-40"
              style={{ backgroundColor: "", color: "var(--color-texto)" }}
            >
              Explorar
            </Link>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
