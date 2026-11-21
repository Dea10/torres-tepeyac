export const proyecto = {
  nombre: "Torres Tepeyac",
  tagline: "Arquitectura que transforma espacios en experiencias",
  ubicacion: "Estado de México",
  header1: "Desarrollo",

  portada: {
    // Video de fondo de la portada (loop)
    video: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1777087518/V-01_idmewv.mp4",
    // Video que se abre en pantalla completa al dar click en Explorar
    videoIntro: "https://res.cloudinary.com/dv2vr7jc7/video/upload/v1795303349/Depts_Intro_y9yeyj.mp4",
    // Nivel de Disponibilidad al que "aterriza" el video al terminar
    nivelDestino: "n4",
  },

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
    redes: [
      { plataforma: "Instagram", usuario: "@torrestepeyac", url: "https://instagram.com/torrestepeyac" },
      { plataforma: "Facebook",  usuario: "Torres Tepeyac",  url: "https://facebook.com/torrestepeyac" },
    ],
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
      titulo: "85 m² de construcción",
      caracteristicas: [
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

  tourVirtual: {
    paginas: [
      {
        frames: [
          { label: "3D",                      url: "https://render-gs.d5render.com/personal-render?load=https://usa-ai.d5cdn.com/ai/gs/output/2047548609483337729/2047548609468100609_backup.splat&gsId=2047548609468100609" },
          { label: "Recorrido 360° Exterior", url: "https://render-gs.d5render.com/personal-render?load=https://usa-ai.d5cdn.com/ai/gs/output/2049740970147373058/2049740970126401538_backup.ply&gsId=2049740970126401538" },
        ],
      },
    ],
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

  vistasDron: {
    imagenes: [
      "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-20_q77719",
      "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-19_xtq522",
      "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1777087518/I-21_byj0d9",
    ],
  },

  avancesObra: {
    frames: [
      { label: "", url: "https://tour.panoee.net/6a6fb8ccaf97663952b77fd5/4" },
      { label: "", url: "https://www.youtube.com/embed/IkBbifTWTAc?autoplay=1&mute=1" },
    ],
    imagenes: [
      { id: "I-22_ycr7p7", label: "I-22" },
      { id: "I-23_klnbsh", label: "I-23" },
      { id: "I-24_olrxrd", label: "I-24" },
      { id: "I-25_n6alkp", label: "I-25" },
      { id: "I-26_kbmn7o", label: "I-26" },
      { id: "I-27_za4q15", label: "I-27" },
      { id: "I-28_mvof30", label: "I-28" },
      { id: "I-29_guyfo2", label: "I-29" },
      { id: "I-30_sllasw", label: "I-30" },
      { id: "I-31_hvri9v", label: "I-31" },
    ],
  },

  disponibilidad: {
    // Tamaño original de las imágenes de nivel. Las zonas se miden en estas coordenadas,
    // así que funcionan en cualquier tamaño de pantalla.
    // Zonas por nivel (cada render tiene su propio encuadre):
    //   cortes = 7 posiciones X que separan los 6 deptos (T1-izq, T1-der, T2-izq, …, T3-der)
    //   y / alto = franja vertical de los deptos
    // Para ajustarlas: abrir /disponibilidad?calibrar=1 y hacer click en la imagen para ver coordenadas.
    tamanoImagen: { ancho: 2472, alto: 1728 },

    // Datos comunes de las unidades (cada unidad puede sobreescribirlos)
    unidadBase: {
      costo: "$1,700,000",
      superficie: "85 m²",
      foto: "/assets/vista-master-room-01.png",
    },
    // Tour 360° según el lado del departamento (son espejo)
    tours: {
      izq: "https://tour.panoee.net/luckstudio/entrada-1",
      der: "https://tour.panoee.net/6a6fd097944bdbd3e54d12f4/entrada",
    },

    // TODO: estados de ejemplo (N4 según el esbozo de Jorge); confirmar con Jorge
    niveles: [
      {
        id: "pb", label: "Planta Baja", imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1795303334/NPB_p2l6uo.png",
        zonas: { y: 454, alto: 367, cortes: [227, 573, 910, 1240, 1571, 1898, 2232] },
        unidades: [
          { zona: "T1-izq", id: "T1-01", estado: "disponible" },
          { zona: "T1-der", id: "T1-02", estado: "apartado" },
          { zona: "T2-izq", id: "T2-01", estado: "no-disponible" },
          { zona: "T2-der", id: "T2-02", estado: "disponible" },
          { zona: "T3-izq", id: "T3-01", estado: "disponible" },
          { zona: "T3-der", id: "T3-02", estado: "apartado" },
        ],
      },
      {
        id: "n1", label: "Nivel 1", imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1795298279/Nivel_1_snc577.png",
        zonas: { y: 455, alto: 367, cortes: [200, 545, 889, 1234, 1581, 1920, 2265] },
        unidades: [
          { zona: "T1-izq", id: "T1-03", estado: "no-disponible" },
          { zona: "T1-der", id: "T1-04", estado: "disponible" },
          { zona: "T2-izq", id: "T2-03", estado: "disponible" },
          { zona: "T2-der", id: "T2-04", estado: "apartado" },
          { zona: "T3-izq", id: "T3-03", estado: "disponible" },
          { zona: "T3-der", id: "T3-04", estado: "disponible" },
        ],
      },
      {
        id: "n2", label: "Nivel 2", imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1795298280/Nivel_2_o0iyv5.png",
        zonas: { y: 455, alto: 367, cortes: [200, 545, 889, 1234, 1581, 1920, 2265] },
        unidades: [
          { zona: "T1-izq", id: "T1-05", estado: "disponible" },
          { zona: "T1-der", id: "T1-06", estado: "disponible" },
          { zona: "T2-izq", id: "T2-05", estado: "apartado" },
          { zona: "T2-der", id: "T2-06", estado: "no-disponible" },
          { zona: "T3-izq", id: "T3-05", estado: "disponible" },
          { zona: "T3-der", id: "T3-06", estado: "disponible" },
        ],
      },
      {
        id: "n3", label: "Nivel 3", imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1795298280/Nivel_3_prqdck.png",
        zonas: { y: 410, alto: 408, cortes: [129, 505, 870, 1234, 1602, 1963, 2340] },
        unidades: [
          { zona: "T1-izq", id: "T1-07", estado: "apartado" },
          { zona: "T1-der", id: "T1-08", estado: "disponible" },
          { zona: "T2-izq", id: "T2-07", estado: "disponible" },
          { zona: "T2-der", id: "T2-08", estado: "disponible" },
          { zona: "T3-izq", id: "T3-07", estado: "no-disponible" },
          { zona: "T3-der", id: "T3-08", estado: "disponible" },
        ],
      },
      {
        id: "n4", label: "Nivel 4", imagen: "https://res.cloudinary.com/dv2vr7jc7/image/upload/v1795298279/Nivel_4_o4xvcc.png",
        zonas: { y: 385, alto: 439, cortes: [41, 445, 838, 1236, 1637, 2028, 2431] },
        unidades: [
          { zona: "T1-izq", id: "T1-09", estado: "no-disponible" },
          { zona: "T1-der", id: "T1-10", estado: "no-disponible" },
          { zona: "T2-izq", id: "T2-09", estado: "disponible" },
          { zona: "T2-der", id: "T2-10", estado: "disponible" },
          { zona: "T3-izq", id: "T3-09", estado: "disponible" },
          { zona: "T3-der", id: "T3-10", estado: "disponible" },
        ],
      },
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
    redes: [
      { plataforma: "Instagram", usuario: "@luckstudio.official", url: "https://www.instagram.com/luckstudio.official/" },
      { plataforma: "Facebook",  usuario: "LuckStudio",           url: "https://www.facebook.com/people/LuckStudio/61561040937396/" },
      { plataforma: "TikTok",    usuario: "@luckstudio.official", url: "https://www.tiktok.com/@luckstudio.official" },
    ],
  },
} as const;

export type Proyecto = typeof proyecto;
