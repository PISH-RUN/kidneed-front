import { Guard } from "@kidneed/types";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Button, Col, Form, Input, Radio, Select } from "antd";
import { Typography } from "@mui/material";
import React from "react";
import { AgeSlider } from "venus/AgeSlider/AgeSlider";
import { FiUser, FiLock } from "react-icons/fi";

const Setting = () => {
  return (
    <ParentDashboardLayout showChild="header">
      <div className="tw-py-8 tw-px-10">
        <Col xl={10} xs={24}>
          <Form>
            <Typography variant="body1">اطلاعات فرزند شما</Typography>
            <div className="tw-mt-6 tw-mb-8">
              <Form.Item name="childName">
                <Input placeholder="نام فرزند شما" size="large" prefix={<FiUser className="tw-text-blue-500" />} type="text" />
              </Form.Item>
              <Form.Item name="gender" initialValue="boy">
                <Radio.Group>
                  <Radio value={"boy"}>آقا پسر</Radio>
                  <Radio value={"girl"}>دختر خانوم</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="age">
                <AgeSlider />
              </Form.Item>
            </div>
            <Typography variant="body1">اطلاعات شما</Typography>
            <div className="tw-mt-6 tw-mb-8">
              <Form.Item name="childName">
                <Input placeholder="نام شما" size="large" prefix={<FiUser className="tw-text-blue-500" />} type="text" />
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
            </div>

            <Typography variant="body1">نحوه ورود به محیط والدین</Typography>
            <div className="tw-mt-6">
              <Radio.Group defaultValue="question">
                <Radio value={"question"}>ورود با سوال ساده</Radio>
                <Radio value={"password"}>ورود با رمز</Radio>
              </Radio.Group>
              <Input.Password placeholder="رمز پیشنهادی" size="large" className="tw-mt-5" prefix={<FiLock className="tw-text-blue-500" />} />
            </div>

            <Button type="primary" className="tw-mt-10 tw-w-40 tw-ml-5 tw-rounded-full tw-bg-blue-400">ذخیره</Button>
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