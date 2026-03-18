"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="text-center mb-20"
    >
      <p
        className="text-[10px] tracking-[0.5em] uppercase mb-5 font-medium"
        style={{ color: "var(--color-primario)" }}
      >
        {label}
      </p>

      {/* Título con overflow reveal */}
      <div className="overflow-hidden">
        <motion.h2
          className="font-display text-5xl md:text-7xl font-light text-white mb-6"
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/40 text-base max-w-md mx-auto font-light tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
