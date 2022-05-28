import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useStaticTexts = () =>
  useQuery<any>(["yekodo", "static-texts"], () =>
    strapi.request("get", "/statics?pagination[pageSize]=100")
  );