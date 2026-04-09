/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import configPromise from "@payload-config";

export const generateMetadata = (args: any) =>
  generatePageMetadata({ config: configPromise, ...args });

export default function NotFound(args: any) {
  return (
    <NotFoundPage
      config={configPromise}
      importMap={importMap}
      {...args}
    />
  );
}
