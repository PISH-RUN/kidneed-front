import { useMutation, useQuery } from "react-query";
import { strapi } from "@kidneed/services";

export const useRequestPurchase = () =>
  useMutation(({ subId, coupon }: any) =>
    strapi.request<any>("POST", `/purchase-subscription`, {
      data: {
        data: {
          subscription: subId,
          coupon
        }
      }
    }));

export const usePurchaseCoupon = () =>
  useMutation((data: any) =>
    strapi.request<any>("POST", `/purchase-coupon`, {
      data: {
        data: data
      }
    }));

export const useRequestPayment = () =>
  useMutation((purchase: string) =>
    strapi.request<any>("POST", `/purchase-payment`, {
      data: {
        data: {
          purchase
        }
      }
    }));

export const usePurchaseDetail = (purchase?: any) =>
  useQuery<any>(["yekodo", "purchase-detail"], () =>
      strapi.request("get", `/purchases/${purchase}`),
    {
      enabled: !!purchase
    });

export const useSubscriptions = () =>
  useQuery<any>(["yekodo", "subscriptions"], () =>
    strapi.request("get", `/subscriptions`));

export const useCouponSubscriptions = (coupon?: string) =>
  useQuery<any>(["yekodo", "coupon-subscriptions", coupon], () =>
    strapi.request("post", `/coupon-subscriptions`, {
      data: {
        data: {
          coupon
        }
      }
    }), {
    enabled: !!coupon && coupon.length > 0
  });

export const usePayment = (purchase: number) => {
  return useQuery<any>(["yekodo", "payment"], () =>
      strapi.request("get", `/payments`, {
        params: {
          populate: "*",
          filters: {
            purchase,
            refId: {
              $null: true
            }
          }
        }
      }).then((resp: any) => {
        console.log(resp?.data[0]);
        return Promise.resolve(resp?.data[0]);
      }),
    {
      enabled: !!purchase
    }
  );
};

export const useDeletePayment = () => {
  return useMutation((purchase: number) =>
    strapi.request<any>("delete", `/purchases/${purchase}`));
};