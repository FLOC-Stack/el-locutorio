import type { Metadata } from "next";
import "@/styles/styles.css";

export const metadata: Metadata = {
  title: "El Locutorio — Con Harold Correa",
  description:
    "El Locutorio: humor inteligente, conversacion incomoda y comunidad real con Harold Correa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          href="/fonts/vampiro-one-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
