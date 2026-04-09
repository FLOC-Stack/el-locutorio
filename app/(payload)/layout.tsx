import type { Metadata } from "next";
// @ts-expect-error -- Payload CSS module has no type declarations
import "@payloadcms/next/css";

export const metadata: Metadata = {
  title: "Admin — El Locutorio",
};

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
