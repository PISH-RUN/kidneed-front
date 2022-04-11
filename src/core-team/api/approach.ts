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
  useMutation(["subject-select"], (data: any) =>
    strapi.request<any>("post", `/rahche/select`, {
      data: {
        data: data
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

export const useSubmitSign = () =>
  useMutation(["sign-submit"], (data: any) =>
      strapi.request<any>("post", `/rahche/${data.rahche}/signs`, {
        data: {
          data: {
            selected: data.selected
          }
        }
      })
  );

export const useRoot = (rahche?: number) =>
  useQuery(["root", rahche], () =>
    strapi.request<any>("get", `/rahche/${rahche}/roots`),
    {
      enabled: !!rahche
    }
  );

export const useSubmitRoot = () =>
  useMutation(["root-submit"], (data: any) =>
    strapi.request<any>("post", `/rahche/${data.rahche}/roots`, {
      data: {
        data: {
          selected: data.selected
        }
      }
    })
  );

export const useApproaches = (rahche?: number) =>
  useQuery(["approaches", rahche], () =>
      strapi.request<any>("get", `/rahche/${rahche}/approaches`),
    {
      enabled: !!rahche
    }
  );