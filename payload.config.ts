import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./collections/Users";
import { Episodes } from "./collections/Episodes";
import { Guests } from "./collections/Guests";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURL = process.env.DATABASE_URL;
const payloadSecret = process.env.PAYLOAD_SECRET;

if (!databaseURL) {
  console.warn(
    "[payload] Missing DATABASE_URL. Payload admin and API routes will fail until it is configured.",
  );
}

if (!payloadSecret) {
  console.warn(
    "[payload] Missing PAYLOAD_SECRET. Payload admin and API routes will fail until it is configured.",
  );
}

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname, "./app/(payload)"),
    },
  },
  collections: [Users, Episodes, Guests],
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL || "",
    },
  }),
  editor: lexicalEditor({}),
  secret: payloadSecret || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
