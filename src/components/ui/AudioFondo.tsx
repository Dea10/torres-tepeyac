"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { proyecto } from "@/data/proyecto";

const STORAGE_KEY = "audioFondo:pausado";
const FADE_MS = 1500;

function leerPausado() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function guardarPausado(valor: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, valor ? "1" : "0");
  } catch {
    // sin storage (modo privado, etc.) — no pasa nada
  }
}

export default function AudioFondo() {
  const { url, volumen: volumenInicial } = proyecto.audioFondo;

  const audioRef   = useRef<HTMLAudioElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const iniciado   = useRef(false);

  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState<number>(volumenInicial);
  // iOS Safari ignora audio.volume: ahí solo se muestra play/pausa
  const [volumenControlable, setVolumenControlable] = useState(false);

  const fadeIn = (audio: HTMLAudioElement, destino: number) => {
    audio.volume = 0;
    const inicio = performance.now();
    const paso = (ahora: number) => {
      const t = Math.min((ahora - inicio) / FADE_MS, 1);
      audio.volume = destino * t;
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  const reproducir = async (conFade: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (conFade) fadeIn(audio, volumen);
      else audio.volume = volumen;
      await audio.play();
      setSonando(true);
    } catch {
      setSonando(false);
    }
  };

  // Detecta si el navegador permite cambiar el volumen por código
  useEffect(() => {
    const prueba = new Audio();
    prueba.volume = 0.5;
    setVolumenControlable(prueba.volume === 0.5);
  }, []);

  // Arranca con la primera interacción del usuario en cualquier parte del sitio
  useEffect(() => {
    const alInteractuar = (e: Event) => {
      if (iniciado.current) return;
      // Los clicks sobre el propio control los maneja el botón
      if (controlRef.current?.contains(e.target as Node)) return;
      iniciado.current = true;
      quitar();
      if (!leerPausado()) reproducir(true);
    };
    const eventos = ["pointerdown", "keydown", "touchstart"] as const;
    const quitar = () => eventos.forEach((ev) => window.removeEventListener(ev, alInteractuar, true));
    eventos.forEach((ev) => window.addEventListener(ev, alInteractuar, true));
    return quitar;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alternar = () => {
    const audio = audioRef.current;
    if (!audio) return;
    iniciado.current = true;
    if (sonando) {
      audio.pause();
      setSonando(false);
      guardarPausado(true);
    } else {
      guardarPausado(false);
      reproducir(false);
    }
  };

  const cambiarVolumen = (valor: number) => {
    setVolumen(valor);
    if (audioRef.current) audioRef.current.volume = valor;
  };

  return (
    <div
      ref={controlRef}
      className="group fixed top-4 right-4 z-40 flex items-center p-2 rounded-sm backdrop-blur-sm transition-colors duration-300"
      style={{ backgroundColor: "rgba(13,27,42,0.3)", color: "var(--color-texto)" }}
    >
      <audio ref={audioRef} src={url} loop preload="none" />

      {/* Barra de volumen: oculta, se despliega hacia la izquierda al hacer hover.
          Va antes del botón para que el botón se quede fijo en la esquina */}
      {volumenControlable && (
        <div className="hidden md:flex items-center overflow-hidden w-0 opacity-0 group-hover:w-24 group-hover:opacity-100 group-focus-within:w-24 group-focus-within:opacity-100 transition-all duration-300">
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volumen}
            onChange={(e) => cambiarVolumen(Number(e.target.value))}
            className="mr-2 w-20 cursor-pointer"
            style={{ accentColor: "var(--color-texto)" }}
            aria-label="Volumen de la música"
          />
        </div>
      )}

      <button
        onClick={alternar}
        className="transition-opacity duration-200 hover:opacity-60"
        aria-label={sonando ? "Pausar música" : "Reproducir música"}
      >
        {sonando ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
