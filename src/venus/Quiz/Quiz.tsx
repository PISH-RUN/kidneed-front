import { Button, Form, notification, Typography } from "antd";
import Text from "antd/lib/typography/Text";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PrimaryButton } from "venus/PrimaryButton/PrimaryButton";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { QuestionSlider } from "../QuestionSlider/QuestionSlider";
import styles from "./Quiz.module.css";
import { useQuestions, useQuiz, useSubmitQuiz, useSubmitSystemQuiz } from "core-team/api/question";
import _ from "lodash";
import Link from "next/link";
import { FiArrowDown } from "react-icons/fi";

export const Quiz: React.FC<{ way?: string, childId?: number, type?: string, setWay: any }> = (props) => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const { mutateAsync: submitQuiz } = useSubmitQuiz();
  const { mutateAsync: submitSystemQuiz } = useSubmitSystemQuiz();
  const { data: quiz, isLoading } = useQuiz(props.way, props.childId, props.type);
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
      }).then((resp: any) => {
        if(!props.way)
          props.setWay(resp?.data?.growthField?.name)
        else
          router.push(redirectUrl as string || "/parent/dashboard")
      }).catch(() => {
        notification.error({
          message: "شما قبلا به این آزمون پاسخ داده اید."
        })
      });
    }
  };

  return (
    <ContentWrapper
      title={`پرسشنامه ${props.way ? `حوزه رشدی ${props.way}` : "تعیین حوزه رشدی"}`}
      contentStyle={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
    >
      {!props.way && <Text style={{ fontSize: "16px" }}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</Text>}
      {props.way && <Text style={{ fontSize: "16px" }}>
        <span>حوزه رشدی انتخاب شده برای فرزند شما حوزه </span>
        <span>{props.way} </span>
        <span>می باشد. لطفا به سوال های این حوزه پاسخ دهید.</span>
      </Text>}
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="tw-relative">
          <div className={styles.questionsWrapper} onScroll={() => !scroll && setScroll(true)}>
            {!isLoading && data?.data?.map((item: any) => {
              return (
                <Form.Item
                  className="tw-mt-4"
                  key={item.id}
                  rules={[{ required: true, message: "پاسخ به این سوال الزامی است" }]}
                  label={<Typography>{item.body}</Typography>}
                  style={{ marginBottom: 0 }}
                  name={item.id}
                  initialValue={2}
                >
                  <QuestionSlider />
                </Form.Item>
              );
            })}
            <div className="tw-text-center">
              <PrimaryButton
                className="tw-my-4 tw-w-52"
                htmlType="submit"
              >
                تایید
              </PrimaryButton>
            </div>
            {!scroll && <div className="tw-absolute tw-bottom-2 tw-left-1/2 tw-animate-bounce">
              <FiArrowDown className="tw-text-4xl tw-bg-blue-400 tw-rounded-full tw-border tw-p-1 tw-text-white" />
            </div>}
          </div>
        </div>
        <div className="tw-text-center">
          {props.type &&
            <Link href="/parent/dashboard">
              <Button
                ghost
                className="tw-mt-14 tw-w-52 tw-mr-4 !tw-text-blue-500 !tw-border-blue-500 !tw-rounded-full tw-h-10"
              >
                بازگشت
              </Button>
            </Link>
          }
        </div>
      </Form>
    </ContentWrapper>
  );
};
