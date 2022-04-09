import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useRegister = () =>
  useMutation(["register"], (data: any) =>
    strapi.request<any>("post", "/children/register", {
      data: data
    })
  );

export const useSetGrowthField = () =>
  useMutation(["growth-field"], (data: any) =>
    strapi
      .request<any>("post", `/children/${data.childId}/growth-field`, {
        data: {
          data: {
            field: data.field,
          }
        }
      })
  );