import { useState } from 'react'
import { Modal, Steps } from "antd";
import styles from 'earth/styles/earth.module.css'
import Image from 'next/image'
import SearchBox from 'earth/components/searchBox'
import Card from '../earth/components/card';
import ParentDashboardLayout from 'layouts/parent-dashboard-layout'
import {
  Typography,
  Box,
  Stack,
  Grid,
  Rating,
  Avatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import ArrowDown from "layouts/icons/arrow-down";

const SideDashboard = () => {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ py: 2, pr: 3, cursor: "pointer" }}
      >
        <Avatar
          sx={{ width: 90, height: 90, p: 2, background: "#E2F1FD" }}
          src="/images/avatar-woman.png"
        />
        <Box flexGrow={1}>
          <Typography variant="h5">حسنا خانوم</Typography>
          <Typography variant="h6" sx={{ color: "#8CA3A5" }}>
            2500 سکه
          </Typography>
        </Box>
        <Box>
          <ArrowDown sx={{ color: "#8CA3A5" }} />
        </Box>
      </Stack>
      <Box>
        <Box component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
      </Box>
    </>
  );
};
const Earth = () => {
  const { Step } = Steps;
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState(true);

  return (
    <div className={styles.earth}>
      <div>
        <div className={styles.steps}>
          <Steps current={step}>
            <Step title="موضوع" />
            <Step title="نشانه ها" />
            <Step title="ریشه ها" />
            <Step title="راهکار" />
          </Steps>
        </div>
      </div>
      {step === 0 && <div>
        <SearchBox />
        <div className={styles.cards}>
          <div className={styles.cardBox}>
            <Card />
          </div>
          <div className={styles.cardBox}>
            <Card />
          </div>
          <div className={styles.cardBox}>
            <Card />
          </div>
        </div>
        <Modal
          footer={false}
          closable={false}
          centered
          visible={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          className={styles.preShowModal + " tw-rounded-3xl tw-overflow-hidden"}
        >
          <div className={styles.header}>
            راه چه
          </div>
          <div className={styles.content}>
            <div className={styles.plan}>
              <div className={styles.text}>
                پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما
              </div>
              <div className={styles.buttons}>
                <div>
                  <button className={styles.continueBtn} type='button'>ادامه</button>
                </div>
                <div>
                  <button className={styles.backBtn} type='button'>بازگشت</button>
                </div>
              </div>
            </div>
            <div className={styles.movie}>

            </div>
          </div>
        </Modal>
      </div>}
    </div>
  );
};

Earth.getLayout = (children) => (
  <ParentDashboardLayout >{children}</ParentDashboardLayout>
);
export default Earth;
Earth.guard = () => true
