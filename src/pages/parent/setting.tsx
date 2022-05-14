import { Guard } from "@kidneed/types";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Button, Col, Form, Input, notification, Radio, Select } from "antd";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AgeSlider } from "venus/AgeSlider/AgeSlider";
import { FiUser, FiLock } from "react-icons/fi";
import { useUpdateChild, useUpdateMe } from "../../core-team/api/user";
import { useApp } from "@kidneed/hooks";
import jMoment from "moment-jalaali";

const Setting = () => {
  const { ctx, editChild, editUser } = useApp();
  const { mutateAsync: updateMe } = useUpdateMe();
  const { mutateAsync: updateChild } = useUpdateChild(ctx?.child?.id);
  const [loginType, setLoginType] = useState(ctx?.user?.hasLockPassword ? "password" : "question");
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const userParams = {
      name: values.name,
      lockPassword: loginType === "question" ? null : values.lockPassword
    };
    const childParams = {
      name: values.childName,
      relation: values.relation,
      age: values.age,
      gender: values.gender
    };

    updateMe(userParams).then((resp: any) => {
      editUser(resp)
      notification.success({
        message: "اطلاعات شما با موفقیت ویرایش شد."
      });
    });
    updateChild(childParams).then((resp: any) => {
      editChild({ id: resp?.data?.id, ...resp?.data?.attributes });
      notification.success({
        message: "اطلاعات فرزند شما با موفقیت ویرایش شد."
      });
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      childName: ctx.child?.name,
      gender: ctx.child?.gender,
      age: ctx?.child?.birthYear && (jMoment().jYear() - ctx?.child?.birthYear)
    });
  }, [ctx.child])

  return (
    <ParentDashboardLayout showChild="header">
      <div className="tw-py-8 tw-px-10">
        <Col xl={10} xs={24}>
          <Form form={form} onFinish={handleSubmit}>
            <Typography variant="body1">اطلاعات فرزند شما</Typography>
            <div className="tw-mt-6 tw-mb-8">
              <Form.Item name="childName" initialValue={ctx?.child?.name}>
                <Input
                  placeholder="نام فرزند شما"
                  size="large"
                  prefix={<FiUser className="tw-text-blue-500" />}
                  type="text"
                />
              </Form.Item>
              <Form.Item name="gender" initialValue={ctx?.child?.gender}>
                <Radio.Group>
                  <Radio value={"boy"}>آقا پسر</Radio>
                  <Radio value={"girl"}>دختر خانوم</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="age" initialValue={ctx?.child?.birthYear && (jMoment().jYear() - ctx?.child?.birthYear)}>
                <AgeSlider />
              </Form.Item>
            </div>
            <Typography variant="body1">اطلاعات شما</Typography>
            <div className="tw-mt-6 tw-mb-8">
              <Form.Item name="name" initialValue={ctx?.user?.name}>
                <Input
                  placeholder="نام شما"
                  size="large"
                  prefix={<FiUser className="tw-text-blue-500" />}
                  type="text"
                />
              </Form.Item>
              <Form.Item
                name="relation"
                initialValue={ctx?.child?.relation}
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
            </div>

            <Typography variant="body1">نحوه ورود به محیط والدین</Typography>
            <div className="tw-mt-6">
              <Radio.Group defaultValue={ctx?.user?.hasLockPassword ? "password" : "question"} onChange={(event) => setLoginType(event.target.value)}>
                <Radio value={"question"}>ورود با سوال ساده</Radio>
                <Radio value={"password"}>ورود با رمز</Radio>
              </Radio.Group>
              <Form.Item name="lockPassword">
                <Input.Password
                  placeholder="رمز پیشنهادی"
                  size="large"
                  className="tw-mt-5"
                  disabled={loginType === "question"}
                  prefix={<FiLock className="tw-text-blue-500" />}
                />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              className="tw-mt-10 tw-w-40 tw-ml-5 tw-rounded-full tw-bg-blue-400"
            >ذخیره</Button>
          </Form>
        </Col>
      </div>
    </ParentDashboardLayout>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Setting.guard = guard;

export default Setting;