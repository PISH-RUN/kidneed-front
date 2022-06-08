import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { openGuard } from "@kidneed/utils";
import { Avatar, Button, Card, Tag, Tooltip } from "antd";
import ContentModal from "core-team/components/contentModal";
import { useActivityGlance, useContent, useContents, useTodayActivity } from "core-team/api/activity";
import { useApp } from "@kidneed/hooks";
import _ from "lodash";
import jMoment from "moment-jalaali";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment, { Moment } from "moment";
import { ContentDetail } from "core-team/components";
import VideoIcon from "../../layouts/icons/video";
import MusicIcon from "../../layouts/icons/music";
import ActivityIcon from "../../layouts/icons/activity";
import GameIcon from "../../layouts/icons/game";
import BookIcon from "../../layouts/icons/book";
import { useRouter } from "next/router";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const today = jMoment();

const typeNames: any = {
  video: "ویدئو",
  activity: "فعالیت عملی",
  book: "کتاب",
  game: "بازی",
  audio: "صوت"
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
    let day = jMoment().jMonth() === month.jMonth() ? jMoment(month) : jMoment(month).startOf("jMonth");
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
            onClick={() => {
              if (jMoment().jMonth() === jMoment(month).jMonth()) return;

              if (jMoment().jMonth() === jMoment(month).add("month", -1).jMonth()) {
                setDate(jMoment());
                props.onChangeDate(jMoment());
                setMonth(jMoment());
              } else {
                setDate(jMoment(jMoment(month).add("month", -1)).startOf("jMonth"));
                props.onChangeDate(jMoment(jMoment(month).add("month", -1)).startOf("jMonth"));
                setMonth(jMoment(jMoment(month).add("month", -1)));
              }
            }}
            className={`tw-cursor-pointer tw-w-8 tw-h-8 tw-text-gray-500 tw-border-gray-500 tw-border-2 tw-rounded-full tw-p-2 tw-ml-2 ${jMoment().jMonth() === jMoment(month).jMonth() ? "!tw-cursor-not-allowed !tw-border-gray-300 !tw-text-gray-300" : ""}`}
          />
          <FaChevronLeft
            onClick={() => {
              setDate(jMoment(jMoment(month).add("month", 1)).startOf("jMonth"));
              props.onChangeDate(jMoment(jMoment(month).add("month", 1)).startOf("jMonth"));
              setMonth(jMoment(jMoment(month).add("month", 1)));
            }}
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
              <div className="tw-text-center tw-w-[50px]">
                <Typography variant="h4">
                  <span className="tw-font-bold">{date.format("jDD")}</span>
                </Typography>
                <span className="tw-text-gray-400">{date.format("dddd")}</span>
              </div>
              <div className="tw-mr-4">
                <Typography
                  variant="body1"
                  className="tw-text-black"
                >{activities.count} برنامه</Typography>
                <Typography
                  variant="caption"
                  className="tw-text-gray-400"
                >{activities.duration === 0 ? "-" : `مجموع ${durationText}`}</Typography>
              </div>
            </div>
          );
        })}
      </Box>
    </div>
  );
};

const styles = {
  cardImage: {
    backgroundSize: "cover",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    border: "none",
    backgroundRepeat: "no-repeat",
    cursor: "pointer"
  }
};

const typeIcons: any = {
  "video": VideoIcon,
  "audio": MusicIcon,
  "activity": ActivityIcon,
  "game": GameIcon,
  "book": BookIcon
};

const ItemPic = ({ content, type }: any) => {
  const Icon = typeIcons[type];

  const getPoster = (content: any) => {
    return content?.attributes?.poster?.data?.attributes?.url;
  };

  if (getPoster(content)) {
    return <Box
      className="tw-w-full tw-h-full"
      sx={{
        ...styles.cardImage,
        backgroundImage: `url("${getPoster(content)}")`,
        backgroundSize: "cover"
      }}
    >
      <Avatar className="tw-w-full tw-h-full tw-rounded-2xl" src={getPoster(content)} />
    </Box>;
  }

  return (
    <Box sx={styles.cardImage} className="tw-items-center tw-flex tw-justify-center tw-w-full tw-h-full tw-rounded-2xl">
      {Icon && <Icon
        className={`tw-text-gray-400 !tw-w-28 !tw-h-28 ${type !== "game" && "!tw-fill-transparent"}`}
        style={{ stroke: "#8CA3A5" }}
      />}
    </Box>
  );
};

const ActivityTags = ({ contentTags }: any) => {
  const [showTags, setShowTags] = useState(false);

  return (
    <>
      {(showTags ? contentTags : contentTags.slice(0, 4)).map((tag: any) =>
        <Tag
          key={tag}
          className="tw-inline-block tw-cursor-pointer tw-bg-gray-300 tw-text-white tw-px-3 tw-font-normal tw-transition-all tw-rounded-full tw-text-base !tw-mb-1 hover:tw-max-w-[300px] tw-max-w-[110px] tw-text-ellipsis tw-overflow-hidden"
        >
          {tag}
        </Tag>
      )}
      {contentTags.length > 4 &&
        <div className="tw-inline-block">
          <span
            className="tw-text-blue-400 tw-cursor-pointer tw-text-base"
            onClick={() => setShowTags(!showTags)}
          >
            {showTags ? "بستن" : "بیشتر"}
          </span>
        </div>
      }
    </>
  );
};

const ActivityCard = ({ type, items, contents, onSelectContent, onEdit }: any) => {
  const dataItems = _.chunk(items, 2);

  return (
    <>
      {_.map(dataItems, (items: any) => {
        const content1 = _.find(contents?.data, i => i.id === parseInt(items[0].attributes.content));
        const content2 = items[1] ? _.find(contents?.data, i => i.id === parseInt(items[1].attributes.content)) : {};
        const contentTags1: string[] = [];
        const contentTags2: string[] = [];

        content1?.attributes?.content_tags?.data?.map((tag: any) => {
          tag?.attributes?.tags?.data?.map((tag: any) => {
            if (contentTags1.indexOf(tag?.attributes?.name) === -1 && tag?.attributes?.name) {
              contentTags1.push(tag?.attributes?.name);
            }
          });
        });

        content2?.attributes?.content_tags?.data?.map((tag: any) => {
          tag?.attributes?.tags?.data?.map((tag: any) => {
            if (contentTags2.indexOf(tag?.attributes?.name) === -1 && tag?.attributes?.name) {
              contentTags2.push(tag?.attributes?.name);
            }
          });
        });

        return (
          <Card key={type} className="tw-w-full tw-mb-4 tw-rounded-3xl">
            <div className="tw-flex" style={{ minHeight: 350 }}>
              <div className="tw-flex tw-flex-nowrap">
                <div
                  className="tw-ml-4 tw-w-60 tw-min-h-full tw-max-h-96 tw-cursor-pointer tw-border tw-rounded-2xl"
                  onClick={() => onSelectContent(items[0].attributes.content)}
                >
                  <ItemPic content={content1} type={items[0].attributes.type} />
                </div>
                <div
                  className="tw-ml-4 tw-w-60 tw-min-h-full tw-max-h-96 tw-cursor-pointer tw-border tw-rounded-2xl"
                  onClick={() => onSelectContent(items[1].attributes.content)}
                >
                  <ItemPic content={content2} type={items[1] && items[1].attributes.type} />
                </div>
              </div>
              <div className="tw-flex-auto">
                <div className="tw-pt-5 tw-pr-4">
                  <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">نوع محتوا:</span>
                  <span className="tw-text-xl tw-font-bold">{typeNames[items[0].attributes.type]}</span>
                </div>
                <div className="tw-pt-5 tw-pr-4">
                  <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">مدت زمان:</span>
                  <span className="tw-text-xl tw-font-bold">{moment.utc(moment.duration(items[0].attributes.duration, "minutes").as("milliseconds")).format("HH:mm")}</span>
                </div>
                {contentTags1.length > 0 && <div className="tw-mt-4 tw-pt-2 tw-pr-4">
                  <span className="tw-text-xl tw-flex tw-flex-wrap">
                    <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">تگ ها‌ی محتوا اول:</span>
                    <ActivityTags contentTags={contentTags1} />
                  </span>
                </div>}
                {contentTags2.length > 0 && <div className="tw-mt-4 tw-pt-2 tw-pr-4">
                  <span className="tw-text-xl tw-flex tw-flex-wrap">
                    <span className="tw-text-gray-400 tw-ml-3 tw-text-xl">تگ ها‌ی محتوا دوم:</span>
                    <ActivityTags contentTags={contentTags2} />
                  </span>
                </div>}
                <div className="tw-mt-5 tw-mr-3">
                  <Button
                    onClick={() => onEdit(items)}
                    size="large"
                    className="hover:tw-bg-gray-200 hover:tw-text-gray-500 hover:tw-border-gray-100 tw-w-60 tw-h-14 tw-bg-gray-100 tw-border-gray-50 tw-text-gray-500 tw-rounded-full"
                    block
                  >
                    تغییر برنامه
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

const DayPlan = () => {
  const router = useRouter();
  const { ctx } = useApp();
  const [selectPlan, setSelectPlan] = useState<any>(false);
  const [selectedDate, setDate] = useState(today);
  const [selectedContent, setContent] = useState();
  const { data: activities, isLoading, refetch, error } = useTodayActivity(ctx?.child?.id, selectedDate);
  const { data: content } = useContent(selectedContent);
  const { data: contents } = useContents(activities?.data?.map((i: any) => i.attributes.content));

  if (error && error?.error?.status === 406) {
    router.push("/parent/quiz?type=startOfMonth");
  }

  return (
    <ParentDashboardLayout
      showChild
      Header={
        <div className="tw-flex tw-justify-between tw-mt-4 tw-mb-3 tw-w-full">
          <Typography variant="h5" className="!tw-font-bold tw-flex tw-items-center">
            تمام
            برنامه‌های {jMoment(selectedDate).format("jDD jMMMM")} {jMoment().startOf("day").diff(selectedDate.startOf("day"), "days") === 0 && "(امروز)"}</Typography>
          <Button
            onClick={() => setSelectPlan(true)}
            className="tw-w-48 tw-h-12 tw-bg-blue-400 tw-text-white tw-rounded-full"
          >
            افزودن برنامه
          </Button>
        </div>
      }
      SideComponent={<SideComponent
        onChangeDate={(date: any) => setDate(date)}
      />}
    >
      <div className="tw-p-5">
        {isLoading && <div className="tw-text-center tw-py-10">
          <CircularProgress />
        </div>}
        {activities && _.map(_.groupBy(activities?.data, i => i.attributes.type), (items: any, type: string) => (
          <ActivityCard
            onSelectContent={setContent}
            onEdit={setSelectPlan}
            type={type}
            items={items}
            contents={contents}
          />
        ))}
        <ContentModal
          visible={selectPlan}
          activity={selectPlan}
          onClose={(added: boolean) => {
            if (added) {
              refetch();
            }
            setSelectPlan(false);
          }}
          time={selectedDate}
        />
        <ContentDetail
          visible={!!selectedContent && !!content}
          content={content?.data}
          onCancel={() => setContent(undefined)}
        />
      </div>
    </ParentDashboardLayout>
  );
};

DayPlan.guard = openGuard;

export default DayPlan;