import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useRegister = () =>
  useMutation(["register"], (data: any) =>
    strapi.request<any>("post", "/children/register", {
      data: data
    })
  );

export const useGrowthFields = () =>
  useQuery(["yekodo", "growth-fields"], () =>
    strapi
      .request<any>("get", `/growth-fields`)
  );

export const useSetGrowthField = () =>
  useMutation(["set-growth-field"], (data: any) =>
    strapi
      .request<any>("post", `/children/${data.childId}/select-growth-field`, {
        data: {
          data: {
            field: data.field,
          }
        }
      })
  );