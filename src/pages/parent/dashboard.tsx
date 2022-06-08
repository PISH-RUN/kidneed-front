import { useApp, useUser } from "@kidneed/hooks";
import {
  Typography,
  Box,
  Stack,
  Grid,
  Rating,
  Avatar,
  Paper,
  Button,
  IconButton
} from "@mui/material";
import _ from "lodash";
import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import EditIcon from "layouts/icons/edit";
import { Guard } from "@kidneed/types";
import React, { useEffect, useState } from "react";
import { DateRange } from "@mui/lab";
import { useActivity, useActivityStats, useContent, useContents } from "../../core-team/api/activity";
import { useDashboard, useStats } from "../../core-team/api/dashboard";
import { ActivityStats, ContentDetail } from "../../core-team/components";
import moment from "moment";
import { useRouter } from "next/router";
import { POSTER_ORIGIN } from "../../core-team/constants";
import VideoIcon from "../../layouts/icons/video";
import MusicIcon from "../../layouts/icons/music";
import ActivityIcon from "../../layouts/icons/activity";
import GameIcon from "../../layouts/icons/game";
import BookIcon from "../../layouts/icons/book";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const titles: any = {
  "video": "تماشای فیلم",
  "game": "بازی",
  "book": "خواندن داستان",
  "audio": "شنیدن داستان",
  "activity": "فعالیت عملی"
};

const Schedule = (props: any) => {
  const { sum, data, contents, isLoading } = props;
  const router = useRouter();
  const [selectedContent, setContent] = useState();
  const { data: content } = useContent(selectedContent);

  return (
    <Paper sx={{ mt: 4, p: 3, boxShadow: "none", borderRadius: 8 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h4">برنامه امروز</Typography>
          <Typography variant="h5" sx={{ color: "#8CA3A5", mt: 2 }}>
            شامل مجموعا {moment.duration(sum, "minute").humanize()} برنامه ریزی
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EditIcon />}
            onClick={() => router.push("/parent/dayPlan")}
            sx={{
              color: "#8CA3A5",
              borderColor: "#8CA3A5!important",
              borderRadius: 3,
              height: 55
            }}
          >
            تغییر برنامه
          </Button>
        </Box>
      </Stack>
      {isLoading &&
        <div className="tw-min-h-[150px] tw-flex tw-items-center tw-justify-center">
          <LoadingOutlined className="tw-text-blue-500 tw-text-4xl" />
        </div>
      }
      {!isLoading && <Grid container sx={{ mt: 5 }}>
        {data && _.map(_.flatten(_.values(data)), (item: any, index: number) => {
          const content = _.find(contents?.data, { id: parseInt(item.attributes?.content) });

          return (
            <Grid key={index} item xs={6} sx={{ mb: 3 }}>
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={3}
                className="tw-cursor-pointer"
                onClick={() => setContent(item.attributes?.content)}
              >
                <Box sx={{ width: 80, height: 80 }}>
                  <ItemPic content={content} type={item.attributes?.type} />
                </Box>
                <Box>
                  <Typography variant="body1">{titles[item.attributes?.type]}</Typography>
                  <Typography variant="caption" sx={{ color: "#8CA3A5", mt: 1 }}>
                    {" "}
                    {content?.attributes?.title}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          );
        })}
      </Grid>}

      <ContentDetail
        visible={!!selectedContent && !!content}
        content={content?.data}
        onCancel={() => setContent(undefined)}
      />
    </Paper>
  );
};

const SideDashboard = () => {
  return (
    <Box>
      <Link href="/parent/workView">
        <Box className="tw-cursor-pointer" component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
      </Link>
    </Box>
  );
};

const today: DateRange<Date> = [new Date(), new Date()];

const typeIcons: any = {
  "video": VideoIcon,
  "audio": MusicIcon,
  "activity": ActivityIcon,
  "game": GameIcon,
  "book": BookIcon
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
    />;
  }

  return (
    <Box sx={styles.cardImage} className="tw-items-center tw-flex tw-justify-center tw-w-full tw-h-full tw-rounded-2xl">
      {Icon && <Icon
        className={`tw-text-gray-400 !tw-w-12 !tw-h-12 ${type !== "game" && "!tw-fill-transparent"}`}
        style={{ stroke: "#8CA3A5" }}
      />}
    </Box>
  );
};

const Dashboard = () => {
  const router = useRouter();
  const [range, setRange] = useState<DateRange<Date>>(today);
  const { ctx } = useApp();
  const { data, isLoading: loading, error } = useDashboard(ctx.child?.id);
  const { data: contents } = useContents(_.map(_.flatten(_.values(data?.data)), i => parseInt(i?.attributes?.content)));
  const { data: stats, isLoading } = useActivityStats(range, ctx.child?.id);

  const sum = _.sumBy(_.flatten(_.values(data?.data)), (i: any) => i.attributes?.duration);

  if (error && error?.error?.status === 406) {
    router.push("/parent/quiz?type=startOfMonth");
  }

  return (
    <ParentDashboardLayout SideComponent={<SideDashboard />} showChild showRange onRangeChange={setRange}>
      <Typography sx={{ mb: 2 }} variant="h4">
        سلام {ctx?.user?.name}! 👋
      </Typography>
      <ActivityStats stats={stats?.data} loading={isLoading} />
      <Schedule sum={sum} data={data?.data} contents={contents} isLoading={loading} />
    </ParentDashboardLayout>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Dashboard.guard = guard;

export default Dashboard;