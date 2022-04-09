import { strapi } from "@kidneed/services";
import { width } from "@mui/system";
import { Form, message } from "antd";
import Text from "antd/lib/typography/Text";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "venus/PrimaryButton/PrimaryButton";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { QuestionSlider } from "../QuestionSlider/QuestionSlider";
import styles from "./Quiz.module.css";
import { useApp } from "@kidneed/hooks";
import jMoment from "moment-jalaali";
import { useQuestions, useSubmitAnswer } from "core-team/api/question";
import _ from "lodash";

export const Quiz: React.FC<{ way?: string, childId?: number }> = (props) => {
  const { ctx } = useApp();
  const router = useRouter();
  const { mutateAsync: submitAnswer } = useSubmitAnswer();

  const age = jMoment().jYear() - (ctx?.child?.birthYear || 0);
  let ageCategory = "";
  if (age >= 3 && age <= 7) ageCategory = "3";
  if (age >= 8 && age <= 12) ageCategory = "8";

  const { data } = useQuestions(ageCategory, props.way || "system");

  const handleSubmit = (values: any) => {
    if (ctx.child) {
      submitAnswer({
        childId: ctx.child.id,
        data: _.map(values, (val: string, key: string) => ({
          question: key,
          value: val
        }))
      }).then(() => {
        router.push("/parent/dashboard");
      });
    }
  };

  return (
    <ContentWrapper
      title="پرسشنامه"
      contentStyle={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
    >
      <Text style={{ fontSize: "16px" }}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</Text>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className={styles.questionsWrapper}>
          {data.map((item: any) => {
            return (
              <Form.Item
                key={item.id}
                rules={[{ required: true, message: "این فیلد الزامی است" }]}
                label={item.attributes?.question}
                style={{ marginBottom: 0 }}
                name={item.id}
                initialValue={1}
              >
                <QuestionSlider />
              </Form.Item>
            );
          })}
        </div>
        <div className="tw-text-center">
          <PrimaryButton
            className="tw-mt-14 tw-w-52"
            htmlType="submit"
          >
            تایید
          </PrimaryButton>
        </div>
      </Form>
    </ContentWrapper>
  );
};
