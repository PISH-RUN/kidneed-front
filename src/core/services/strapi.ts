import Strapi from "strapi-sdk-js";

export const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.yekodo.net",
  store: {
    key: "access_token",
    useLocalStorage: true,
  },
});
