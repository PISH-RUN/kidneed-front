import { useState } from 'react'
import { Modal, Steps } from "antd";
import styles from 'earth/styles/earth.module.css'
import UserProfile from 'earth/components/userProfile'
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
    <div>
      <div>
        <div>
          <Steps current={step}>
            <Step title="موضوع" />
            <Step title="نشانه ها" />
            <Step title="ریشه ها" />
            <Step title="راهکار" />
          </Steps>
        </div>
        <UserProfile />
      </div>
      {step === 0 && <div>
        <SearchBox />
        <Card />
        <Modal
          title="راه چه"
          centered
          visible={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          className={styles.preShowModal}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>}
    </div>
  );
};

Earth.getLayout = (children) => (
  <ParentDashboardLayout SideComponent={<SideDashboard />}>{children}</ParentDashboardLayout>
);
export default Earth;
Earth.guard = () => true
