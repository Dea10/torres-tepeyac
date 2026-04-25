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
- Dark theme: fondo #0A0A0A, texto blanco, acento dorado #C9A96E
- Animaciones: fade-up al entrar en viewport con Framer Motion (`whileInView`)
- No hay backend — todo es estático desde `proyecto.ts`

## Reglas
- No crear páginas adicionales sin pedirlo
- No instalar librerías sin consultarlo primero
- Los feature flags en `proyecto.modulos` deciden qué secciones se renderizan
- Los estilos de color vienen de las variables CSS definidas en `globals.css`, no hardcodeados
- Siempre se crea una rama nueva para trabajar — nunca se pushea directo a main
