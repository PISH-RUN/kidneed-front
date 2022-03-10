import { useMutation, useQuery } from "react-query";
import moment from "moment";
import { strapi } from "@kidneed/services";

export const useTodayActivity = (child?: number, date = moment()) =>
  useQuery(["activity", child], () =>
      strapi.request<any>("get", "/activities", {
        params: {
          filters: {
            date: date.startOf('day').toISOString(),
            child
          }
        }
      }),
    {
      enabled: !!child
    }
  );