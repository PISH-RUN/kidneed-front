import { strapi } from '@kidneed/services';
import { Form, message } from 'antd';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react';
import { ContentWrapper } from '../ContentWrapper/ContentWrapper';
import { QuestionSlider } from '../QuestionSlider/QuestionSlider';
import styles from "./Quiz.module.css";

export const Quiz: React.FC<{way?: string, childId?: number}> = (props) => {

    const [data, setData] = useState<any>()

    useEffect(() => {
        strapi.setToken(
            "d74834e7df03b4b298df6d5da3df2f3a82f37eba1563ce1bf9cf1c8e6c66caff0e0619843fe6c1eecf6aaae5152f4aa3ea09ba1fa8da715407661516c607f8e8fea5cd22fc124e41335e0fb86f7268e65930903b56c854653d7a4a2f8d237b63cf729da083064ed9eadc0755c6a3c6a6b03fa5c7e7cfb029f73b6e89f4be827e"
        );
        strapi
            .request<any>("get", "/venus/question/", {
                data: {
                    data: {
                        category: props.way,
                        child: props.childId
                    },
                },
            })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                message.error("خطایی رخ داده است");
            });
    }, [])

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
