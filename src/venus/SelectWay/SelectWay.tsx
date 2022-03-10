import Text from "antd/lib/typography/Text";
import React from "react";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Video } from "../Video/Video";
import { Way } from "../Way/Way";
import styles from "./SelectWay.module.css";

export const SelectWay: React.FC<{setPage: React.Dispatch<React.SetStateAction<string>>}> = (props) => {
    return (
        <ContentWrapper
            contentStyle={{ padding: "45px 90px" }}
            title="انتخاب حوزه رشدی"
        >
            <div className={styles.selectWayWrapper}>
                <Video style={{width: "400px", height: "300px"}} />
                <Text style={{ fontSize: "16px", alignSelf: "flex-start" }}>
                    لطفا نوع حوزه رشدی را انتخاب نمایید
                </Text>
                <div className={styles.waysWrapper}>
                    <Way title="حرکتی جسمی" />
                    <Way title="شناختی" />
                    <Way title="هیجانی" />
                    <Way title="اخلاقی اجتماعی" />
                </div>
                <Way title="به انتخاب سیستم سایت" />
            </div>
        </ContentWrapper>
    );
};
