import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Box, CircularProgress, Stack, Typography } from "@mui/material";
import ArrowDown from "../../layouts/icons/arrow-down";
import { openGuard } from "@kidneed/utils";
import PsImage1 from "public/images/temp/image-24.png";
import PsImage2 from "public/images/temp/image-25.png";
import PsImage3 from "public/images/temp/image-26.png";
import { Button, Card, Tag } from "antd";
import ContentModal from "../../core-team/components/contentModal";
import { useActivity, useTodayActivity } from "../../core-team/api/activity";
import { useApp } from "@kidneed/hooks";
import _ from "lodash";
import jMoment from "moment-jalaali";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Moment } from "moment";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const today = jMoment();

const typeNames: any = {
  video: "ویدئو",
  activity: "فعالیت عملی",
  book: "کتاب",
  audio: "صوت"
};

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

const SideComponent = (props: any) => {
  const [month, setMonth] = useState(today);
  const [selectedDate, setDate] = useState(today);
  const { ctx } = useApp();
  const { data: activities } = useActivity([jMoment(month).startOf("jMonth"), jMoment(month).endOf("jMonth")], ctx?.child?.id);

  const getDayActivities = (day: Moment) => {
    return _.filter(activities?.data, (item) => {
      const activityDate = jMoment(item.attributes?.date, "YYYY-MM-DD");
      return activityDate.jDate() === day.jDate() && activityDate.jMonth() === day.jMonth();
    });
  };

  const monthDays = () => {
    const days = [];
    let day = jMoment(month).startOf("jMonth");
    while (day.jMonth() === month.jMonth()) {
      days.push(jMoment(day));
      day = day.add("day", 1);
    }

    return days;
  };

  return (
    <div>
      <div className="tw-flex tw-px-3 tw-pr-6 tw-py-6 tw-items-center tw-justify-between">
        <Typography variant="h6">
          <span className="tw-font-bold tw-ml-2">{month.format("jMMMM")}</span>
          <span className="tw-text-gray-400">{month.format("jYYYY")}</span>
        </Typography>
        <div className="tw-flex">
          <FaChevronRight
            onClick={() => setMonth(jMoment(month).add("month", -1))}
            className="tw-cursor-pointer tw-w-8 tw-h-8 tw-text-gray-500 tw-border-gray-500 tw-border-2 tw-rounded-full tw-p-2 tw-ml-2"
          />
          <FaChevronLeft
            onClick={() => setMonth(jMoment(month).add("month", 1))}
            className="tw-cursor-pointer tw-w-8 tw-h-8 tw-text-gray-500 tw-border-gray-500 tw-border-2 tw-rounded-full tw-p-2"
          />
        </div>
      </div>
      <Box className="tw-overflow-y-auto">
        {_.map(monthDays(), (date) => {
          const activities = getDayActivities(date);
          const min = _.sumBy(activities, i => i.attributes.duration || 0);
          const durationText = min > 60 ? `${Math.floor(min / 60)} ساعت` : `${min} دقیقه`;

          date.jDate() === 31 && console.log(activities);

          return (
            <div
              onClick={() => {
                setDate(date);
                props.onChangeDate(date);
              }}
              className={`hover:tw-bg-gray-100 tw-cursor-pointer tw-p-2 tw-ml-4 tw-rounded-l-2xl tw-py-4 tw-pr-6 tw-flex tw-items-center ${date.jDate() === selectedDate.jDate() ? "tw-bg-gray-200" : ""}`}
            >
              <div className="tw-text-center">
                <Typography variant="h4">
                  <span className="tw-font-bold">{date.format("jDD")}</span>
                </Typography>
                <span className="tw-text-gray-400">{date.format("dd")}</span>
              </div>
              <div className="tw-mr-4">
                <Typography
                  variant="body1"
                  className="tw-text-black"
                >{activities.length} برنامه</Typography>
                <Typography
                  variant="caption"
                  className="tw-text-gray-400"
                >مجموع {durationText}</Typography>
              </div>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

const DayPlan = () => {
  const { ctx, selectChild } = useApp();
  const [selectPlan, setSelectPlant] = useState(false);
  const [selectedDate, setDate] = useState(today);
  const { data: activities, isLoading } = useTodayActivity(ctx?.child?.id, selectedDate);

  useEffect(() => {
    if (!ctx.child && ctx.children) {
      selectChild(ctx.children[0]);
    }
  }, [ctx]);

  return (
    <ParentDashboardLayout
      showChild
      SideComponent={<SideComponent
        onChangeDate={(date: any) => setDate(date)}
      />}
    >
      <div className="tw-p-5">
        {isLoading && <div className="tw-text-center tw-py-10">
          <CircularProgress />
        </div>}
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
                  <span className="tw-text-xl tw-font-bold">{typeNames[item.attributes.type]} {item.id}</span>
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
    </ParentDashboardLayout>
  );
};

DayPlan.guard = openGuard;

export default DayPlan;