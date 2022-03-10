import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";
import { Models } from "@kidneed/types";

export const useSendOtp = () =>
  useMutation("request-otp", (data: any) => strapi.request("post", "/core/otp", {
    data: {
      mobile: "+98" + data.mobile
    }
  }));

export const useLogin = () =>
  useMutation("login", async (data: any) => {
    const resp = await strapi
      .request<{
        jwt: string;
        user: Models.User;
      }>("post", "/core/login", {
        data: {
          ...data,
          mobile: "+98" + data.mobile
        }
      });
    strapi.setToken(resp.jwt);

    return resp.user;
  });