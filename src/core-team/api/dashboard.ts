import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";

export const useDashboard = (child?: number, date?: [Date | Moment | null, Date | Moment | null]) => {
  const start = jMoment(date && date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date && date[1]).endOf("day").format("YYYY-MM-DD");

  return useQuery(["yekodo", "dashboard", child], () =>
      strapi.request<any>("get", `/children/${child}/activities`, {
        params: {
          filters: {
            $and: [
              {
                date: {
                  $gte: start
                }
              },
              {
                date: {
                  $lte: end
                }
              }
            ]
          }
        }

      }),
    {
      enabled: !!child
    }
  );
}

export const useStats = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date[1]).endOf("day").format("YYYY-MM-DD");

  return useQuery(["yekodo", "stats", child, start, end], () =>
      strapi.request<any>("get", `/children/${child}/stats`, {
        params: {
          from: start,
          to: end
        }
      }),
    {
      enabled: !!child
    }
  );
};