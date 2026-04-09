/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";
import configPromise from "@payload-config";

export const generateMetadata = (args: any) =>
  generatePageMetadata({ config: configPromise, ...args });

export default function Page(args: any) {
  return (
    <RootPage
      config={configPromise}
      importMap={importMap}
      {...args}
    />
  );
}
