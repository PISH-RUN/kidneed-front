import { Button, Typography } from "@mui/material";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  useCouponSubscriptions,
  useRequestPayment, useRequestPurchase,
  useSubscriptions
} from "../../core-team/api/payment";
import { useState } from "react";
import { SubscriptionList } from "../../core-team/components";
import { Col, Input, notification, Row, Tag } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiTrash } from "react-icons/fi";
import { useApp } from "@kidneed/hooks";
import ParentDashboardLayout from "../../layouts/parent-dashboard-layout";
import moment from "moment";
import { useTexts } from "../../core-team/hooks/use-texts";
import { identity } from "lodash";
import _ from "lodash";

const Subscription = () => {
  const { ctx, fetchUser } = useApp();
  const router = useRouter();
  const [couponValue, setCouponValue] = useState("");
  const [coupon, setCoupon] = useState<string>();
  const { data } = useSubscriptions();
  const { data: couponSubscriptions } = useCouponSubscriptions(coupon);
  const { mutateAsync: requestPurchase } = useRequestPurchase();
  const { mutateAsync: requestPayment } = useRequestPayment();
  const { getText } = useTexts();

  const handleAddCoupon = () => {
    setCoupon(couponValue);
    setCouponValue("");
  };

  const handlePurchase = (selected: number) => {
    requestPurchase({
      subId: selected,
      coupon
    }).then(resp => {
      requestPayment(resp.data.uuid).then(resp => {
        if (resp?.data?.url.includes("yekodo.pish.run")) {
          notification.success({
            message: "خرید اشتراک با موفقیت انجام شد."
          });
          fetchUser();
          router.push("/parent/dashboard");
        } else {
          notification.success({
            message: "در حال انتقال به درگاه بانک، لطفا صبر کنید."
          });
          window.location.href = resp?.data?.url;
        }
      });
    });
  };

  const subscriptions = coupon ? couponSubscriptions?.data : data?.data?.map((item: any) => ({
    id: item.id,
    ...item.attributes
  }));

  return (
    <ParentDashboardLayout showChild="header">
      <>
        <div className="tw-m-auto tw-border tw-m-6 tw-rounded-xl tw-bg-white">
          <div className="tw-m-8">
            <Typography variant="h5" className="!tw-mb-4">اشتراک یکودو</Typography>
            <Typography variant="body1" className="!tw-mb-4">با خرید این اشتراک شما دسترسی کامل به تمام محتواهای
              ویدئویی، صوتی، کتاب و بازی های دیجیتال یکودو خواهید داشت.</Typography>
          </div>
          <div className="tw-mx-8 tw-flex tw-mb-6 tw-items-center tw-p-4 tw-bg-green-200 tw-border tw-rounded-xl tw-text-lg">
            <IoCheckmarkCircle className="tw-ml-3 tw-text-2xl tw-text-green-500" />
            از اشتراک یکودو
            شما، {parseInt(moment.duration(moment(ctx?.user?.subscribedUntil).valueOf() - moment().valueOf()).asDays() + "")} روز
            دیگر باقی مانده است.
          </div>
          <div className="tw-px-8 tw-bg-white">
            <div className="tw-flex tw-flex-col tw-justify-center tw-mb-5">
              <SubscriptionList
                data={subscriptions}
                onSelect={(selected: number) => {
                  if (!ctx?.user) {
                    router.push("/login?redirect=/parent/subscription");
                  } else {
                    handlePurchase(selected);
                  }
                }}
              />
            </div>
            <div className="tw-flex tw-mb-4 tw-items-center">
              <Typography variant="body1" className="!tw-mb-0">کد تخفیف: </Typography>
              <div className="tw-flex tw-mr-4 tw-h-fit tw-items-center">
                <div>
                  {coupon && coupon}
                </div>
                {coupon &&
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    className="!tw-mr-5"
                    onClick={() => {
                      setCoupon("");
                    }}
                  >
                    <FiTrash className="tw-ml-2" />
                    حذف
                  </Button>
                }
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-justify-between tw-mb-10">
              <div className="tw-flex tw-h-fit tw-mb-4">
                <Input
                  className="tw-rounded-full tw-flex-auto tw-ml-4"
                  size="large"
                  placeholder="کد تخفیف"
                  value={couponValue}
                  onChange={e => setCouponValue(e.target.value)}
                />
                <Button
                  variant="contained"
                  className="!tw-rounded-full tw-whitespace-nowrap tw-w-48"
                  onClick={handleAddCoupon}
                >
                  اعمال کد تخفیف
                </Button>
              </div>
              {/*<div className="tw-w-96 tw-border tw-border-gray-100 tw-rounded-xl tw-p-5">
              <div className="tw-flex tw-items-center tw-text-md tw-mb-5">
                <span className="tw-ml-4">هزینه اشتراک:</span>
                <span className="tw-font-bold">{new Intl.NumberFormat().format(selectedSub?.attributes.originalPrice / 10)} تومان</span>
              </div>
              <div className="tw-flex tw-items-center tw-text-md tw-mb-5">
                <span className="tw-ml-4">تخفیف:</span>
                <span className={`tw-font-bold ${discount > 0 ? "tw-text-red-500" : ""}`}>
                  {new Intl.NumberFormat().format(discount)}{discount > 0 ? "-" : ""} تومان
                </span>
              </div>
              <div className="tw-flex tw-items-center tw-text-md tw-mb-5">
                <span className="tw-ml-4">کد تخفیف:</span>
                <span className={`tw-font-bold ${couponDiscount > 0 ? "tw-text-red-500" : ""}`}>
                  {new Intl.NumberFormat().format(couponDiscount)}{couponDiscount > 0 ? "- " : " "}
                  تومان
                </span>
                {couponCode &&
                  <Tag className="!tw-mr-4" color="blue">{couponCode}</Tag>
                }
              </div>
              <div className="tw-flex tw-items-center tw-text-md tw-mb-5">
                <span className="tw-ml-4">قیمت نهایی:</span>
                <span className={`tw-font-bold tw-text-lg ${selectedSub?.attributes.currentPrice > purchase?.attributes?.price ? "tw-text-green-500" : ""}`}>
                  {new Intl.NumberFormat().format(purchase?.attributes?.price / 10)} تومان
                </span>
              </div>
            </div>*/}
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-px-10 tw-py-5 tw-bg-gray-100">
            <Typography variant="body1" className="!tw-mb-4">امکانات اشتراک یکودو</Typography>
            <Row gutter={[15, 15]}>
              {_.filter(getText('subscribePros').split("\n"), identity).map((pros: any) => (
                <Col className="tw-flex" span={12} key={pros}>
                  <IoCheckmarkCircle className="tw-text-green-500 tw-text-xl tw-ml-2" />
                  <span className="tw-text-md">{pros}</span>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </>
    </ParentDashboardLayout>
  );
};

Subscription.guard = () => true;

export default Subscription;