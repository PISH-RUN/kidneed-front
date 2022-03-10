import { Form } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { ContentWrapper } from '../ContentWrapper/ContentWrapper';
import { QuestionSlider } from '../QuestionSlider/QuestionSlider';
import styles from "./Quiz.module.css";

export const Quiz: React.FC = () => {
    return (
        <ContentWrapper
            title="پرسشنامه"
            contentStyle={{display: 'flex', flexDirection: "column", alignItems: "center", gap: "20px"}}
        >
            <Text style={{ fontSize: "16px" }}>لطفا موارد زیر را در مورد فرزندتان مشخص نمایید</Text>
            <Form layout="vertical" >
                <div className={styles.questionsWrapper}>
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                    <QuestionSlider label="سلام" name="question" />
                </div>
            </Form>
        </ContentWrapper>
    )
}
