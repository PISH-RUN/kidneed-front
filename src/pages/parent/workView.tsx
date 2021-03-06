import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import _ from "lodash";
import Image from "next/image";
import { Guard } from "@kidneed/types";
import { ActivityStats, BarChart, MonthPicker, PieChart, PolarAreaChart } from "core-team/components";
import { useMemo, useState } from "react";
import jMoment from "moment-jalaali";
import { Box, Typography } from "@mui/material";
import { Button, Divider } from "antd";
import { useStats } from "../../core-team/api/dashboard";
import { useApp } from "@kidneed/hooks";
import { useGrowthFields, useGrowthSubFields, useQuizProgression, useQuizResult } from "../../core-team/api/question";
import pattern from "public/images/pattern.png";
import Link from "next/link";
import { useChildGrowthField } from "../../core-team/api/user";
import { useTexts } from "../../core-team/hooks/use-texts";

const today = jMoment();

const types: any = {
  video: "ویدیو",
  game: "بازی",
  activity: "فعالیت عملی",
  book: "کتاب",
  audio: "صوت"
};

const WorkView = () => {
  const [month, setMonth] = useState(today);
  const { ctx } = useApp();
  const { data: fields } = useGrowthFields();
  const { data: subFields } = useGrowthSubFields();
  const { data: result } = useQuizResult(ctx?.child?.id, month.jMonth(), month.jYear());
  const { data: childGrowthField } = useChildGrowthField(ctx?.child?.id);
  const { data: progression } = useQuizProgression(ctx?.child?.id);
  const { getText } = useTexts();
  const {
    data: stats,
    isLoading
  } = useStats([jMoment(month).startOf("jMonth"), jMoment(month).endOf("jMonth")], ctx.child?.id);

  const polarData = useMemo(() => {
    if (!result || !subFields) return {
      data: [],
      labels: []
    };

    const subFieldIds = Object.keys(result?.data?.startOfMonth?.result || result?.data?.endOfMonth?.result || {});
    const subFieldData = _.filter(subFields?.data, f => subFieldIds.indexOf(f.id.toString()) > -1);
    const polarData: number[] = [];
    const polarLabels: string[] = [];

    _.map(subFieldData, field => {
      result?.data?.startOfMonth && polarData.push(result?.data?.startOfMonth?.result[field.id]);
      result?.data?.endOfMonth && polarData.push(result?.data?.endOfMonth?.result[field.id]);

      polarLabels.push(field.attributes?.name);
      if (result?.data?.endOfMonth)
        polarLabels.push(field.attributes?.name);
    });

    return {
      data: polarData,
      labels: polarLabels
    };
  }, [result, subFields]);

  const getPieData = () => {
    if (!stats) return {
      data: [],
      labels: []
    };

    const sum = _.sum(_.map(stats?.data, s => s.progress));

    return {
      data: _.map(stats?.data, (i: any) => i.progress / sum * 100),
      labels: _.map(stats?.data, (i: any, type: string) => types[type])
    };
  };

  const getBarData = () => {
    if (!progression || !fields || !subFields) return {
      data: [],
      labels: []
    };

    const barData: any[] = [];
    const barLabels: string[] = [];
    const subData: any = {};

    _.map(progression?.data, (p, fieldId) => {
      let index = 0;
      _.map(p.subfields, (i: any) => {
        subData[index] = subData[index] || [];
        subData[index].push(i.percent);
        index += 1;
      });
    });

    const labels = [
      "مهارت اول",
      "مهارت دوم",
      "مهارت سوم",
      "مهارت چهارم"
    ];
    let index = 0;
    _.map(progression?.data, (p, fieldId) => {
      const field = _.find(fields?.data, f => f.id.toString() === fieldId);

      barLabels.push(field?.attributes?.name);

      barData.push({
        label: labels[index],
        data: subData[index]
      });
      index += 1;
    });

    return {
      data: barData,
      labels: barLabels
    };
  };

  return (
    <ParentDashboardLayout
      bp={0}
      bd="flex"
      showChild="header"
      Header={<MonthPicker disableFuture value={month} onChange={setMonth} />}
    >
      <Box sx={{ boxShadow: "0px 14px 17px rgba(0, 0, 0, 0.08)" }} className="tw-rounded-t-3xl tw-w-full">
        <div className="tw-py-10 tw-px-8 tw-rounded-t-3xl">
          <div className="tw-px-4">
            <Typography variant="h5" className="!tw-font-bold">حوزه انتخابی این ماه
              شما &rdquo;{childGrowthField?.data?.name || ""}&rdquo; می
              باشد</Typography>
            <Typography variant="body1" className="!tw-mt-4">
              در این ماه محتوای پیشنهادی یکودو برای فرزند شما متناسب با حوزه {childGrowthField?.data?.name || ""} می
              ‌باشد.
            </Typography>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8 tw-bg-white tw-rounded-t-3xl">
          <div className="tw-flex tw-w-full">
            <Box sx={{ width: 400 }} className="tw-mx-14">
              <PolarAreaChart
                data={polarData.data}
                labels={polarData.labels}
              />
            </Box>
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">نمودار ارزیابی مهارت‌های رشدی</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                {getText("karnamaGrowingWayDescription")}
              </Typography>
              <div className="tw-mt-10">
                <div className="tw-flex tw-mt-5">
                  <div className="tw-flex tw-ml-6">
                    <span className="tw-w-6 tw-h-6 tw-bg-blue-600 tw-ml-3" />
                    <div>
                      <Typography variant="body1" className="!tw-text-sm">نتایج آزمون اول ماه</Typography>
                    </div>
                  </div>
                  <div className="tw-flex">
                    <div className="tw-w-6 tw-h-6 tw-ml-3">
                      <Image src={pattern} className="tw-flex" />
                    </div>
                    <div>
                      <Typography variant="body1" className="!tw-text-sm">نتایج آزمون آخر ماه</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8">
          <div className="tw-flex tw-w-full">
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">فعالیت‌های انجام شده در این ماه</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                {getText("karnamaActivityReportDescription")}
              </Typography>
            </div>
            <Box sx={{ width: 400 }} className="tw-mx-14">
              <PieChart data={getPieData().data} labels={getPieData().labels} />
            </Box>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8 tw-bg-white">
          <ActivityStats stats={stats?.data} loading={isLoading} />
        </div>
        <div className="tw-py-10 tw-px-8">
          <div className="tw-flex tw-w-full">
            <Box className="tw-mx-14 tw-w-1/2">
              <BarChart data={getBarData().data} labels={getBarData().labels} />
            </Box>
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">نمودار حوزه های رشدی</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                {getText("karnamaStackedChartDescription")}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    </ParentDashboardLayout>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

WorkView.guard = guard;

export default WorkView;