import { strapi } from "@kidneed/services";
import { message, notification } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { SecondVideo } from "venus/Video/SecondVideo";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Way } from "../Way/Way";
import styles from "./SelectWay.module.css";
import { useGrowthFields, useSetGrowthField } from "../../core-team/api/register";

export const SelectWay: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setWay: React.Dispatch<React.SetStateAction<string | undefined>>;
  childId?: number;
}> = (props) => {
  const { mutateAsync: setGrowthField } = useSetGrowthField();
  const { data: fields } = useGrowthFields();

  const selectWay = (type?: string, name?: string) => {
    if (type)
      setGrowthField({
        childId: props.childId,
        field: type
      })
        .then(() => {
          props.setWay(name);
          props.setPage("quiz");
        })
        .catch((error) => {
          console.log(error);
          if (error?.error.name === "LockedError") {
            notification.info({
              message: "شما قبلا حوزه رشدی فرزندتان را انتخاب کردید، لطفا آزمون را شروع کنید",
            });
            props.setWay(name);
            props.setPage("quiz");
          } else {
            message.error("خطایی رخ داده است");
          }
        });
    else {
      props.setWay(name);
      props.setPage("quiz");
    }
  };

  return (
    <ContentWrapper
      contentStyle={{ padding: "45px 90px" }}
      title="انتخاب حوزه رشدی"
    >
      <div className={styles.selectWayWrapper}>
        <SecondVideo />
        <Text style={{ fontSize: "16px", alignSelf: "flex-start" }}>
          پس از مشاهده فیلم معرفی حوزه های رشدی، یکی از گزینه های زیر را انتخاب نمایید
        </Text>
        <div className={styles.waysWrapper}>
          {fields?.data?.map((field: any) => (
            <Way key={field?.id} onClick={() => selectWay(field?.id, field?.attributes.name)} title={field?.attributes.name} />
          ))}
        </div>
        <Way
          onClick={() => selectWay(undefined)}
          title="به انتخاب یکودو"
        />
      </div>
    </ContentWrapper>
  );
};
