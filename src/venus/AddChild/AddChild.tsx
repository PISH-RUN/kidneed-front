import { Form, Input, Radio, Select } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { UserOutlined } from "@ant-design/icons";
import styles from "./AddChild.module.css";
import { AgeSlider } from "../AgeSlider/AgeSlider";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { OutlinedButton } from "../OutlinedButton/OutlinedButton";

export const AddChild: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = () => {
        console.log(form.getFieldsValue())
    }

    return (
        <ContentWrapper title="اطلاعات ضروری">
            <Form
                className={styles.addChildForm}
                style={{ padding: "0 200px" }}
                form={form}
                onFinish={onFinish}
            >
                <Text style={{ fontSize: "16px" }}>
                    اطلاعات فرزند خود را وارد نمایید
                </Text>
                <Form.Item name="name">
                    <Input
                        size="large"
                        placeholder="نام شما"
                        prefix={<UserOutlined style={{ color: "#1890FF" }} />}
                    />
                </Form.Item>
                <Form.Item name="nesbat">
                    <Select
                        size="large"
                        placeholder="نسبت شما"
                        options={[
                            {
                                label: "پدر",
                                value: "پدر",
                            },
                            {
                                label: "مادر",
                                value: "مادر",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="childName">
                    <Input
                        size="large"
                        placeholder="نام فرزند شما"
                        prefix={<UserOutlined style={{ color: "#1890FF" }} />}
                    />
                </Form.Item>
                <Form.Item name="gender">
                    <Radio.Group defaultValue={1}>
                        <Radio value={1}>آقا پسر</Radio>
                        <Radio value={2}>دختر خانوم</Radio>
                    </Radio.Group>
                </Form.Item>
                <AgeSlider style={{marginBottom: "50px"}} />
                <div className={styles.formButtons}>
                    <OutlinedButton style={{minWidth: "180px"}}>انصراف از ارزیابی</OutlinedButton>
                    <PrimaryButton style={{minWidth: "180px"}} htmlType="submit">مرحله بعد</PrimaryButton>
                </div>
            </Form>
        </ContentWrapper>
    );
};
