import { Avatar, Col, Input, Modal, Row, Typography } from "antd";
import { FiClock } from "react-icons/fi";
import { useSubjects, useSelectSubject } from "core-team/api/approach";
import { API } from "core-team/constants";
import aimIcon from "earth/media/icons/aim.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApp } from "@kidneed/hooks";
import { Button } from "@mui/material";
import styles from "../../../earth/styles/earth.module.css";
import { useTexts } from "../../../core-team/hooks/use-texts";

const SubjectStep = () => {
  const [search, setSearch] = useState("");
  const { data: subjects } = useSubjects(search);
  const { mutateAsync: selectSubject } = useSelectSubject();
  const { ctx } = useApp();
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { getText } = useTexts();

  const rahcheModal = localStorage.getItem('rahcheModal');

  const handleSelect = (subject: number) => {
    selectSubject({ subject, child: ctx?.child?.id }).then((resp) => {
      router.push(`/parent/rahche?id=${resp?.data?.id}&step=sign`);
    });
  };

  useEffect(() => {
    rahcheModal === null && setModal(true);
    localStorage.setItem("rahcheModal", "true");
  }, [])

  return (
    <>
      <Row justify="space-between">
        <Input.Search onSearch={(value) => setSearch(value)} placeholder="جستجو راه چه" className="tw-w-96" />
        <Button variant="contained" onClick={() => setModal(true)}>
          مشاهده معرفی راه چه
        </Button>
      </Row>
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
              </div>
              <div
                onClick={() => handleSelect(subject.id)}
                className="tw-bg-green-400 tw-text-white tw-w-28 tw-flex tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer hover:tw-bg-green-300"
              >
                مشاوره
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        footer={false}
        closable={false}
        centered
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        className={styles.preShowModal + " tw-rounded-3xl tw-overflow-hidden"}
      >
        <div className={styles.allContent}>
          <div className={styles.header}>
            راه چه
          </div>
          <div className={styles.content}>
            <div className={styles.plan}>
              <div className={styles.text}>
                <div className="tw-text-justify tw-text-base">
                  {getText('rahcheIntroduce')}
                </div>
              </div>
            </div>
            <div className={styles.movie}>
              <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
                <iframe
                  src={`https://www.aparat.com/video/video/embed/videohash/${getText('rahcheIntroduceVideo')}/vt/frame`}
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
          <div className="tw-flex tw-justify-center tw-w-full tw-pb-5">
            <Button variant="outlined" className="!tw-rounded-full tw-w-24" onClick={() => setModal(false)} type="button">بستن</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubjectStep;