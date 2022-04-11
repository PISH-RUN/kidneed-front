import { Button, Typography } from "@mui/material";
import { Form, Modal, Radio } from "antd";
import { useState } from "react";
import styles from "earth/styles/earth.module.css";
import { useRouter } from "next/router";
import { useApproaches } from "../../../core-team/api/approach";

const ResultStep = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const rahche = router.query.id as string;
  const { data } = useApproaches(parseInt(rahche));

  if (!data?.data) return;

  return (
    <div className="tw-p-10">
      <Typography variant="h5" gutterBottom>
        {data?.data[0].title}
      </Typography>
      <Typography variant="body1" className="!tw-mt-10">
        {data?.data[0].body}
      </Typography>
      <div className="tw-flex tw-justify-center">
        <Button onClick={() => setModal(true)} variant="contained" className="tw-w-40 !tw-rounded-full !tw-mt-14">مشاهده
          راهکار</Button>
      </div>

      <Modal
        footer={false}
        closable={true}
        centered
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
      >
        <div className={styles.allContent}>
          <div className={styles.header}>
            عنوان راهکار
          </div>
          <div className={styles.content}>
            <div className={styles.plan}>
              <div className={styles.text}>
                پروین اعتصامی که نام اصلی او «رخشنده» است در 25 اسفند 1285 هجری شمسی در شهر تبریز به دنیا آمد. از
                پروین به عنوان یکی از مشهورترین شاعران زن ایران یاد می‌شود. پروین زمانی که کودک بود همراه خانواده‌اش
                به تهران آمدند. یوسف اعتصامی پدر پروین معروف به اعتصام‌الملک از نویسندگان و دانشمندان نامدار ایرانی
                بود که اولین چاپخانه را در تبریز بنا کرد و مدتی هم نماینده‌ی مجلس بود. مادرش اختر اعتصامی زنی خانه‌دار
                بود. پدر و مادر پروین در زندگی او نقش موثری داشتند چرا که آن‌ها با پرورش احساسات لطیف و شاعرانه‌ی
                دخترشان و تشویق و علاقه در استعداد شعرسرایی او کمک زیادی در این زمینه به پروین کردند.
              </div>
            </div>
            <div className={styles.movie}>
              <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
                <iframe
                  src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResultStep;