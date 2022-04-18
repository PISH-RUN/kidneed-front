import { useEffect, useState } from "react";
import { Guard } from "@kidneed/types";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Avatar, Col, Input, Pagination, Row, Select, Typography } from "antd";
import { FiClock, FiCompass, FiInfo } from "react-icons/fi";
import jMoment from "moment-jalaali";
import { useNotification, useNotificationRead } from "../../core-team/api/notification";
import { ApproachModal } from "../../core-team/components";
import { useApproaches } from "../../core-team/api/approach";
import { useApp } from "@kidneed/hooks";
import { useRouter } from "next/router";

const types: any = {
  rahche: {
    color: "tw-bg-pink-500",
    icon: FiCompass,
    label: "راه چه"
  },
  pass: {
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

const Message = () => {
  const [rahche, setRahche] = useState();
  const [sort, setSort] = useState("desc");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 25 });
  const { data: rahcheData } = useApproaches(rahche);
  const router = useRouter();
  const { fetchUser } = useApp();
  const { data } = useNotification(search, sort, pagination);
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
          {data && data?.data?.map((notif: any) => {
            const type = types[notif?.attributes?.type];

            return (
              <Col span={24} key={notif.id}>
                <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
                  {notif?.attributes?.type !== "rahche" &&
                    <div className="tw-p-5 tw-self-center">
                      <Avatar shape="square" className="tw-w-20 tw-h-16 tw-rounded-xl" />
                    </div>}
                  <div className={`tw-p-3 tw-pr-0 tw-flex-1 ${notif?.attributes?.type === 'rahche' && 'tw-mr-5'}`}>
                    <Typography.Title level={5} className="description">
                      {notif?.attributes?.title}
                    </Typography.Title>
                    <Typography.Paragraph ellipsis={{ rows: 3 }} className="description">
                      {notif?.attributes?.body}
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
                    }}
                  >
                    <type.icon className="tw-text-4xl tw-mb-1" />
                    <span>{type?.label}</span>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="tw-flex tw-justify-end">
          <Pagination
            className="tw-mt-8"
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={50}
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