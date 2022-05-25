import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";
import { Models } from "@kidneed/types";

export const useSendOtp = () =>
  useMutation("request-otp", (data: any) => strapi.request("post", "/core/otp", {
    data: {
      mobile: "+98" + data.mobile.replace(/^(\+98|98|0)/g, '')
    }
  }));

export const useLogin = (options?: any) =>
  useMutation("login", async (data: any) => {
    const resp = await strapi
      .request<{
        jwt: string;
        user: Models.User;
      }>("post", "/core/login", {
        data: {
          ...data,
          mobile: "+98" + data.mobile.replace(/^(\+98|98|0)/g, '')
        }
      });
    strapi.setToken(resp.jwt);

    return resp.user;
  }, options);