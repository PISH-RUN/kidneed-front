import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";

export const useUpdateMe = () =>
  useMutation(["update-me"], (data: any) =>
    strapi.request("put", "/users/me", { data: { data } })
  );

export const useVerifyPassword = () =>
  useMutation(["update-me"], (data: any) =>
    strapi.request("post", "/users/me/verify-lock-password", { data: { data } })
  );

export const useUpdateChild = (childId?: number) =>
  useMutation(["update-child", childId], (data: any) =>
    strapi.request("put", `/children/${childId}`, { data: { data } })
  );