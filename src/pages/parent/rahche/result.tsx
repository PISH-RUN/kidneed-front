import { Button, Typography } from "@mui/material";
import { Form, Modal, Radio } from "antd";
import { useState } from "react";
import styles from "earth/styles/earth.module.css";
import { useRouter } from "next/router";
import { useApproaches } from "../../../core-team/api/approach";
import { ApproachModal } from "../../../core-team/components";

const ResultStep = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const rahche = router.query.id as string;
  const { data } = useApproaches(parseInt(rahche));

  if (!data?.data) return <></>;

  return (
    <div className="tw-p-10">
      <Typography variant="h5" gutterBottom>
        عنوان صفحه نهایی
      </Typography>
      <Typography variant="body1" className="!tw-mt-10">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
        هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
        متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
        پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
        طراحی اساسا مورد استفاده قرار گیرد.
      </Typography>
      <div className="tw-flex tw-justify-center">
        <Button onClick={() => setModal(true)} variant="contained" className="tw-w-40 !tw-rounded-full !tw-mt-14">مشاهده
          راهکار</Button>
      </div>

      <ApproachModal
        data={data}
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      />
    </div>
  );
};

export default ResultStep;