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
};
