import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useNotification = () =>
  useQuery<any>(["notification"], () =>
    strapi.request("get", "/users/me/notifications?populate=*")
  );

export const useNotificationRead = () =>
  useMutation<any>(["notification"], () =>
    strapi.request("post", "/notifications/read")
  );