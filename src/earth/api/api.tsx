import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";

export const getAspproach = (title: string) =>
    useMutation("request-otp", (data: any) => strapi.request("get", "/api/earth/approach?" + title ? "title=" + title : ""));