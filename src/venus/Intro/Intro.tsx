import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Video } from "../Video/Video";
import styles from "./Intro.module.css";

export const Intro: React.FC = () => {
    return (
        <ContentWrapper title="خوش آمدید">
            <div className={styles.introContentWrapper}>
                <div className={styles.introContentText}>
                    <Paragraph style={{ textAlign: "justify" }}>
                        پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک
                        شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی
                        کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و
                        درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت
                        و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات
                        فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند
                        اوقات فراغت و درسی کودک شما
                    </Paragraph>
                    <PrimaryButton style={{minWidth: "180px"}}>افزودن فرزند</PrimaryButton>
                </div>
                <Video />
            </div>
        </ContentWrapper>
    );
};
