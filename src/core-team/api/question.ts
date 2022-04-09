import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useQuestions = (ageCategory?: string, way?: string) =>
  useQuery(['questions', ageCategory, way], () =>
    strapi
      .request<any>("get", `/growth-questions?filters[ageCategory][$eq]=${ageCategory}&filters[field][$eq]=${way}`),
    {
      enabled: !!ageCategory && !!way,
    }
  );

export const useSubmitAnswer = () =>
  useMutation(({ childId, data }: any) => strapi.request("POST", `/children/${childId}/growth-answers`, {
    data: {
      data: {
        answers: data
      }
    }
  }));