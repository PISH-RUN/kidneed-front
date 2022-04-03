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

export const useStats = (child?: number) =>
  useQuery(["stats", child], () =>
      strapi.request<any>("post", `/dashboard/${child}/stats`),
    {
      enabled: !!child
    }
  );