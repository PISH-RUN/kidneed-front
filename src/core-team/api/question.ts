import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useQuiz = (way?: string, childId?: number, type: string = "startOfMonth") =>
  useQuery(["yekodo", "questions", childId], () =>
      strapi
        .request<any>("get", `/children/${childId}/quiz?type=${type}`),
    {
      enabled: way !== undefined && !!childId
    }
  );

export const useQuestions = (way?: string, childId?: number) =>
  useQuery(["yekodo", "questions", childId], () =>
      strapi
        .request<any>("get", `/children/${childId}/growth-field-questions`),
    {
      enabled: way === undefined && !!childId
    }
  );

export const useSubmitQuiz = () =>
  useMutation(({ childId, type, data }: any) =>
    strapi.request("POST", `/children/${childId}/quiz`, {
      data: {
        data: {
          type,
          answers: data
        }
      }
    }));

export const useSubmitSystemQuiz = () =>
  useMutation(({ childId, data }: any) => strapi.request("POST", `/children/${childId}/find-growth-field`, {
    data: {
      data: {
        answers: data
      }
    }
  }));

export const useGrowthFields = () =>
  useQuery(["yekodo", "growth-fields"], () =>
    strapi
      .request<any>("get", `/growth-fields`)
  );


export const useGrowthSubFields = () =>
  useQuery(["yekodo", "growth-subfields"], () =>
    strapi
      .request<any>("get", `/growth-subfields`)
  );

export const useQuizResult = (childId?: number) =>
  useQuery(["yekodo", "quiz-result", childId], () =>
      strapi
        .request<any>("get", `/children/${childId}/growth-field-result`),
    {
      enabled: !!childId
    }
  );

export const useQuizProgression = (childId?: number) =>
  useQuery(["yekodo", "quiz-progression", childId], () =>
      strapi
        .request<any>("get", `/children/${childId}/growth-progression`),
    {
      enabled: !!childId
    }
  );