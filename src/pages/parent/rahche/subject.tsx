import { Avatar, Col, Input, Row, Typography } from "antd";
import { FiClock } from "react-icons/fi";
import { useSubjects, useSelectSubject } from "core-team/api/approach";
import { API } from "core-team/constants";
import aimIcon from "earth/media/icons/aim.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useApp } from "@kidneed/hooks";

const SubjectStep = () => {
  const [search, setSearch] = useState("");
  const { data: subjects } = useSubjects(search);
  const { mutateAsync: selectSubject } = useSelectSubject();
  const { ctx } = useApp();
  const router = useRouter();

  const handleSelect = (subject: number) => {
    selectSubject({ subject, child: ctx?.child?.id }).then((resp) => {
      router.push(`/parent/rahche?id=${resp?.data?.id}&step=sign`);
    });
  };

  return (
    <>
      <Input.Search onSearch={(value) => setSearch(value)} placeholder="جستجو راه چه" className="tw-w-96" />
      <Row className="tw-mt-8" gutter={[0, 20]}>
        {subjects?.data && subjects?.data.map((subject: any) => (
          <Col span={24} key={subject.id}>
            <div className="tw-bg-white tw-flex tw-rounded-xl tw-overflow-hidden">
              <div className="tw-p-5 tw-self-center">
                {subject.attributes.image?.data?.attributes?.url && <Avatar
                  className="tw-w-40 tw-h-24 tw-rounded-xl"
                  src={API + subject.attributes.image?.data?.attributes?.url}
                />}
              </div>
              <div className="tw-p-3 tw-pr-0 tw-flex-1">
                <div className="tw-flex tw-items-center">
                  <div>
                    <Image src={aimIcon} alt="card" className="tw-h-auto" />
                  </div>
                  <Typography.Title level={5} className="!tw-mr-2">{subject.attributes.name}</Typography.Title>
                </div>
                <Typography.Paragraph
                  ellipsis={{ rows: 3 }}
                  className="description"
                >
                  {subject.attributes.description}
                </Typography.Paragraph>
                <div className="date tw-text-gray-400 tw-text-xs tw-mt-3 tw-flex tw-items-center">
                  <FiClock className="tw-ml-2" />
                  {subject.attributes.duration} ساعت برنامه
                </div>
              </div>
              <div
                onClick={() => handleSelect(subject.id)}
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

export default SubjectStep;