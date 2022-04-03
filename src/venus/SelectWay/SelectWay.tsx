import { strapi } from "@kidneed/services";
import { message } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { SecondVideo } from "venus/Video/SecondVideo";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Video } from "../Video/Video";
import { Way } from "../Way/Way";
import styles from "./SelectWay.module.css";

export const SelectWay: React.FC<{
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setWay: React.Dispatch<React.SetStateAction<string | undefined>>;
    childId?: number;
}> = (props) => {
    const selectWay = (type?: "A" | "B" | "C" | "D") => {
        strapi
            .request<any>("post", "/steps/", {
                data: {
                    data: {
                        child: props.childId,
                        category: type,
                        year: 1401,
                        month: 1,
                    },
                },
            })
            .then(() => {
                props.setWay(type);
                props.setPage("quiz");
            })
            .catch((error) => {
                console.log(error);
                message.error("خطایی رخ داده است");
            });
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
