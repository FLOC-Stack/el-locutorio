import type { CollectionConfig } from "payload";

export const Guests: CollectionConfig = {
  slug: "guests",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "richText",
    },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        {
          name: "instagram",
          type: "text",
        },
        {
          name: "twitter",
          type: "text",
        },
        {
          name: "linkedin",
          type: "text",
        },
        {
          name: "youtube",
          type: "text",
        },
      ],
    },
  ],
};
