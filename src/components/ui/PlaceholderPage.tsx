import PageShell from "@/components/ui/PageShell";

interface PlaceholderPageProps {
  numero: string;
  titulo: string;
  descripcion?: string;
  bg?: string;
}

export default function PlaceholderPage({ numero, titulo, descripcion, bg = "var(--color-fondo)" }: PlaceholderPageProps) {
  return (
    <PageShell>
      <div
        className="h-full w-full flex flex-col items-center justify-center px-8 text-center gap-4"
        style={{ backgroundColor: bg }}
      >
        <span
          className="text-[10px] font-mono tracking-[0.3em]"
          style={{ color: "var(--color-medio)" }}
        >
          {numero}
        </span>
        <h1
          className="font-display text-5xl md:text-7xl font-light"
          style={{ color: "var(--color-texto)" }}
        >
          {titulo}
        </h1>
        {descripcion && (
          <p
            className="text-sm max-w-sm"
            style={{ color: "rgba(224,225,221,0.4)" }}
          >
            {descripcion}
          </p>
        )}
        <div
          className="mt-6 w-16 h-px"
          style={{ backgroundColor: "var(--color-borde)" }}
        />
        <p
          className="text-[10px] tracking-widest uppercase"
          style={{ color: "var(--color-primario)" }}
        >
          Contenido próximamente
        </p>
      </div>
    </PageShell>
  );
}
