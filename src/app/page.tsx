import { proyecto } from "@/data/proyecto";
import Hero from "@/components/sections/Hero";
import Presentacion from "@/components/sections/Presentacion";
import Descripcion from "@/components/sections/Descripcion";
import Conceptualizacion from "@/components/sections/Conceptualizacion";
import Interiorismo from "@/components/sections/Interiorismo";
import Planos from "@/components/sections/Planos";
import Drone from "@/components/sections/Drone";
import Mapa from "@/components/sections/Mapa";
import Pitch from "@/components/sections/Pitch";
import Contacto from "@/components/sections/Contacto";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main style={{ backgroundColor: "var(--color-fondo)", color: "var(--color-texto)" }}>
      <Navbar />
      {proyecto.modulos.hero && <Hero />}
      {proyecto.modulos.presentacion && <Presentacion />}
      {proyecto.modulos.descripcion && <Descripcion />}
      {proyecto.modulos.conceptualizacion && <Conceptualizacion />}
      {proyecto.modulos.interiorismo && <Interiorismo />}
      {proyecto.modulos.planos && <Planos />}
      {proyecto.modulos.drone && <Drone />}
      {proyecto.modulos.ubicacion && <Mapa />}
      {proyecto.modulos.pitch && <Pitch />}
      {proyecto.modulos.contacto && <Contacto />}

      <WhatsAppFloat />

      <footer className="py-8 text-center border-t" style={{ borderColor: "var(--color-borde)" }}>
        <p className="text-white/20 text-xs tracking-widest uppercase">
          {proyecto.nombre} · {proyecto.ubicacion}
        </p>
      </footer>
    </main>
  );
}
