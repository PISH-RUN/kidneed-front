import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";
import axios from "axios";
import qs from "qs";
import { DAPI_URL } from "../constants";

export const useTodayActivity = (child?: number, date = moment()) =>
  useQuery(["activity", child, date.startOf("day").format("YYYY-MM-DD")], () =>
      strapi.request<any>("get", `/children/${child}/activities`, {
        params: {
          filters: {
            date: date.startOf("day").format("YYYY-MM-DD")
          }
        }
      }),
    {
      enabled: !!child
    }
  );

export const useActivityStats = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date[1]).endOf("day").format("YYYY-MM-DD");

  return useQuery(["activity", child, start, end], () =>
      strapi.request<any>("get", `/children/${child}/stats`, {
        params: {
          from: start,
          to: end
        }
      }),
    {
      enabled: !!child && date[0] !== null && date[1] !== null
    }
  );
};

export const useActivityGlance = (child?: number) =>
  useQuery(["activity-glance", child], () =>
      strapi.request<any>("get", `/children/${child}/current-month-activity-glance`),
    {
      enabled: !!child
    }
  );

export const useContent = (id?: number) =>
  useQuery(["content", id], () =>
      axios.get(`${DAPI_URL}/api/contents/${id}?populate=*`).then(resp => Promise.resolve(resp.data)),
    {
      enabled: !!id
    }
  );

export const useUpdateProgress = () =>
  useMutation(["progress"], ({ id, duration }: any) =>
    strapi.request("post", `/activities/${id}/progress`, {
      data: {
        data: {
          progress: duration
        }
      }
    })
  );

export const useContents = (ids?: number[]) => {
  const query = qs.stringify({
    populate: "*",
    filters: {
      id: {
        $in: ids
      }
    }
  }, {
    encodeValuesOnly: true
  });

  return useQuery(["content", ids], () =>
      axios.get(`${DAPI_URL}/api/contents?${query}`).then(resp => Promise.resolve(resp.data)),
    {
      enabled: !!ids
    }
  );
};

export const useSearchContents = () => useMutation(["contents-search"], ({ search, type }: any) => {
    const query = qs.stringify({
      populate: "*",
      sort: ['title:asc'],
      filters: {
        type,
        title: {
          $contains: search
        }
      }
    }, {
      encodeValuesOnly: true
    });
    return axios.get(`${DAPI_URL}/api/contents?${query}`).then(resp => Promise.resolve(resp.data));
  }
);

export const useActivity = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date[1]).endOf("day").format("YYYY-MM-DD");

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
      enabled: !!child && date[0] !== null && date[1] !== null
    }
  );
};

export const useAddActivity = (childId?: number) =>
  useMutation(["create-activity", childId], (data: any) =>
    strapi.request<any>("post", `/children/${childId}/activities`, {
      data: { data }
    })
  );
