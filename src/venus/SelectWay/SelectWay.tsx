import { strapi } from "@kidneed/services";
import { message } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { SecondVideo } from "venus/Video/SecondVideo";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Way } from "../Way/Way";
import styles from "./SelectWay.module.css";

const fields: any = {
  "A": "physical",
  "B": "cognition",
  "C": "emotional",
  "D": "social"
};

export const SelectWay: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setWay: React.Dispatch<React.SetStateAction<string | undefined>>;
  childId?: number;
}> = (props) => {
  const selectWay = (type?: "A" | "B" | "C" | "D") => {
    if (type)
      strapi
        .request<any>("post", `/children/${props.childId}/growth-field`, {
          data: {
            data: {
              field: fields[type]
            }
          }
        })
        .then(() => {
          props.setWay(fields[type]);
          props.setPage("quiz");
        })
        .catch((error) => {
          console.log(error);
          message.error("خطایی رخ داده است");
        });
    else {
      props.setWay(type);
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
          لطفا نوع حوزه رشدی را انتخاب نمایید
        </Text>
        <div className={styles.waysWrapper}>
          <Way onClick={() => selectWay("A")} title="حرکتی جسمی" />
          <Way onClick={() => selectWay("B")} title="شناختی" />
          <Way onClick={() => selectWay("C")} title="هیجانی" />
          <Way
            onClick={() => selectWay("D")}
            title="اخلاقی اجتماعی"
          />
        </div>
        <Way
          onClick={() => selectWay(undefined)}
          title="به انتخاب سیستم سایت"
        />
      </div>
    </ContentWrapper>
  );
};
