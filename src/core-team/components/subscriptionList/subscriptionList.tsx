import { Typography } from "@mui/material";
import { Tag } from "antd";
import _ from "lodash";

const colors = [
  "#57ABF4",
  "#EF5DA8",
  "#8BDA92",
  "#FF5C00",
  "#A084E1"
];

export const SubscriptionCard = ({ subscription, index = 0, onSelect }: any) => (
  <div
    className="tw-cursor-pointer hover:tw-shadow tw-flex tw-justify-between tw-mb-5 tw-bg-white tw-p-4 tw-items-center tw-w-full tw-rounded-xl tw-ml-5 tw-border tw-border-gray-100"
    onClick={() => onSelect && onSelect(subscription?.id)}
    style={{
      borderColor: colors[index]
    }}
  >
    <div className="tw-flex tw-items-center">
      <div
        className={`tw-ml-4 tw-rounded-full tw-text-white tw-w-16 tw-h-16 tw-flex tw-flex-col tw-justify-center tw-items-center`}
        style={{ backgroundColor: colors[index] }}
      >
        <div className="tw-text-2xl">{subscription?.months * 30 + subscription?.days}</div>
        <div className="tw-text-xs">روز</div>
      </div>
      <div className="tw-flex tw-flex-col">
        <div className="tw-flex">
          <Typography className="!tw-ml-2">{subscription?.name}</Typography>
          {subscription?.discountPrice >= 0 &&
            <Tag
              color="green"
              className="tw-text-center tw-font-bold tw-text-md tw-mr-2"
            >
              {new Intl.NumberFormat().format((subscription?.currentPrice - subscription?.discountPrice) / 10)} تخفیف
            </Tag>}
        </div>
        <div className="tw-flex tw-items-center">
          <div className="tw-text-gray-400 tw-w-fit tw-font-bold tw-text-md tw-relative tw-inline-block tw-h-5">
            <span className="tw-absolute tw-w-full tw-h-[2px] tw-bg-gray-500 tw-top-1/2 tw--rotate-6" />
            <span>{new Intl.NumberFormat().format(subscription?.originalPrice / 10)} تومان</span>
          </div>
          <div className="tw-flex tw-items-center tw-mr-4">
            <div
              className="tw-text-center tw-font-bold tw-text-lg"
              style={{ color: colors[index] }}
            >
              {new Intl.NumberFormat().format((subscription?.discountPrice || subscription?.currentPrice) / 10)} تومان
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="tw-flex tw-flex-col tw-items-end tw-font-bold" style={{color: colors[index]}}>
      خرید و ادامه
    </div>
  </div>
);

export const SubscriptionList = ({ data, onSelect }: any) => {

  return (
    <>
      {_.map(_.sortBy(data, i => {
        return i.months * 30 + i.days;
      }), (sub: any, i: number) => (
        <SubscriptionCard key={sub.id} subscription={sub} index={i} onSelect={onSelect} />
      ))}
    </>
  );
};