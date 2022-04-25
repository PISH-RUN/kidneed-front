import { Form, Input, message, Radio, Select } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { UserOutlined } from "@ant-design/icons";
import styles from "./AddChild.module.css";
import { AgeSlider } from "../AgeSlider/AgeSlider";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { useApp } from "@kidneed/hooks";
import jMoment from "moment-jalaali";
import { useRegister } from "../../core-team/api/register";
import { useUpdateChild } from "../../core-team/api/user";

export const AddChild: React.FC<{
  setPage: (id?: number) => void;
  childId?: number;
}> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { ctx, selectChild, addChild, editChild } = useApp();
  const { mutateAsync: addChildRequest } = useRegister();
  const { mutateAsync: editChildRequest } = useUpdateChild(props.childId);
  const child: any = ctx.children?.find((c) => c.id === props.childId) || {};

  const onFinish = (values: any) => {
    setLoading(true);
    if (props.childId) {
      editChildRequest({
        ...values,
        name: values.childName,
      })
        .then((response) => {
          editChild({ id: response.data.id, ...response.data.attributes });
          selectChild({ id: response.data.id, ...response.data.attributes });
          props.setPage(response.data.id);
        })
        .catch((error) => {
          console.log(error);
          message.error("خطایی رخ داده است");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      addChildRequest({
        data: values,
        age: values.age
      })
        .then((response) => {
          addChild({ id: response.data.id, ...response.data.attributes });
          selectChild({ id: response.data.id, ...response.data.attributes });
          props.setPage(response.data.id);
        })
        .catch((error) => {
          console.log(error);
          message.error("خطایی رخ داده است");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <ContentWrapper title="اطلاعات ضروری">
      <Form
        className={styles.addChildForm}
        style={{ padding: "0 200px" }}
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...child,
          age: child ? jMoment().jYear() - child.birthYear : 0,
          childName: child.name,
          name: ctx.user?.name,
          relation: child && child.relation
        }}
      >
        <Text style={{ fontSize: "16px" }}>
          اطلاعات فرزند خود را وارد نمایید
        </Text>
        <Form.Item
          rules={[{ required: true, message: "این فیلد الزامی است" }]}
          name="name"
        >
          <Input
            size="large"
            disabled={!!ctx.user?.name}
            placeholder="نام شما"
            prefix={<UserOutlined style={{ color: "#1890FF" }} />}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "این فیلد الزامی است" }]}
          name="relation"
        >
          <Select
            size="large"
            placeholder="نسبت شما"
            options={[
              {
                label: "پدر",
                value: "father"
              },
              {
                label: "مادر",
                value: "mother"
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "این فیلد الزامی است" }]}
          name="childName"
        >
          <Input
            size="large"
            placeholder="نام فرزند شما"
            prefix={<UserOutlined style={{ color: "#1890FF" }} />}
          />
        </Form.Item>
        <Form.Item name="gender">
          <Radio.Group defaultValue={1}>
            <Radio value={"boy"}>آقا پسر</Radio>
            <Radio value={"girl"}>دختر خانوم</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="age">
          <AgeSlider />
        </Form.Item>
        <div className={styles.formButtons}>
          <PrimaryButton
            style={{ minWidth: "180px" }}
            htmlType="submit"
            loading={loading}
          >
            مرحله بعد
          </PrimaryButton>
        </div>
      </Form>
    </ContentWrapper>
  );
};
