import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { openGuard } from "@kidneed/utils";
import { Button, Card, Tag } from "antd";
import ContentModal from "core-team/components/contentModal";
import {
  useActivityGlance,
  useContent,
  useContents,
  useTodayActivity
} from "core-team/api/activity";
import { useApp } from "@kidneed/hooks";
import _ from "lodash";
import jMoment from "moment-jalaali";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Moment } from "moment";
import { ContentDetail } from "core-team/components";
import moment from "moment";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const today = jMoment();

const typeNames: any = {
  video: "ویدئو",
  activity: "فعالیت عملی",
  book: "کتاب",
  game: "بازی",
  audio: "صوت"
};

const tags: any = {
  A: "رشدی حرکتی",
  B: "رشدی شناختی",
  C: "رشدی هیجانی",
  D: "رشد اجتماعی-اخلاقی"
};

const SideComponent = (props: any) => {
  const [month, setMonth] = useState(today);
  const [selectedDate, setDate] = useState(today);
  const { ctx } = useApp();
  const { data } = useActivityGlance(ctx?.child?.id);

  const getDayActivities = (day: Moment) => {
    return data ? data.data[day.format("YYYY-MM-DD")] || [] : [];
  };

  const monthDays = () => {
    const days = [];
    let day = jMoment(month);
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
          const durationText = moment.duration(activities.duration, "minute").humanize();

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
                >{activities.count} برنامه</Typography>
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
  const [selectedContent, setContent] = useState();
  const { data: activities, isLoading } = useTodayActivity(ctx?.child?.id, selectedDate);
  const { data: content } = useContent(selectedContent);
  const { data: contents } = useContents(activities?.data?.map((i: any) => i.attributes.content));

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
        {activities && _.map(_.groupBy(activities?.data, i => i.attributes.type), (items: any, type: string) => {
          const content1 = _.find(contents?.data, i => i.id === parseInt(items[0].attributes.content));
          const content2 = _.find(contents?.data, i => i.id === parseInt(items[1].attributes.content));
          const contentTags: string[] = [];

          content1?.attributes?.editions?.data?.map((tag: any) => {
            if (contentTags.indexOf(tag?.attributes?.tag) === -1) {
              contentTags.push(tag?.attributes?.tag);
            }
          });

          content2?.attributes?.editions?.data?.map((tag: any) => {
            if (contentTags.indexOf(tag?.attributes?.tag) === -1) {
              contentTags.push(tag?.attributes?.tag);
            }
          });

          return (
            <Card key={type} className="tw-w-full tw-mb-4 tw-rounded-3xl">
              <div className="tw-flex">
                <div className="tw-ml-4 tw-cursor-pointer" onClick={() => setContent(items[0].attributes.content)}>
                  <img className="tw-w-80 tw-rounded-2xl" src={content1?.attributes?.meta?.poster} />
                </div>
                <div className="tw-cursor-pointer" onClick={() => setContent(items[1].attributes.content)}>
                  <img className="tw-w-72 tw-rounded-2xl" src={content2?.attributes?.meta?.poster} />
                </div>
                <div>
                  <div className="tw-pt-5 tw-pr-4">
                    <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">نوع محتوا:</span>
                    <span className="tw-text-xl tw-font-bold">{typeNames[items[0].attributes.type]}</span>
                  </div>
                  <div className="tw-pt-5 tw-pr-4">
                    <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">مدت زمان:</span>
                    <span className="tw-text-xl tw-font-bold">{items[0].attributes.duration}</span>
                  </div>
                  <div className="tw-mt-8 tw-pt-5 tw-pr-4">
                    <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">تگ ها:</span>
                    <span className="tw-text-xl tw-font-bold">{contentTags.map((tag: any) => <Tag
                      key={tag}
                      className="tw-bg-gray-300 tw-text-white tw-px-3 tw-font-normal tw-rounded-full tw-text-base"
                    >{tags[tag]}</Tag>)}</span>
                  </div>
                  <div className="tw-mt-5 tw-mr-3">
                    <Button
                      onClick={() => setSelectPlant(!selectPlan)}
                      size="large"
                      className="hover:tw-bg-gray-200 hover:tw-text-gray-500 hover:tw-border-gray-100 tw-w-60 tw-h-14 tw-bg-gray-100 tw-border-gray-50 tw-text-gray-500 tw-rounded-full"
                      block
                    >
                      ویرایش
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        <ContentModal visible={selectPlan} onClose={() => setSelectPlant(false)} time={selectedDate} />
        <ContentDetail
          visible={!!selectedContent && !!content?.data}
          content={content?.data}
          onCancel={() => setContent(undefined)}
        />
      </div>
    </ParentDashboardLayout>
  );
};

DayPlan.guard = openGuard;

export default DayPlan;