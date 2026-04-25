"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

// ── Componentes base ──────────────────────────────────────

function Label({ text, fase }: { text: string; fase?: string }) {
  return (
    <>
      {fase && (
        <span
          className="absolute top-3 right-3 text-[9px] tracking-[0.4em] uppercase px-2 py-0.5"
          style={{ backgroundColor: "var(--color-medio)", color: "var(--color-texto)" }}
        >
          {fase}
        </span>
      )}
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)" }}
      />
      <span
        className="absolute bottom-3 left-4 text-[11px] tracking-[0.25em] uppercase font-light"
        style={{ color: "rgba(224,225,221,0.85)" }}
      >
        {text}
      </span>
    </>
  );
}

function CeldaV({
  src, label, fase, area, objectPosition = "center",
}: {
  src: string; label: string; fase?: string; area: string; objectPosition?: string;
}) {
  return (
    <div className="relative overflow-hidden" style={{ gridArea: area }}>
      <video
        src={src} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
      />
      <Label text={label} fase={fase} />
    </div>
  );
}

function CeldaI({
  src, label, fase, area, objectFit = "cover",
}: {
  src: string; label: string; fase?: string; area: string; objectFit?: "cover" | "contain";
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ gridArea: area, backgroundColor: "var(--color-fondo)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt={label}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
      />
      <Label text={label} fase={fase} />
    </div>
  );
}

// ── Componente principal ──────────────────────────────────

export default function ProcesoDisenoAlt() {
  const { celdas, celdaCompuesta } = proyecto.procesoDiseno;
  const [plantaTipo, conceptual, estudioSolar, sketch, maqueta] = celdas;

  return (
    <PageShell>
      <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: "var(--color-fondo)" }}>

        {/* Header slim */}
        <div
          className="shrink-0 flex items-center justify-between px-6 border-b"
          style={{ height: "44px", borderColor: "var(--color-borde)", backgroundColor: "var(--color-superficie)" }}
        >
          <span className="font-display text-lg font-light tracking-widest" style={{ color: "var(--color-texto)" }}>
            Proceso de Diseño
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--color-primario)" }}>
            Ideación · Desarrollo · Resultado
          </span>
        </div>

        {/*
          Grid de áreas — 4 columnas × 3 filas
          ┌──────────┬──────────┬──────────┬──────────┐
          │          │          │ planta   │ solar    │  42fr
          │ sketch   │ concept. ├──────────┼──────────┤
          │          │          │ inicial  │ final    │  28fr
          ├──────────┴──────────┼──────────┴──────────┤
          │     diagrama        │      maqueta         │  30fr
          └─────────────────────┴──────────────────────┘
        */}
        <div
          className="flex-1 min-h-0 overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "42fr 28fr 30fr",
            gridTemplateAreas: `
              "sketch conceptual planta  solar"
              "sketch conceptual inicial final"
              "diagrama diagrama maqueta maqueta"
            `,
            gap: "1px",
            backgroundColor: "var(--color-borde)",
          }}
        >
          <CeldaV area="sketch"    src={sketch.video}     label="Sketch"        fase="Ideación"    />
          <CeldaV area="conceptual" src={conceptual.video} label="3D Conceptual" fase="Desarrollo"  />
          <CeldaV area="planta"    src={plantaTipo.video}  label="Planta Tipo"   fase="Resultado"   />
          <CeldaV area="solar"     src={estudioSolar.video} label="Estudio Solar" objectPosition="55% center" />
          <CeldaI area="inicial"   src={celdaCompuesta.imagenSupIzq} label="Inicial" />
          <CeldaI area="final"     src={celdaCompuesta.imagenSupDer} label="Final"   />
          <CeldaI area="diagrama"  src={celdaCompuesta.imagenInf}    label="Diagrama" objectFit="contain" />
          <CeldaV area="maqueta"   src={maqueta.video}    label="Maqueta" />
        </div>

      </div>
    </PageShell>
  );
}
