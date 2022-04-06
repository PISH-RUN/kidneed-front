import { FC, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Typography } from "antd";
import { Tab, Tabs } from "@mui/material";
import jMoment from "moment-jalaali";

const ContentModal: FC<any> = ({ time, visible, onClose }) => {
  const [tab, setTab] = useState("video");

  return (
    <Modal
      footer={false} width={700} visible={visible} closable={false} className="tw-rounded-3xl tw-overflow-hidden tw-p-0"
    >
      <div className="tw-px-6">
        <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)} aria-label="basic tabs example">
          <Tab label="فیلم" value="video" />
          <Tab label="صوت" value="audio" />
          <Tab label="بازی" value="game" />
          <Tab label="فعالیت" value="activity" />
          <Tab label="کتاب" value="book" />
        </Tabs>

        <div className="tw-mt-10">
          <Form layout="vertical">
            <Form.Item label="زمان">
              <span className="tw-py-1 tw-px-2 tw-rounded-md tw-bg-gray-100">{jMoment(time).format('dddd jDD jMMMM')}</span>
            </Form.Item>
            <Form.Item label="محتوا اول">
              <Input />
            </Form.Item>
            <Form.Item label="محتوا دوم">
              <Select mode="tags" />
            </Form.Item>
          </Form>
        </div>
        <div className="tw-mt-10 tw-text-center">
          <Button type="primary" className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full tw-bg-blue-400">افزودن</Button>
          <Button className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full" onClick={onClose}>لغو</Button>
          <Button type="primary" danger className="tw-h-10 tw-w-32 tw-ml-5 tw-rounded-full">حذف</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ContentModal;