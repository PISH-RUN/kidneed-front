import { Form, Typography } from "antd";
import Text from "antd/lib/typography/Text";
import { useRouter } from "next/router";
import React from "react";
import { PrimaryButton } from "venus/PrimaryButton/PrimaryButton";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { QuestionSlider } from "../QuestionSlider/QuestionSlider";
import styles from "./Quiz.module.css";
import { useQuestions, useQuiz, useSubmitQuiz, useSubmitSystemQuiz } from "core-team/api/question";
import _ from "lodash";

export const Quiz: React.FC<{ way?: string, childId?: number, type?: string }> = (props) => {
  const router = useRouter();
  const { mutateAsync: submitQuiz } = useSubmitQuiz();
  const { mutateAsync: submitSystemQuiz } = useSubmitSystemQuiz();
  const { data: quiz } = useQuiz(props.way, props.childId, props.type);
  const { data: questions } = useQuestions(props.way, props.childId);
  const { redirectUrl } = router.query;

  const data = props.way ? quiz : questions;

  const handleSubmit = (values: any) => {
    if (props.childId) {
      const request = props.way === undefined ? submitSystemQuiz : submitQuiz;
      request({
        childId: props.childId,
        type: props.type || "startOfMonth",
        data: _.map(values, (val: string, key: string) => ({
          question: parseInt(key),
          value: val
        }))
      }).then(() => {
        router.push(redirectUrl as string || "/parent/dashboard");
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
          {data?.data?.map((item: any) => {
            return (
              <Form.Item
                className="tw-mt-4"
                key={item.id}
                rules={[{ required: true, message: "این فیلد الزامی است" }]}
                label={<Typography>{item.body}</Typography>}
                style={{ marginBottom: 0 }}
                name={item.id}
                initialValue={2}
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
