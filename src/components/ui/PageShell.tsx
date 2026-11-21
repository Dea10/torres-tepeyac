"use client";

import { motion } from "framer-motion";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  /** false = sin animación de entrada (p. ej. al llegar desde una transición de video) */
  animar?: boolean;
}

export default function PageShell({ children, className = "", animar = true }: PageShellProps) {
  return (
    <motion.div
      initial={animar ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full w-full overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
