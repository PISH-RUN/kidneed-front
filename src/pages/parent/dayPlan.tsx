import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import ArrowDown from "../../layouts/icons/arrow-down";
import { openGuard } from "@kidneed/utils";
import PsImage1 from "public/images/temp/image-24.png";
import PsImage2 from "public/images/temp/image-25.png";
import PsImage3 from "public/images/temp/image-26.png";
import { Button, Card, Tag } from "antd";
import ContentModal from "../../core-team/components/contentModal";
import { useTodayActivity } from "../../core-team/api/activity";
import { useApp } from "@kidneed/hooks";

const SideDashboard = () => {
  return <>
    <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2, pr: 3, cursor: "pointer" }}>
      <Avatar sx={{ width: 90, height: 90, p: 2, background: "#E2F1FD" }} src="/images/avatar-woman.png" />
      <Box flexGrow={1}>
        <Typography variant="h5">حسنا خانوم</Typography>
        <Typography variant="h6" sx={{ color: "#8CA3A5" }}>2500 سکه</Typography>
      </Box>
      <Box>
        <ArrowDown sx={{ color: "#8CA3A5" }} />
      </Box>
    </Stack>
    <Box>
      <Box component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
    </Box>
  </>;
};

const typeNames: any = {
  video: "ویدئو"
}

const data: any = [
  {
    images: [PsImage1, PsImage2],
    type: "انیمیشن",
    duration: "01:15",
    tags: ["صبر", "تیزهوشی", "امید"]
  },
  {
    images: [PsImage2, PsImage3],
    type: "کتاب صوتی",
    duration: "01:15",
    tags: ["صبر", "تیزهوشی", "امید"]
  },
  {
    images: [PsImage3, PsImage1],
    type: "بازی محیطی",
    duration: "01:15",
    tags: ["صبر", "تیزهوشی", "امید"]
  }
];

const DayPlan = () => {
  const { ctx, selectChild } = useApp();
  const [selectPlan, setSelectPlant] = useState(false);
  const { data: activities } = useTodayActivity(ctx?.child?.id);

  useEffect(() => {
    if(!ctx.child && ctx.children) {
      selectChild(ctx.children[0])
    }
  }, [ctx])

  return (
    <div className="tw-p-5">
      {activities && activities?.data?.map((item: any, index: number) => (
        <Card key={index} className="tw-w-full tw-mb-4 tw-rounded-3xl">
          <div className="tw-flex">
            <div className="tw-ml-4">
              <Image src={PsImage2} />
            </div>
            <div>
              <Image src={PsImage1} />
            </div>
            <div>
              <div className="tw-pt-5 tw-pr-4">
                <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">نوع محتوا:</span>
                <span className="tw-text-xl tw-font-bold">{typeNames[item.attributes.type]}</span>
              </div>
              <div className="tw-pt-5 tw-pr-4">
                <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">مدت زمان:</span>
                <span className="tw-text-xl tw-font-bold">{item.attributes.duration}</span>
              </div>
              <div className="tw-mt-8 tw-pt-5 tw-pr-4">
                <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">تگ ها:</span>
                <span className="tw-text-xl tw-font-bold">{["صبر", "تیزهوشی", "امید"].map((tag: any) => <Tag
                  key={tag}
                  className="tw-bg-gray-300 tw-text-white tw-px-3 tw-font-normal tw-rounded-full tw-text-base"
                >{tag}</Tag>)}</span>
              </div>
              <div className="tw-mt-5 tw-mr-5">
                <Button
                  onClick={() => setSelectPlant(!selectPlan)}
                  size="large"
                  className="hover:tw-bg-gray-200 hover:tw-text-gray-500 hover:tw-border-gray-100 tw-h-14 tw-bg-gray-100 tw-border-gray-50 tw-text-gray-500 tw-rounded-full"
                  block
                >
                  ویرایش
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      <ContentModal visible={selectPlan} onClose={() => setSelectPlant(false)} />
    </div>
  );
};

DayPlan.getLayout = (children: any) => (
  <ParentDashboardLayout>{children}</ParentDashboardLayout>
);

DayPlan.guard = openGuard;

export default DayPlan;