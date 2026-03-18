export const proyecto = {
  nombre: "Torres Tepeyac",
  tagline: "Arquitectura que transforma espacios en experiencias",
  ubicacion: "Estado de México",

  tema: {
    colorPrimario: "#C9A96E",
    colorFondo: "#0A0A0A",
    colorTexto: "#FFFFFF",
  },

  contacto: {
    whatsapp: "525619167822",
    mensajeWhatsapp: "Hola, me interesa conocer más sobre Conjunto Torres Tepeyac.",
    email: "contacto@torrestepeyac.mx",
    nombre: "Conjunto Torres Tepeyac",
  },

  modulos: {
    hero: true,
    presentacion: true,
    descripcion: true,
    conceptualizacion: true,
    interiorismo: true,
    planos: true,
    drone: true,
    ubicacion: true,
    pitch: true,
    contacto: true,
  },

  hero: {
    // Video principal del drone para el fondo del hero
    videoUrl: "/assets/dron-vista-torres.mp4",
    imagenFallback: "/assets/fachada-frontal-atardecer.png",
  },

  descripcion: {
    precio: "$1,700,000",
    caracteristicas: [
      { valor: "3", etiqueta: "Torres" },
      { valor: "5", etiqueta: "Niveles" },
      { valor: "2", etiqueta: "Deptos. por piso" },
      { valor: "30", etiqueta: "Unidades totales" },
    ],
    texto:
      "Conjunto habitacional de alto estándar diseñado para integrar arquitectura contemporánea con calidad de vida. Tres torres de cinco niveles con dos departamentos por planta, pensadas para familias que buscan espacios amplios en un entorno tranquilo.",
    imagenes: [
      "/assets/fachada-frontal-01.png",
      "/assets/fachada-frontal-02.png",
      "/assets/fachada-frontal-03.png",
      "/assets/fachada-frontal-atardecer.png",
    ],
  },

  conceptualizacion: {
    titulo: "Del Boceto al Render",
    subtitulo: "El proceso creativo detrás del proyecto",
    items: [
      {
        tipo: "imagen" as const,
        src: "/assets/dibuno-fachada-isometrico-mano.png",
        titulo: "El Proceso",
        descripcion: "Cada proyecto comienza a mano",
      },
      {
        tipo: "imagen" as const,
        src: "/assets/dibujo-fachada-isometrico.png",
        titulo: "Volumetría Isométrica",
        descripcion: "Definición de volúmenes y proporciones",
      },
      {
        tipo: "video" as const,
        src: "/assets/render-vista-torres.mp4",
        titulo: "Render Final",
        descripcion: "El proyecto terminado en 3D",
      },
    ],
  },

  interiorismo: {
    titulo: "Propuestas de Interiorismo",
    subtitulo: "Así se puede vivir en Torres Tepeyac",
    espacios: [
      {
        id: 1,
        nombre: "Master Room — Versión A",
        descripcion: "Ambiente sofisticado con iluminación indirecta y acabados en negro y mármol",
        imagen: "/assets/vista-master-room-01.png",
        video: "/assets/render-master-room-01.mp4",
      },
      {
        id: 2,
        nombre: "Master Room — Versión B",
        descripcion: "Propuesta luminosa y minimalista con luz natural y tonos neutros",
        imagen: "/assets/vista-master-room-02.png",
        video: "/assets/render-master-room-02.mp4",
      },
      {
        id: 3,
        nombre: "Sala · Comedor · Cocina",
        descripcion: "Planta abierta que integra los espacios sociales con iluminación cálida",
        imagen: "/assets/vista-sala-comedor-cocina.png",
        video: "/assets/seccion-render-sala-comerdor-cocina.mp4",
      },
      {
        id: 4,
        nombre: "Cuarto Gamer",
        descripcion: "Un espacio versátil que demuestra el potencial de cada recámara",
        imagen: "/assets/vista-cuarto-gamer.png",
        video: "/assets/render-cuarto-gamer.mp4",
      },
    ],
  },

  planos: {
    imagen: "/assets/vista-plano-planta-tipo.png",
    descripcion: "Planta tipo con dos departamentos espejados por piso. Cada unidad cuenta con recámara principal, recámara secundaria, baño completo, medio baño de servicio, cocina, comedor y sala.",
    superficie: "Desde 85 m²",
    recamaras: "2 a 3 recámaras",
  },

  drone: {
    videoUrl: "/assets/dron-vista-torres.mp4",
    descripcion: "Una perspectiva privilegiada del desarrollo y su entorno",
  },

  mapa: {
    lat: 19.619457,
    lng: -99.3035216,
    zoom: 17,
    embedUrl: "https://maps.google.com/maps?q=19.619457,-99.3035216&z=17&output=embed",
    gmapsUrl: "https://maps.app.goo.gl/v2PBw54zXTdSsdps8",
    puntosDeInteres: [
      { categoria: "Educación", nombre: "Colegio cercano", distancia: "500m" },
      { categoria: "Salud", nombre: "Hospital regional", distancia: "1km" },
      { categoria: "Comercio", nombre: "Supermercado", distancia: "400m" },
      { categoria: "Recreación", nombre: "Parque público", distancia: "600m" },
    ],
  },

  pitch: {
    titulo: "¿Tienes un desarrollo y quieres presentarlo así?",
    subtitulo: "Ofrecemos plataforma digital interactiva por proyecto",
    servicios: [
      "Renders fotorrealistas de fachada e interiores",
      "Animaciones y recorridos 3D",
      "Tour Virtual 360°",
      "Video aéreo con dron",
      "Showroom digital con acceso por enlace único",
    ],
    whatsapp: "525531112718",
    mensajeWhatsapp: "Hola Jorge, quiero conocer más sobre el showroom digital para mi proyecto.",
  },
} as const;

export type Proyecto = typeof proyecto;
