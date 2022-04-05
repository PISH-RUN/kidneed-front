import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Guard } from "@kidneed/types";
import { ActivityStats, BarChart, MonthPicker, PieChart, PolarAreaChart } from "core-team/components";
import { useState } from "react";
import jMoment from "moment-jalaali";
import { Box, Typography } from "@mui/material";
import { Button, Divider } from "antd";
import { useStats } from "../../core-team/api/dashboard";
import { useApp } from "@kidneed/hooks";

const today = jMoment();

const WorkView = () => {
  const [month, setMonth] = useState(today);
  const { ctx } = useApp();
  const { data: stats, isLoading } = useStats([jMoment(month).startOf('jMonth'), jMoment(month).endOf('jMonth')], ctx.child?.id);

  return (
    <ParentDashboardLayout
      bp={0}
      bd="flex"
      showChild="header"
      Header={<MonthPicker value={month} onChange={setMonth} />}
    >
      <Box sx={{ boxShadow: "0px 14px 17px rgba(0, 0, 0, 0.08)" }} className="tw-rounded-t-3xl tw-w-full">
        <div className="tw-py-10 tw-px-8 tw-rounded-t-3xl">
          <div className="tw-px-4">
            <Typography variant="h5" className="!tw-font-bold">حوزه انتخابی این ماه شما &rdquo;حوزه حرکتی&rdquo; می
              باشد</Typography>
            <Typography variant="body1" className="!tw-mt-4">فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
              100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
              نمایید.</Typography>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8 tw-bg-white tw-rounded-t-3xl">
          <div className="tw-flex tw-w-full">
            <Box sx={{ width: 400 }} className="tw-mx-14">
              <PolarAreaChart data={[10, 20, 30, 80]} labels={["شناختی", "هوشی", "اخلاقی", "حرکتی"]} />
              <div className="tw-flex tw-mt-5 tw-justify-center">
                <div className="tw-flex tw-ml-6">
                  <span className="tw-w-6 tw-h-6 tw-bg-blue-600 tw-ml-3" />
                  <div>
                    <Typography variant="body1" className="!tw-text-sm">نتایج آزمون اول</Typography>
                    <Typography variant="caption" className="!tw-text-gray-400">آزمون دوره اول</Typography>
                  </div>
                </div>
                <div className="tw-flex">
                  <span className="tw-w-6 tw-h-6 tw-bg-pink-600 tw-ml-3" />
                  <div>
                    <Typography variant="body1" className="tw-text-sm">نتایج آزمون اول</Typography>
                    <Typography variant="caption" className="tw-text-sm">آزمون دوره اول</Typography>
                  </div>
                </div>
              </div>
            </Box>
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">حوزه های رشدی</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
              </Typography>
              <div className="tw-mt-10">
                <Button type="primary" className="tw-h-10 tw-w-40 tw-ml-5 tw-rounded-full tw-bg-blue-400">
                  آزمون اول ماه
                </Button>
                <Button className="tw-h-10 tw-w-40 tw-ml-5 tw-rounded-full tw-bg-gray-400 tw-border-gray-500 tw-text-white">
                  آزمون آخر ماه
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8">
          <div className="tw-flex tw-w-full">
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">قالب فعالیت ها</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
              </Typography>
            </div>
            <Box sx={{ width: 400 }} className="tw-mx-14">
              <PieChart data={[10, 20, 30, 80]} labels={["شناختی", "هوشی", "اخلاقی", "حرکتی"]} />
            </Box>
          </div>
        </div>
        <div className="tw-py-10 tw-px-8 tw-bg-white">
          <ActivityStats stats={stats} loading={isLoading} />
        </div>
        <div className="tw-py-10 tw-px-8">
          <div className="tw-flex tw-w-full">
            <Box className="tw-mx-14 tw-w-1/2">
              <BarChart data={[10, 20, 30, 80]} labels={["شناختی", "هوشی", "اخلاقی", "حرکتی"]} />
            </Box>
            <div className="tw-px-14 tw-py-5 tw-flex-1">
              <Typography variant="h5" className="!tw-font-bold">قالب فعالیت ها</Typography>
              <Typography variant="body1" className="!tw-mt-4">
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
                فرزند شما تا کنون 85٪ پایبندی به برنامه داشته و توانسته
                100٪ جوایز مشخص شده را بدست آورد. شما میتوانید خلاصه فعالیت های کودک خود را در زیر مشاهده
                نمایید.
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