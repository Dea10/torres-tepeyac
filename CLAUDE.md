# Showroom Inmobiliario — Demo

## Producto
Showroom web para arquitecto Jorge. Un showroom por desarrollo inmobiliario. Visual, editorial, elegante.

## Stack
- Next.js 14 (App Router, src/)
- Tailwind CSS
- Framer Motion (animaciones)
- Lucide React (íconos)

## Convenciones
- Todo el contenido del showroom vive en `src/data/proyecto.ts`
- Los componentes de sección van en `src/components/sections/`
- Los componentes reutilizables van en `src/components/ui/`
- Mobile-first siempre — si algo se ve mal en móvil, se oculta con `hidden md:block`
- Dark theme. La paleta actual vive en `globals.css` (`--color-*`) y en `proyecto.tema` — ver ahí los valores vigentes, no aquí
- Animaciones: fade-up al entrar en viewport con Framer Motion (`whileInView`)
- No hay backend — todo es estático desde `proyecto.ts`

## Reglas
- No crear páginas adicionales sin pedirlo
- No instalar librerías sin consultarlo primero
- Los feature flags en `proyecto.modulos` deciden qué secciones se renderizan
- Siempre se crea una rama nueva para trabajar — nunca se pushea directo a main

## Colores
- Jorge ajusta los colores con frecuencia y por percepción (más claro, más oscuro), sin una regla de diseño detrás. No asumir que la paleta es definitiva
- Preferir las variables CSS de `globals.css` cuando un color coincide con una de ellas, pero por ahora NO es obligatorio: hay valores hardcodeados (p. ej. `rgba(...)` en SideNav y overlays) y se aceptan mientras la paleta no se estabilice
- No refactorizar colores hardcodeados a variables a menos que se pida

## Pendientes
- Hay componentes en `src/components/sections/` que ya no se usan (versiones anteriores). Se removerán más adelante — no borrarlos hasta que se indique
