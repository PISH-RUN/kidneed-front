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
    const selectWay = (type?: "a" | "b" | "c" | "d") => {
        strapi.setToken(
            "d74834e7df03b4b298df6d5da3df2f3a82f37eba1563ce1bf9cf1c8e6c66caff0e0619843fe6c1eecf6aaae5152f4aa3ea09ba1fa8da715407661516c607f8e8fea5cd22fc124e41335e0fb86f7268e65930903b56c854653d7a4a2f8d237b63cf729da083064ed9eadc0755c6a3c6a6b03fa5c7e7cfb029f73b6e89f4be827e"
        );
        strapi
            .request<any>("post", "/steps/", {
                data: {
                    data: {
                        child: props.childId,
                        category: type,
                        year: 1400,
                        month: 12,
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
                    <Way onClick={() => selectWay("a")} title="حرکتی جسمی" />
                    <Way onClick={() => selectWay("b")} title="شناختی" />
                    <Way onClick={() => selectWay("c")} title="هیجانی" />
                    <Way
                        onClick={() => selectWay("d")}
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
