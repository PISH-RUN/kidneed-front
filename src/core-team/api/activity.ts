import { useMutation, useQuery, useQueryClient } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";
import axios from "axios";
import qs from "qs";
import { DAPI_URL } from "../constants";
import { useApp } from "@kidneed/hooks";

export const useTodayActivity = (child?: number, date = moment()) =>
  useQuery<any, any>(["activity", child, date.startOf("day").format("YYYY-MM-DD")], () =>
      strapi.request("get", `/children/${child}/activities`, {
        params: {
          filters: {
            date: date.startOf("day").format("YYYY-MM-DD")
          }
        }
      }),
    {
      enabled: !!child,
      retry: 0,
    }
  );

export const useActivityStats = (date: [Date | Moment | null, Date | Moment | null], child?: number) => {
  const start = jMoment(date[0]).startOf("day").format("YYYY-MM-DD");
  const end = jMoment(date[1]).endOf("day").format("YYYY-MM-DD");

  return useQuery(["yekodo", "activity", child, start, end], () =>
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
  useQuery(["yekodo", "activity-glance", child], () =>
      strapi.request<any>("get", `/children/${child}/current-month-activity-glance`),
    {
      enabled: !!child
    }
  );

export const useContent = (id?: number, options?: any) =>
  useQuery(["yekodo", "content", id], () => {
      const query = qs.stringify({
        populate: ['attachments', 'images', 'content_tags', 'content_tags.tags', 'poster', 'editions', 'movies', 'movies.tags']
      }, {
        encodeValuesOnly: true
      });

      return axios.get(`${DAPI_URL}/api/contents/${id}?` + query).then(resp => {
        const data = resp.data;
        return Promise.resolve({
          ...data,
          data: {
            id: data.data.id,
            attributes: {
              ...data.data?.attributes,
            }
          }
        })
      });
    },
    {
      enabled: !!id,
      ...options
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

export const useSeenContent = () =>
  useMutation(["seen"], (id: number) =>
    strapi.request("post", `/activities/${id}/seen`)
  );

export const useContents = (ids?: number[]) => {
  const query = qs.stringify({
    populate: {
      poster: "*",
      content_tags: {
        populate: ["tags"]
      },
      images: "*",
      movies: {
        populate: ["tags"]
      }
    },
    publicationState: "preview",
    filters: {
      id: {
        $in: ids
      }
    }
  }, {
    encodeValuesOnly: true
  });

  return useQuery(["yekodo", "content", ids], () =>
      axios.get(`${DAPI_URL}/api/contents?${query}`).then(resp => Promise.resolve(resp.data)),
    {
      enabled: !!ids
    }
  );
};

export const useSearchContents = () => useMutation(["contents-search"], ({ search, type }: any) => {
    const query = qs.stringify({
      populate: "*",
      sort: ["title:asc"],
      filters: {
        title: {
          $containsi: search
        },
        type
      }
    }, {
      encodeValuesOnly: true
    });
    return axios.get(`${DAPI_URL}/api/contents?${query}`).then(resp => Promise.resolve(resp.data));
  }
);

export const useSearchContent = (search?: string, type?: string) => useQuery(["contents-search", search, type], () => {
    const query = qs.stringify({
      populate: "*",
      sort: ["title:asc"],
      filters: {
        title: {
          $containsi: search
        },
        type
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

  return useQuery(["yekodo", "activity", child, start, end], () =>
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

export const useActivityDetail = (child?: number, id?: number) => {
  return useQuery(["yekodo", "activity-detail", child, id], () =>
      strapi.request<any>("get", `/children/${child}/activities/${id}`),
    {
      enabled: !!child && !!id
    }
  );
};

export const useAddActivity = (childId?: number) => {
  const queryClient = useQueryClient();
  return useMutation(["create-activity", childId], (data: any) =>
      strapi.request<any>("post", `/children/${childId}/activities`, {
        data: { data }
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["activity-glance", childId]);
      }
    }
  );
};

export const useEditActivity = () => {
  const { ctx } = useApp();
  const queryClient = useQueryClient();
  return useMutation(["edit-activity"], (data: any) =>
      strapi.request<any>("put", `/activities/${data.id}`, {
        data: {
          data: {
            ...data,
            id: undefined
          }
        }
      }),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["activity-glance", ctx?.child?.id]);
      }
    }
  );
};

export const useDeleteActivity = () => {
  const { ctx } = useApp();
  const queryClient = useQueryClient();
  return useMutation(["delete-activity"], (id: number) =>
      strapi.request<any>("delete", `/activities/${id}`),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["activity-glance", ctx?.child?.id]);
      }
    }
  );
};
