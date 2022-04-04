import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";

export const useDashboard = (child?: number) =>
  useQuery(["dashboard", child], () =>
      strapi.request<any>("get", `/children/${child}/dashboard`),
    {
      enabled: !!child
    }
  );

export const useStats = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date[1]).endOf("day").format("YYYY-MM-DD");

  return useQuery(["stats", child, start, end], () =>
      strapi.request<any>("post", `/dashboard/${child}/stats`, {
        data: {
          start,
          end
        }
      }),
    {
      enabled: !!child
    }
  );
};