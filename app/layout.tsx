import type { Metadata } from "next";
import "@/styles/styles.css";
import { CSSStudioBridge } from "./css-studio";

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
  const dallasBridgeUrl = process.env.NEXT_PUBLIC_DALLAS_BRIDGE_URL;
  const shouldLoadDallasBridge =
    process.env.NODE_ENV === "development" && !!dallasBridgeUrl;

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
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <CSSStudioBridge /> : null}
        {shouldLoadDallasBridge ? (
          <script
            type="module"
            src={dallasBridgeUrl}
          />
        ) : null}
      </body>
    </html>
  );
}
