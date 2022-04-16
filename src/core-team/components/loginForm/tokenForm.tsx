import { FC } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import styles from "./loginForm.module.css";

interface MobileFormProp {
  onSubmit: (values: any) => void;
  requestOtp: () => void;
  loading: boolean
  otpLoading: boolean
}

const TokenForm: FC<MobileFormProp> = ({ onSubmit, requestOtp, loading, otpLoading }) => {
  return (
    <Form<any>
      className="tw-text-center"
      onFinish={onSubmit}
    >
      <div className="tw-mb-6">
        لطفا کد ارسالی را وارد نمایید
      </div>
      <Form.Item name="token" className="tw-mb-12">
        <Input className={styles.mobileInput} autoFocus />
      </Form.Item>

      <Row gutter={15}>
        <Col span={12}>
          <Button loading={loading} htmlType="submit" type="primary" className="tw-rounded-full tw-bg-blue-500 tw-ml-5" block>
            تایید کد
          </Button>
        </Col>
        <Col span={12}>
          <Button loading={otpLoading} className="tw-rounded-full" block onClick={requestOtp}>ارسال مجدد</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TokenForm;