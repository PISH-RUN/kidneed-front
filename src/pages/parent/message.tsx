import React, { useEffect, useState } from "react";
import { Guard } from "@kidneed/types";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Avatar, Col, Divider, Input, Pagination, Row, Select, Tag, Typography } from "antd";
import { FiClock, FiCompass, FiInfo } from "react-icons/fi";
import { AiFillInfoCircle } from "react-icons/ai";
import jMoment from "moment-jalaali";
import { useNotification, useNotificationRead } from "../../core-team/api/notification";
import { ApproachModal, ContentDetail } from "../../core-team/components";
import { useApproaches } from "../../core-team/api/approach";
import { useApp } from "@kidneed/hooks";
import { useRouter } from "next/router";
import { useContent } from "../../core-team/api/activity";
import { Collapse } from "@mui/material";
import { useTexts } from "../../core-team/hooks/use-texts";

const types: any = {
  rahche: {
    color: "tw-bg-pink-500",
    icon: FiCompass,
    label: "راه چه"
  },
  goalAssist: {
    color: "tw-bg-green-500",
    icon: FiCompass,
    label: "پاس گل"
  },
  endOfMonthQuiz: {
    color: "tw-bg-orange-500",
    icon: FiInfo,
    label: "آزمون آخر ماه"
  }
};

const typeNames: any = {
  video: "ویدئو",
  activity: "فعالیت عملی",
  book: "کتاب",
  game: "بازی",
  audio: "صوت"
};

const NotificationItem = ({ notif, setContent, setRahche }: any) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { getText } = useTexts();
  const type = types[notif?.attributes?.type];
  const { data: content } = useContent(notif?.attributes?.payload?.content, {
    enabled: !!notif?.attributes?.payload?.content && notif?.attributes?.type === "goalAssist"
  });

  const getPoster = (content: any) => {
    let poster = content?.attributes?.poster?.data?.attributes?.url;

    return poster;
  };

  const getDescription = (notif: any) => {
    if (notif?.attributes?.type === "endOfMonthQuiz") {
      return "لطفا آزمون آخر ماه راه پاسخ دهید";
    }
    if (notif?.attributes?.type === "rahche") {
      return `برای شما ${notif?.attributes?.body} راهکار معرفی شده است.`;
    }
    if (notif?.attributes?.type === "goalAssist") {
      return getText("goalAssistShortDescription");
    }

    return notif?.attributes?.body.substring(0, 250) + (notif?.attributes?.body.length > 250 ? " ..." : "");
  };

  return (
    <Col span={24} key={notif.id}>
      <div className={`tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden tw-transition-all tw-duration-200 ${visible && "tw-rounded-b-none"}`}>
        {notif?.attributes?.type === "goalAssist" &&
          <div className="tw-m-5 tw-self-center tw-relative">
            <Avatar shape="square" src={getPoster(content?.data)} className="tw-w-24 tw-h-24 tw-rounded-xl" />
            <div
              onClick={() => setContent(content?.data)}
              className="tw-pb-5 tw-text-3xl tw-text-gray-300 tw-cursor-pointer tw-rounded-xl tw-absolute tw-top-0 tw-w-full tw-h-full tw-left-0 tw-bg-gray-500 tw-bg-opacity-30 tw-flex tw-items-center tw-justify-center"
            >
              <AiFillInfoCircle className="tw-text-4xl tw-text-white" />
            </div>
            <div
              onClick={() => setContent(content?.data)}
              className="tw-text-sm tw-cursor-pointer tw-rounded-b-xl tw-absolute tw-bottom-0 tw-w-full tw-h-7 tw-left-0 tw-bg-gray-900 tw-bg-opacity-70 tw-flex tw-items-center tw-justify-center"
            >
              <div className="tw-text-white">
                {typeNames[content?.data?.attributes?.type]}
              </div>
            </div>
          </div>}
        <div className={`tw-p-3 tw-pr-0 tw-flex-1 ${notif?.attributes?.type !== "goalAssist" && "tw-mr-5"}`}>
          <Typography.Title level={5} className="description">
            {notif?.attributes?.type === "endOfMonthQuiz" ? "لطفا آزمون آخر ماه راه پاسخ دهید" : notif?.attributes?.title} {content?.data?.attributes?.title && ` - ${content?.data?.attributes?.title}`}
          </Typography.Title>
          {notif?.attributes?.payload?.growthField?.name && <Tag color="blue" className="tw-font-bold tw-mb-1">
            حوزه {notif?.attributes?.payload?.growthField?.name}
          </Tag>}
          <Typography.Paragraph ellipsis={{ rows: 3 }} className="description">
            {getDescription(notif)}
          </Typography.Paragraph>
          <div className="date tw-text-gray-400 tw-text-xs tw-mt-3 tw-flex tw-items-center">
            <FiClock className="tw-ml-2" />
            {jMoment(notif?.attributes?.createdAt).format("jDD jMMMM - HH:mm")}
          </div>
        </div>
        <div
          className={`${type?.color} tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer`}
          onClick={() => {
            if (notif?.attributes?.type === "rahche") {
              setRahche(notif?.attributes?.payload?.id);
            }
            if (notif?.attributes?.type === "endOfMonthQuiz") {
              router.push("/parent/quiz?redirectUrl=/parent/message");
            }
            if (notif?.attributes?.type === "goalAssist") {
              setVisible(!visible);
            }
          }}
        >
          <type.icon className="tw-text-4xl tw-mb-1" />
          <span>{type?.label}</span>
        </div>
      </div>
      <Collapse in={visible}>
        <div className="tw-p-5 tw-pt-0 tw-bg-white tw-rounded-b-xl">
          <Divider className="tw-mt-0" />
          {[...(notif?.attributes?.payload?.text || [])]?.splice(0, 2)?.map((pass: string, index: number) => (
            <Typography.Paragraph key={index} className="description tw-whitespace-pre-line">
              <span className="tw-font-bold tw-ml-2">{index + 1}-</span>
              {pass}
            </Typography.Paragraph>
          ))}
        </div>
      </Collapse>
    </Col>
  );
};

const Message = () => {
  const [rahche, setRahche] = useState();
  const [content, setContent] = useState();
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 25 });
  const { data: rahcheData } = useApproaches(rahche);
  const { fetchUser, ctx } = useApp();
  const { data } = useNotification(search, sort, pagination, ctx?.child?.id);
  const { mutateAsync: readAll } = useNotificationRead();

  useEffect(() => {
    readAll().then(() => {
      fetchUser();
    });
  }, []);

  return (
    <ParentDashboardLayout showChild="header">
      <div className="tw-py-5 tw-px-6">
        <Row justify="space-between">
          <Col>
            <Input.Search placeholder="جستجو پیام ها" onSearch={value => setSearch(value)} />
          </Col>
          <Col>
            <Select placeholder="بر اساس تاریخ" className="tw-ml-3" value={sort} onChange={value => setSort(value)}>
              <Select.Option value="desc">جدید ترین</Select.Option>
              <Select.Option value="asc">قدیمی ترین</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row className="tw-mt-8" gutter={[0, 20]}>
          {data && data?.data?.map((notif: any) =>
            <NotificationItem setContent={setContent} setRahche={setRahche} key={notif.id} notif={notif} />
          )}
        </Row>
        <div className="tw-flex tw-justify-end">
          <Pagination
            className="tw-mt-8"
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={data?.data?.meta?.pagination?.total}
            onChange={(page, pageSize) => setPagination({ ...pagination, page, pageSize })}
          />
        </div>
      </div>

      <ApproachModal
        data={rahcheData || {}}
        visible={!!rahche}
        onOk={() => setRahche(undefined)}
        onCancel={() => setRahche(undefined)}
      />
      <ContentDetail
        visible={!!content}
        content={content}
        onCancel={() => setContent(undefined)}
      />
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