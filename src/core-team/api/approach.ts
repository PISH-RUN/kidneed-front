import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";

export const useSubjects = (title?: string) =>
  useQuery(["subjects", title], () =>
    strapi.request<any>("get", `/rahche-subjects`, {
      params: {
        populate: "*",
        filters: {
          name: {
            $contains: title
          }
        }
      }
    })
  );

export const useSelectSubject = () =>
  useMutation(["subject-select"], (subject: number) =>
    strapi.request<any>("post", `/rahche/select`, {
      data: {
        data: { subject }
      }
    })
  );

export const useSign = (rahche?: number) =>
  useQuery(["sign", rahche], () =>
      strapi.request<any>("get", `/rahche/${rahche}/signs`),
    {
      enabled: rahche !== undefined
    }
  );

export const useRoot = (signId?: number[]) =>
  useQuery(["root", signId], () =>
    strapi.request<any>("get", `/earth/root`, {
      params: signId ? {
        signId: [signId]
      } : {}
    })
  );