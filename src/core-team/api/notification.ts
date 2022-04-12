import { useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useNotification = () =>
  useQuery<any>(["notification"], () =>
    strapi.request("get", "/notifications")
  );