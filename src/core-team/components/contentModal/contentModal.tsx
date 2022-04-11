import { FC, useState } from "react";
import { Button, Card, Form, Input, Modal, notification, Select } from "antd";
import { Tab, Tabs } from "@mui/material";
import jMoment from "moment-jalaali";
import { ContentSearch } from "../contentSearch/contentSearch";
import { useAddActivity } from "../../api/activity";
import { useApp } from "@kidneed/hooks";

const ContentForm = ({ time, activity, onClose }: any) => {
  const [tab, setTab] = useState("video");
  const isEdit = typeof activity !== "boolean";
  const [form] = Form.useForm();
  const { ctx } = useApp();
  const { mutateAsync: addActivity } = useAddActivity(ctx.child?.id);
  const { mutateAsync: editActivity } = useAddActivity(ctx.child?.id);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const request = isEdit ? editActivity : addActivity;
      request({
        ...values,
        date: jMoment(time).format("YYYY-MM-DD")
      }).then(() => {
        notification.success({
          message: "برنامه با موفقیت ثبت شد."
        });
        onClose(true);
        form.resetFields();
      });
    });
  };

  activity[0] && console.log(activity[0].attributes?.content, form.getFieldValue("content1"));

  return (
    <>
      <Tabs
        value={!isEdit ? tab : activity[0].attributes?.type}
        onChange={(event, newValue) => {
          if (!isEdit) {
            setTab(newValue);
            form.resetFields();
          }
        }}
        aria-label="basic tabs example"
      >
        <Tab label="فیلم" value="video" />
        <Tab label="صوت" value="audio" />
        <Tab label="بازی" value="game" />
        <Tab label="فعالیت" value="activity" />
        <Tab label="کتاب" value="book" />
      </Tabs>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div className="tw-mt-10">
          <Form.Item label="زمان">
            <span className="tw-py-1 tw-px-2 tw-rounded-md tw-bg-gray-100">{jMoment(time).format("dddd jDD jMMMM")}</span>
          </Form.Item>
          <Form.Item label="محتوا اول" name="content1" initialValue={isEdit && activity[0].attributes?.content}>
            <ContentSearch type={tab} />
          </Form.Item>
          <Form.Item label="محتوا دوم" name="content2" initialValue={isEdit && activity[1].attributes?.content}>
            <ContentSearch type={tab} />
          </Form.Item>
        </div>
        <div className="tw-mt-10 tw-text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full tw-bg-blue-400"
          >افزودن</Button>
          <Button
            className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full"
            onClick={() => {
              onClose();
              form.resetFields();
            }}
          >لغو</Button>
          {isEdit &&
            <Button type="primary" danger className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full">حذف</Button>}
        </div>
      </Form>
    </>
  );
};

const ContentModal: FC<any> = ({ visible, ...rest }) => {
  return (
    <Modal
      footer={false}
      width={700}
      visible={visible}
      closable={false}
      destroyOnClose
      className="tw-rounded-3xl tw-overflow-hidden tw-p-0"
    >
      <div className="tw-px-6">
        <ContentForm {...rest} />
      </div>
    </Modal>
  );
};

export default ContentModal;