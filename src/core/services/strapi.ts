import Strapi from "strapi-sdk-js";

export const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.yekodo.pish.run",
  store: {
    key: "access_token",
    useLocalStorage: true
  }
});

strapi.axios.interceptors.request.use(
  (config) => {
    // @ts-ignore
    const header = config?.headers?.common?.Authorization;
    if (
      (
        location.href.includes("/login") &&
        (!config.url?.includes("core/login") && !config.url?.includes("/children") && !config.url?.includes("core/otp"))
      )
      && !header
    ) {
      return false;
    }

    return config;
  }
);

strapi.axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if ((error?.config && !error?.config?.headers?.Authorization) || (error?.response?.status === 401)) {
      if(location.pathname !== "/" && location.pathname !== "/subscription" && !location.href.includes("/payment-result") && !location.href.includes("/login")) {
        return location.href = "/login";
      }

      return strapi.removeToken();
    }
    if ((error?.config && error?.config?.headers?.Authorization) && (error?.response?.status === 403)) {
      if(location.pathname !== "/" && location.pathname !== "/subscription" && !location.href.includes("/payment-result") && !location.href.includes("/login")) {
        return location.href = "/subscription";
      }
    }

    return Promise.reject(error);
  }
);