import { useMutation, useQuery } from "react-query";
import moment, { Moment } from "moment";
import { strapi } from "@kidneed/services";
import jMoment from "moment-jalaali";

export const useApproach = (title?: string) =>
  useQuery(["approach", title], () =>
    strapi.request<any>("get", `/earth/approach`, {
      params: {
        filters: {
          title: {
            $contains: ""
          }
        }
      }
    })
  );

export const useSign = (approachId?: number) =>
  useQuery(["sign", approachId], () =>
      strapi.request<any>("get", `/earth/sign`, {
        params: {
          approachId: [approachId]
        }
      }),
    {
      enabled: approachId !== undefined
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