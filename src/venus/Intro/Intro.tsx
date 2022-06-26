import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { Video } from "../Video/Video";
import styles from "./Intro.module.css";
import Text from "antd/lib/typography/Text";
import { useTexts } from "../../core-team/hooks/use-texts";

export const Intro: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const { getText } = useTexts();
  return (
    <ContentWrapper title="به یکودو خوش آمدید">
      <div className={styles.introContentWrapper}>
        <div className={styles.introContentText}>
          <Paragraph
            className={styles.introText}
            style={{
              padding: "0 10px",
              textAlign: "justify",
              maxHeight: "365px",
              overflowY: "scroll"
            }}
          >
            <Text style={{ width: "100%", display: "block", fontWeight: 700, textAlign: "center" }}>
              سلام به همه ی شما پدر و مادر های درجه یک !
            </Text><br />
            {getText("yekodoWelcome")}
          </Paragraph>
        </div>
        <Video />
      </div>
      <div className="tw-flex tw-justify-center tw-mt-5">
        <PrimaryButton
          onClick={() => props.setPage("addChild")}
          style={{ minWidth: "180px" }}
        >
          افزودن فرزند
        </PrimaryButton>
      </div>
    </ContentWrapper>
  );
};
