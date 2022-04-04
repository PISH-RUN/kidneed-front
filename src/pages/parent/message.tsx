import { Guard } from "@kidneed/types";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Avatar, Col, Input, Row, Select, Typography } from "antd";
import { FiClock, FiCompass, FiInfo } from "react-icons/fi";
import jMoment from "moment-jalaali";

const Message = () => {
  return (
    <ParentDashboardLayout showChild="header">
      <div className="tw-py-5 tw-px-6">
        <Row justify="space-between">
          <Col>
            <Input.Search placeholder="جستجو پیام ها" />
          </Col>
          <Col>
            <Select placeholder="بر اساس تاریخ" className="tw-ml-3">
              <Select.Option value="1">جدید ترین</Select.Option>
              <Select.Option value="1">قدیمی ترین</Select.Option>
            </Select>
            <Select placeholder="تمام پیام ها">
              <Select.Option value="1">خوانده شده</Select.Option>
              <Select.Option value="1">خوانده نشده</Select.Option>
              <Select.Option value="1">تمام پیام ها</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row className="tw-mt-8" gutter={[0, 20]}>
          <Col span={24}>
            <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
              <div className="tw-p-5 tw-self-center">
                <Avatar shape="square" className="tw-w-20 tw-h-16 tw-rounded-xl" />
              </div>
              <div className="tw-p-3 tw-pr-0 tw-flex-1">
                <Typography.Paragraph ellipsis={{ rows: 3 }} className="description">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                  و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                  کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه
                </Typography.Paragraph>
                <div className="date tw-text-gray-400 tw-text-xs tw-mt-3 tw-flex tw-items-center">
                  <FiClock className="tw-ml-2" />
                  {jMoment().format("jDD jMMMM - HH:mm")}
                </div>
              </div>
              <div className="tw-bg-green-400 tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col">
                <FiCompass className="tw-text-4xl tw-mb-1" />
                <span>پاس گل</span>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
              <div className="tw-p-5 tw-self-center">
                <Avatar shape="square" className="tw-w-20 tw-h-16 tw-rounded-xl" />
              </div>
              <div className="tw-p-3 tw-pr-0 tw-flex-1">
                <Typography.Paragraph ellipsis={{ rows: 3 }} className="description">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                  و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                  کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه
                </Typography.Paragraph>
                <div className="date tw-text-gray-400 tw-text-xs tw-mt-3 tw-flex tw-items-center">
                  <FiClock className="tw-ml-2" />
                  {jMoment().format("jDD jMMMM - HH:mm")}
                </div>
              </div>
              <div className="tw-bg-pink-500 tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col">
                <FiCompass className="tw-text-4xl tw-mb-1" />
                <span>پاس گل</span>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
              <div className="tw-p-4 tw-flex-1">
                <Typography.Paragraph ellipsis={{ rows: 3 }} className="description">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                </Typography.Paragraph>
                <div className="date tw-text-gray-400 tw-text-xs tw-mt-2 tw-flex tw-items-center">
                  <FiClock className="tw-ml-2" />
                  {jMoment().format("jDD jMMMM - HH:mm")}
                </div>
              </div>
              <div className="tw-bg-blue-400 tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col">
                <FiInfo className="tw-text-4xl tw-mb-1" />
                <span>گزارش</span>
              </div>
            </div>
          </Col>
        </Row>
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

Message.guard = guard;

export default Message;