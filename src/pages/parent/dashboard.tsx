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
import Image from "next/image";
import ImageCard1 from "public/images/parentCard/img1.png";
import ImageCard2 from "public/images/parentCard/img2.png";
import ImageCard3 from "public/images/parentCard/img3.png";
import EditIcon from "layouts/icons/edit";
import PsImage1 from "public/images/temp/ps1.png";
import PsImage2 from "public/images/temp/ps2.png";
import PsImage3 from "public/images/temp/ps3.png";
import AddIcon from "layouts/icons/add";
import AvatarWoman from "public/images/avatar-woman.png";
import ArrowDown from "layouts/icons/arrow-down";
import { Guard } from "@kidneed/types";
import React, { useEffect, useState } from "react";
import { DateRange } from "@mui/lab";
import { useActivity } from "../../core-team/api/activity";
import jMoment from "moment-jalaali";
import { useDashboard, useStats } from "../../core-team/api/dashboard";
import { ActivityStats } from "../../core-team/components";

const Schedule = (props: any) => {
  const { sum, data } = props;
  const { ctx, selectChild } = useApp();

  useEffect(() => {
    if (!ctx.child && ctx.children) {
      selectChild(ctx.children[0]);
    }
  }, [ctx]);

  return (
    <Paper sx={{ mt: 4, p: 3, boxShadow: "none", borderRadius: 8 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h4">برنامه امروز</Typography>
          <Typography variant="h5" sx={{ color: "#8CA3A5", mt: 2 }}>
            شامل مجموعا {sum} ساعت برنامه ریزی
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EditIcon />}
            sx={{
              color: "#8CA3A5",
              borderColor: "#8CA3A5!important",
              borderRadius: 3,
              height: 55
            }}
          >
            ویرایش
          </Button>
        </Box>
      </Stack>
      <Grid container sx={{ mt: 3 }}>
        {data && _.map(_.flatten(_.values(data)), (item: any, index: number) => (
          <Grid key={index} item xs={6} sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="flex-start" spacing={3}>
              <Box sx={{ width: 150 }}>
                {item.payload?.image && <Image src={item.payload?.image} />}
              </Box>
              <Box>
                <Typography variant="h5">{item.type}</Typography>
                <Typography variant="h6" sx={{ color: "#8CA3A5", mt: 1 }}>
                  {" "}
                  {item.subtitle}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          fullWidth
          size="large"
          sx={{
            borderRadius: 8,
            height: 56,
            mt: 2,
            color: "#8CA3A5",
            borderColor: "#8CA3A5",
            maxWidth: "60%",
            margin: "16px auto 0"
          }}
        >
          افزودن برنامه ای جدید
        </Button>
      </Box>
    </Paper>
  );
};

const SideDashboard = () => {
  return (
    <Box>
      <Box component="img" src="/images/pd-test.png" sx={{ px: 2 }} />
    </Box>
  );
};

const today: DateRange<Date> = [new Date(), new Date()];

const Dashboard = () => {
  const [range, setRange] = useState<DateRange<Date>>(today);
  const { ctx } = useApp();
  const { data } = useDashboard(ctx.child?.id);
  const { data: stats, isLoading } = useStats(range, ctx.child?.id);

  const sum = _.sumBy(_.flatten(_.values(data)), (i: any) => i.attributes?.duration);

  return (
    <ParentDashboardLayout SideComponent={<SideDashboard />} showChild showRange onRangeChange={setRange}>
      <Typography sx={{ mb: 2 }} variant="h4">
        سلام {ctx?.user?.name}! 👋
      </Typography>
      <ActivityStats stats={stats} loading={isLoading} />
      <Schedule sum={sum} data={data} />
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