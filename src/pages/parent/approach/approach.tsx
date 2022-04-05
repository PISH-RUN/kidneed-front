import { Avatar, Col, Input, Row, Steps, Typography } from "antd";
import { FiClock } from "react-icons/fi";
import { useApproach } from "core-team/api/approach";
import { API } from "core-team/constants";
import aimIcon from "earth/media/icons/aim.png";
import Image from "next/image";
import { useRouter } from "next/router";

const ApproachStep = () => {
  const { data: approach } = useApproach();
  const router = useRouter();

  return (
    <>
      <Input.Search placeholder="جستجو راه چه" className="tw-w-96" />
      <Row className="tw-mt-8" gutter={[0, 20]}>
        {approach && approach.map((app: any) => (
          <Col span={24} key={app.id}>
            <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
              <div className="tw-p-5 tw-self-center">
                <Avatar className="tw-w-40 tw-h-24 tw-rounded-xl" src={API + app.image.url} />
              </div>
              <div className="tw-p-3 tw-pr-0 tw-flex-1">
                <div className="tw-flex tw-items-center">
                  <div>
                    <Image src={aimIcon} alt="card" className="tw-h-auto" />
                  </div>
                  <Typography.Title level={5} className="!tw-mr-2">{app.title}</Typography.Title>
                </div>
                <Typography.Paragraph
                  ellipsis={{ rows: 3 }}
                  className="description"
                >{app.description}</Typography.Paragraph>
                <div className="date tw-text-gray-400 tw-text-xs tw-mt-3 tw-flex tw-items-center">
                  <FiClock className="tw-ml-2" />
                  {app.duration} ساعت برنامه
                </div>
              </div>
              <div
                onClick={() => router.push(`/parent/approach?id=${app.id}`)}
                className="tw-bg-green-400 tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer hover:tw-bg-green-300"
              >
                بیشتر بدانید
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ApproachStep;