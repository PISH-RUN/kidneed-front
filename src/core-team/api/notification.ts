import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useNotification = (search: string, sort: string, pagination: any) =>
  useQuery<any>(["notification", search, sort], () =>
    strapi.request("get", "/users/me/notifications", {
      params: {
        populate: "*",
        sort: ["createdAt:" + sort],
        pagination: { page: pagination.page, pageSize: pagination.pageSize },
        filters: {
          $or: [
            {
              body: {
                $contains: search || undefined,
              },
            },
            {
              title: {
                $contains: search || undefined,
              },
            }
          ]
        }
      }
    })
  );

export const useNotificationRead = () =>
  useMutation<any>(["notification"], () =>
    strapi.request("post", "/notifications/read")
  );