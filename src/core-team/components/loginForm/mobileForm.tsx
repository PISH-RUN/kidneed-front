import { Button, Card, Col, Form, Input, Row } from "antd";
import { FC } from "react";
import styles from "./loginForm.module.css";
import { useRouter } from "next/router";

interface MobileFormProp {
  onSubmit: (values: any) => void;
  loading: boolean
}

const MobileForm: FC<MobileFormProp> = ({ onSubmit, loading }) => {
  const router = useRouter();

  return (
    <Form<any>
      className="tw-text-center"
      onFinish={(values) => {
        onSubmit({
          mobile: values.mobile.slice(-10)
        });
      }}
    >
      <div className="tw-mb-6">
        لطفا شماره موبایل خود را وارد کنید
      </div>
      <Form.Item name="mobile" className="tw-mb-12" rules={[{ required: true }]}>
        <Input className={styles.mobileInput} addonAfter={<div className={styles.ltr}>+98</div>} />
      </Form.Item>

      <Row gutter={15}>
        <Col span={12}>
          <Button loading={loading} htmlType="submit" type="primary" className="tw-rounded-full tw-bg-blue-500 tw-ml-5" block>
            ارسال کد
          </Button>
        </Col>
        <Col span={12}>
          <Button className="tw-rounded-full" block onClick={() => router.push('/')}>بازگشت به آغازه</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MobileForm;