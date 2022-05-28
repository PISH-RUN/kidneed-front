import { Button, Typography } from "@mui/material";
import { Form, Modal, Radio } from "antd";
import { useState } from "react";
import styles from "earth/styles/earth.module.css";
import { useRouter } from "next/router";
import { useApproaches } from "../../../core-team/api/approach";
import { ApproachModal } from "../../../core-team/components";
import { useTexts } from "../../../core-team/hooks/use-texts";

const ResultStep = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const rahche = router.query.id as string;
  const { data } = useApproaches(parseInt(rahche));
  const { getText } = useTexts();

  if (!data?.data) return <></>;

  return (
    <div className="tw-p-10">
      <Typography variant="h5" gutterBottom>
        توضیحات راه چه
      </Typography>
      <Typography variant="body1" className="!tw-mt-10">{getText('rahcheLongResult')}</Typography>
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