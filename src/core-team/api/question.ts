import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";

export const useSubmitAnswer = () =>
  useMutation(({ childId, data }: any) => strapi.request("POST", `/children/${childId}/growth-answers`, {
    data: {
      data: {
        answers: data
      }
    }
  }));