import type { CollectionConfig } from "payload";

export const Episodes: CollectionConfig = {
  slug: "episodes",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "episodeNumber",
      type: "number",
    },
    {
      name: "youtubeUrl",
      type: "text",
    },
    {
      name: "publishedAt",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Borrador", value: "draft" },
        { label: "Publicado", value: "published" },
      ],
      defaultValue: "draft",
    },
  ],
};
