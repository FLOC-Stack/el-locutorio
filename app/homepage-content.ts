export type ShowCard = {
  id: string;
  city: string;
  date: string;
  time: string;
  capacity: string;
  theme: "blue" | "yellow";
  photo: { src: string; alt: string; width: number; height: number } | null;
  cta: { label: string; href: string | null; style: "solid" | "outline" };
};

export type EpisodesSectionContent = {
  id: string;
  hashtags: string;
  eyebrow: string;
  ctaLabel: string;
  emptyLabel: string;
  emptyTitle: string;
  emptyDescription: string;
};

export type WhyExistsSectionContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  claims: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type FooterContent = {
  tagline: string;
  socials: Array<{
    id: string;
    label: string;
    href: string;
    icon: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  }>;
  legalNotice: string;
  privacyLabel: string;
  termsLabel: string;
};

export type HomePageContent = {
  hero: {
    title: string;
    tagline: string;
    featuredGuest: {
      label: string;
      name: string;
      cta: string;
      ctaNote: string;
      image: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    };
  };
  about: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      theme: "green" | "blue";
      shape: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
      graphic: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    }>;
  };
  community: {
    id: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{
      id: string;
      number: number;
      title: string;
      description: string;
      theme: "yellow" | "green" | "blue" | "dark";
      sticker: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    }>;
  };
  shows: {
    id: string;
    eyebrow: string;
    title: string;
    cards: ShowCard[];
    upcoming: {
      label: string;
      cities: string[];
    };
  };
  episodes: EpisodesSectionContent;
  whyExists: WhyExistsSectionContent;
  footer: FooterContent;
};

export const homePageContent: HomePageContent = {
  hero: {
    title: "Con Harold\nCorrea",
    tagline: "Humor inteligente\n· Conversación incómoda\n· Comunidad real",
    featuredGuest: {
      label: "Entrevistamos a",
      name: "Luiza Bacceli",
      cta: "Play para ver el",
      ctaNote: "shows en vivo",
      image: {
        src: "/assets/guest-badge.png",
        alt: "Invitado destacado",
        width: 160,
        height: 160,
      },
    },
  },
  about: {
    id: "que-es",
    eyebrow: "Qué es",
    title: "No es un videopodcast.\nEs un movimiento cultural.",
    description:
      "Esto es un show cultural con público en vivo que amplifica la voz migrante con humor, conversación incómoda y producción cinematográfica.",
    cards: [
      {
        id: "show-en-vivo",
        title: "Show en vivo",
        description:
          "Público real, interacción directa y ambiente de barrio. Cada episodio es un evento.",
        theme: "green",
        shape: {
          src: "/assets/about-show-shape.svg",
          alt: "",
          width: 648,
          height: 546,
        },
        graphic: {
          src: "/assets/show-card.png",
          alt: "Silla de plástico como símbolo del show en vivo",
          width: 338,
          height: 498,
        },
      },
      {
        id: "comunidad-organizada",
        title: "Comunidad organizada",
        description:
          "WhatsApp, Telegram y eventos presenciales. Migrantes contigo, en movimiento activo.",
        theme: "blue",
        shape: {
          src: "/assets/about-community-shape.svg",
          alt: "",
          width: 648,
          height: 546,
        },
        graphic: {
          src: "/assets/community-card.png",
          alt: "Zapatos colgando como gesto de barrio y comunidad",
          width: 407,
          height: 443,
        },
      },
    ],
  },
  community: {
    id: "comunidad",
    eyebrow: "La Comunidad",
    title: "Seguimos haciendo camino.\nAhora nos toca contarlo.",
    subtitle: "El lugar donde el migrante toma el micrófono.",
    steps: [
      {
        id: "step-1",
        number: 1,
        title: "Ves el show",
        description:
          "YouTube o en directo. Producción cinematográfica, conversación real.",
        theme: "yellow",
        sticker: {
          src: "/assets/community-step-1-sticker.png",
          alt: "",
          width: 96,
          height: 82,
        },
      },
      {
        id: "step-2",
        number: 2,
        title: "Te unes\na nosotros",
        description:
          "Entra al grupo de WhatsApp y conecta con migrantes contigo.",
        theme: "green",
        sticker: {
          src: "/assets/community-step-2-sticker.png",
          alt: "",
          width: 79,
          height: 87,
        },
      },
      {
        id: "step-3",
        number: 3,
        title: "Participas\nen vivo",
        description:
          "Asistes al próximo show presencial. Público real, energía viva.",
        theme: "blue",
        sticker: {
          src: "/assets/community-step-3-sticker.png",
          alt: "",
          width: 115,
          height: 98,
        },
      },
      {
        id: "step-4",
        number: 4,
        title: "Formas parte\ndel movimiento",
        description:
          "Tu voz amplifica el movimiento. Eres parte activa.",
        theme: "dark",
        sticker: {
          src: "/assets/community-step-4-sticker.png",
          alt: "",
          width: 96,
          height: 68,
        },
      },
    ],
  },
  shows: {
    id: "shows-en-vivo",
    eyebrow: "Show en vivo",
    title: "TE ESPERAMOS EN EL PRÓXIMO SHOW",
    cards: [
      {
        id: "madrid",
        city: "MADRID",
        date: "22 MARZO 2026",
        time: "20H",
        capacity: "AFORO → 300 PERSONAS",
        theme: "blue",
        photo: {
          src: "/assets/show-live-card-madrid-building.png",
          alt: "Edificio Capitol de Madrid ilustrado",
          width: 832,
          height: 1276,
        },
        cta: { label: "RESERVA TU PLAZA", href: "#", style: "solid" },
      },
      {
        id: "barcelona",
        city: "BARCELONA",
        date: "13 AGOSTO 2026",
        time: "20H",
        capacity: "AFORO → 200 PERSONAS",
        theme: "yellow",
        photo: {
          src: "/assets/show-live-card-barcelona-top.png",
          alt: "Sagrada Família de Barcelona ilustrada",
          width: 864,
          height: 1215,
        },
        cta: { label: "MUY PRONTO", href: null, style: "outline" },
      },
    ],
    upcoming: {
      label: "PRÓXIMAMENTE EN OTRAS CIUDADES",
      cities: ["VALENCIA", "SEVILLA", "BILBAO", "ZARAGOZA"],
    },
  },
  episodes: {
    id: "episodios",
    hashtags: "#Humor #Barrio #Relatos #Familia migrante",
    eyebrow: "episodios",
    ctaLabel: "Ver más episodios",
    emptyLabel: "Estreno pendiente",
    emptyTitle: "El programa todavía no ha empezado",
    emptyDescription:
      "Cuando publiquemos episodios en YouTube aparecerán aquí automáticamente.",
  },
  whyExists: {
    id: "por-que-existimos",
    eyebrow: "Por qué existimos",
    title: "La nueva generación migrante\nno está esperando permiso.",
    description:
      "Durante años nos contaron una historia equivocada. La realidad es otra: somos quienes construimos negocios donde nadie invertía, quienes conectamos continentes, quienes enviamos dinero a casa mientras construimos futuro aquí.",
    claims: [
      "Constructora\nde empresas.",
      "Constructora\nde comunidades.",
      "Constructora\nde una nueva economía.",
    ],
    image: {
      src: "/assets/why-exist-portrait.png",
      alt: "Retrato editorial de una joven migrante",
      width: 1413,
      height: 1907,
    },
  },
  footer: {
    tagline: "Donde Empieza el movimiento",
    socials: [
      {
        id: "x",
        label: "X",
        href: "#",
        icon: {
          src: "/assets/x.png",
          alt: "",
          width: 243,
          height: 82,
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "#",
        icon: {
          src: "/assets/linkedin.png",
          alt: "",
          width: 221,
          height: 81,
        },
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "#",
        icon: {
          src: "/assets/youtube.png",
          alt: "",
          width: 76,
          height: 74,
        },
      },
    ],
    legalNotice: "El Locutorio 2026. Todos los derechos reservados",
    privacyLabel: "Política de privacidad",
    termsLabel: "Términos y condiciones",
  },
};
