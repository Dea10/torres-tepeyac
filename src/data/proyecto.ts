export const proyecto = {
  nombre: "Torres Tepeyac",
  tagline: "Arquitectura que transforma espacios en experiencias",
  ubicacion: "Estado de México",

  tema: {
    colorFondo:      "#0D1B2A",
    colorSuperficie: "#1B263B",
    colorMedio:      "#415A77",
    colorPrimario:   "#778DA9",
    colorTexto:      "#E0E1DD",
  },

  contacto: {
    whatsapp: "525619167822",
    mensajeWhatsapp: "Hola, me interesa conocer más sobre Conjunto Torres Tepeyac.",
    email: "contacto@torrestepeyac.mx",
    nombre: "Conjunto Torres Tepeyac",
  },

  modulos: {
    portada:          true,
    inicio:           true,
    ubicacion:        true,
    procesoDiseno:    true,
    interiores:       true,
    exteriores:       true,
    disponibilidad:   true,
    vistasConDron:    true,
    tourVirtual:      true,
    avancesObra:      true,
    contacto:         true,
  },

  hero: {
    videoUrl: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/dron-vista-torres_t2i7kd.mp4",
    imagenFallback: "/assets/fachada-frontal-atardecer.png",
  },

  inicio: {
    videoIzquierda: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-02_k0yjjp.mp4",
    videoDerecha:   "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-14_cyv2yh.mp4",
    unidad: {
      titulo: "La Unidad",
      caracteristicas: [
        "85 m² de construcción",
        "3 recámaras",
        "Estancia · comedor",
        "Cocina",
        "Patio de servicio",
        "2 baños completos",
        "Cajón de estacionamiento",
        "Escaleras de acceso amplias",
        "2 departamentos por piso",
        "Conjunto totalmente bardeado",
      ],
    },
    conjunto: {
      titulo: "El Conjunto",
      highlights: [
        { valor: "30",        etiqueta: "Departamentos",       prefijo: "" },
        { valor: "3",         etiqueta: "Torres · 10 deptos c/u", prefijo: "" },
        { valor: "1,700,000", etiqueta: "Desde · MXN",        prefijo: "$" },
      ],
      descripcion: "Diseño interior personalizable",
    },
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
        src: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/render-vista-torres_itn2fo.mp4",
        titulo: "Render Final",
        descripcion: "El proyecto terminado en 3D",
      },
    ],
  },

  interiores: {
    videoPortada: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-08_zzpjbn.mp4",
    espacios: [
      { label: "Sala · Comedor · Cocina", video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-09_u78rgz.mp4" },
      { label: "Recámara Principal",       video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-10_tfveue.mp4" },
      { label: "Recámara Secundaria",      video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-11_gacq31.mp4" },
      { label: "Sala Entretenimiento",     video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-12_gbzhqh.mp4" },
    ],
    bloques: [
      ["I-05_z7uter", "I-09_ifooo1", "I-10_uabf4g"],
      ["I-06_pomz6n", "I-11_avyyxq", "I-12_w9q8zc"],
      ["I-07_e3rtnz", "I-13_onol5a", "I-14_axisp0"],
      ["I-08_femitq", "I-15_wr98mf", "I-16_rbdbj5"],
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
        video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/render-master-room-01_wpfprw.mp4",
      },
      {
        id: 2,
        nombre: "Master Room — Versión B",
        descripcion: "Propuesta luminosa y minimalista con luz natural y tonos neutros",
        imagen: "/assets/vista-master-room-02.png",
        video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/render-master-room-02_ojy34w.mp4",
      },
      {
        id: 3,
        nombre: "Sala · Comedor · Cocina",
        descripcion: "Planta abierta que integra los espacios sociales con iluminación cálida",
        imagen: "/assets/vista-sala-comedor-cocina.png",
        video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/seccion-render-sala-comerdor-cocina_pdi3d9.mp4",
      },
      {
        id: 4,
        nombre: "Cuarto Gamer",
        descripcion: "Un espacio versátil que demuestra el potencial de cada recámara",
        imagen: "/assets/vista-cuarto-gamer.png",
        video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/render-cuarto-gamer_vxvweh.mp4",
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
    videoUrl: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/dron-vista-torres_t2i7kd.mp4",
    descripcion: "Una perspectiva privilegiada del desarrollo y su entorno",
  },

  procesoDiseno: {
    celdas: [
      { id: "planta-tipo",    label: "Planta Tipo",     video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-05_k8rkol.mp4" },
      { id: "3d-conceptual",  label: "3D Conceptual",   video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-06_xwwlfe.mp4" },
      { id: "estudio-solar",  label: "Estudio Solar",   video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-15_hwtaqf.mp4" },
      { id: "sketch",         label: "Sketch",          video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-04_kin5aj.mp4" },
      { id: "maqueta",        label: "Maqueta",         video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-07_urx1u2.mp4" },
    ],
    celdaCompuesta: {
      imagenSupIzq: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-03_jjlibx",
      imagenSupDer: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-04_ufihlv",
      imagenInf:    "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-02_jfs06z",
    },
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

  seccionUbicacion: {
    direccion: "Calle Tepeyac No. 38, Colonia Guadalupe, Nicolás Romero, Estado de México",
    imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-01_pxx1pk.png",
    video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/v-03_ynpzjv.mp4",
    proximidad: [
      "A 20 minutos de Cd. Satélite",
      "Centros comerciales a 300 metros",
      "Town Center Nicolás Romero a 5 minutos",
    ],
  },

  exteriores: {
    video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-13_ilifa8.mp4",
    imagenes: [
      "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-17_lkfo2o",
      "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-18_xeqmt7",
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
    whatsapp: "525619167822",
    mensajeWhatsapp: "Hola Jorge, quiero conocer más sobre el showroom digital para mi proyecto.",
  },
} as const;

export type Proyecto = typeof proyecto;
