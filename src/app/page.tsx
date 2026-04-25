import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";
import Link from "next/link";

export default function PortadaPage() {
  return (
    <PageShell>
      <div
        className="relative h-full w-full flex flex-col items-center justify-center text-center px-8"
        style={{ backgroundColor: "var(--color-fondo)" }}
      >
        {/* Placeholder: aquí irá el video/imagen de portada */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "linear-gradient(135deg, var(--color-superficie) 0%, var(--color-fondo) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <p
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--color-primario)" }}
          >
            {proyecto.ubicacion}
          </p>
          <h1
            className="font-display text-6xl md:text-8xl font-light leading-none"
            style={{ color: "var(--color-texto)" }}
          >
            {proyecto.nombre}
          </h1>
          <p
            className="text-sm tracking-widest uppercase max-w-xs"
            style={{ color: "rgba(224,225,221,0.5)" }}
          >
            {proyecto.tagline}
          </p>
          <Link
            href="/inicio"
            className="mt-4 px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: "var(--color-medio)", color: "var(--color-texto)" }}
          >
            Explorar
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
