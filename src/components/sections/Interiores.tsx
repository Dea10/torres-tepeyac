"use client";

import PageShell from "@/components/ui/PageShell";
import { proyecto } from "@/data/proyecto";

const BASE = "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/";

const BORDER = { backgroundColor: "var(--color-borde)" } as const;
const gap1 = { gap: "1px" } as const;

// ── Vignette ────────────────────────────────────────────────
function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(13,27,42,0.5) 100%)" }}
    />
  );
}

// ── Label inferior izquierdo ─────────────────────────────────
function Label({ text }: { text: string }) {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,27,42,0.9), transparent)" }}
      />
    </>
  );
}

// ── Video portada (col 1) ───────────────────────────────────
function CeldaPortada({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden">
      <video
        src={src} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Vignette />
      <Label text="Llave en mano" />
    </div>
  );
}

// ── Columna de espacio con alternating split ─────────────────
function CeldaEspacio({
  label, video, invertida,
}: { label: string; video: string; invertida: boolean }) {
  const labelBlock = (
    <div
      className="shrink-0 flex items-center px-4 py-3 justify-center"
      style={{ height: "52px", borderColor: "var(--color-borde)" }}
    >
      <span className="label-ui">{label}</span>
    </div>
  );

  const videoBlock = (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <video
        src={video} autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Vignette />
    </div>
  );

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ borderColor: "var(--color-borde)" }}
    >
      {invertida ? (
        <>
          {videoBlock}
          <div style={{ borderTop: "1px solid var(--color-borde)" , height: "30%" }}>{labelBlock}</div>
        </>
      ) : (
        <>
          <div style={{ borderBottom: "1px solid var(--color-borde)", height: "30%", display: "flex", flexDirection: "column-reverse" }}>{labelBlock}</div>
          {videoBlock}
        </>
      )}
    </div>
  );
}

// ── Imagen individual dentro de bloque ──────────────────────
function CeldaImg({ src }: { src: string }) {
  return (
    <div className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src} alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <Vignette />
    </div>
  );
}

// ── Bloque de 3 imágenes verticales ─────────────────────────
function Bloque({ imagenes }: { imagenes: readonly string[] }) {
  return (
    <div
      className="overflow-hidden pt-2 pl-2 pr-2 pb-16"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", ...gap1 }}
    >
      {imagenes.map((id) => (
        <CeldaImg key={id} src={`${BASE}${id}`} />
      ))}
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────
export default function Interiores() {
  const { videoPortada, espacios, bloques } = proyecto.interiores;

  return (
    <PageShell>
      <div className="h-full" style={{ backgroundColor: "var(--bg-neutro)" }}>
      <div
        className="h-full overflow-hidden"
        style={{ display: "grid", gridTemplateRows: "60fr 40fr", ...gap1 }}
      >
        {/* ── Parte superior: video portada + 4 espacios ── */}
        <div
          className="overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", ...gap1 }}
        >
          <CeldaPortada src={videoPortada} />
          {espacios.map((e, i) => (
            <CeldaEspacio
              key={e.label}
              label={e.label}
              video={e.video}
              invertida={i % 2 === 1}
            />
          ))}
        </div>

        {/* ── Parte inferior: 4 bloques × 3 imágenes ── */}
        <div
          className="overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", ...gap1}}
        >
          {bloques.map((b, i) => (
            <Bloque key={i} imagenes={b} />
          ))}
        </div>
      </div>
      </div>
    </PageShell>
  );
}
