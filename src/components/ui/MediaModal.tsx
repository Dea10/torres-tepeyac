"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type MediaItem = {
  src: string;
  type: "image" | "video";
  label?: string;
};

interface Props {
  items: MediaItem[];
  indice: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MediaModal({ items, indice, onClose, onPrev, onNext }: Props) {
  const item = items[indice];
  const multi = items.length > 1;

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(13,27,42,0.95)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-4 left-0 right-0 flex items-center justify-between px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {multi ? (
          <span style={{ color: "var(--color-texto)", fontSize: "10px", letterSpacing: "0.2em" }}>
            {indice + 1} / {items.length}
          </span>
        ) : <span />}
        <button
          className="p-2 rounded-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-texto)" }}
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Media */}
      <motion.div
        key={item.src}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center w-full h-full px-16 py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.label ?? ""}
            style={{ maxHeight: "85vh", maxWidth: "85vw", objectFit: "contain" }}
          />
        ) : (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            loop
            playsInline
            style={{ maxHeight: "85vh", maxWidth: "85vw" }}
          />
        )}
      </motion.div>

      {/* Label */}
      {item.label && (
        <span
          className="absolute bottom-6 right-6 px-3 py-1.5 rounded-sm"
          style={{ backgroundColor: "rgba(245,240,232,0.95)", color: "#1a1a1a", fontSize: "10px", letterSpacing: "0.15em" }}
        >
          {item.label}
        </span>
      )}

      {/* Prev */}
      {multi && (
        <button
          className="absolute left-4 p-3 rounded-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-texto)" }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {multi && (
        <button
          className="absolute right-4 p-3 rounded-sm transition-opacity hover:opacity-60"
          style={{ color: "var(--color-texto)" }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </motion.div>
  );
}
