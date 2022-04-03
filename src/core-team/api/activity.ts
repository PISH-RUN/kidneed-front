import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";

export const useTodayActivity = (child?: number, date = moment()) =>
  useQuery(["activity", child, date.startOf("day").toISOString()], () =>
      strapi.request<any>("get", `/children/${child}/activities`, {
        params: {
          filters: {
            date: date.startOf("day").toISOString()
          }
        }
      }),
    {
      enabled: !!child
    }
  );

export const useActivity = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").toISOString();
  const end = jMoment(date[1]).startOf("day").toISOString();

  return useQuery(["activity", child, start, end], () =>
      strapi.request<any>("get", `/children/${child}/activities`, {
        params: {
          pagination: {
            pageSize: 200
          },
          filters: {
            $and: [
              {
                date: {
                  $gte: start,
                },
              },
              {
                date: {
                  $lt: end
                },
              }
            ]
          }
        }
      }),
    {
      enabled: !!child && date[0] !== null && date[1] !== null
    }
  );
}