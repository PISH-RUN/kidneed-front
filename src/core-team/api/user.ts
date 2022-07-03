import { useMutation, useQuery } from "react-query";
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
    strapi.request<any>("put", `/children/${childId}`, { data: { data } })
  );

export const useDeleteChild = () =>
  useMutation(["delete-child"], (childId: number) =>
    strapi.request("delete", `/children/${childId}`)
  );

export const useChildGrowthField = (childId?: number, month?: number, year?: number) =>
  useQuery(["yekodo", "child-growth-field", childId], () =>
      strapi
        .request<any>("get", `/my-children/${childId}/growth-field`),
    {
      enabled: !!childId
    }
  );