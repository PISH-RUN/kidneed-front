import { ReactElement, useEffect } from "react";
import { Guard } from "@kidneed/types";
import { Box, Button, Typography } from "@mui/material";
import BaseLayout from "layouts/baseLayout";
import { useRouter } from "next/router";
import { useContent, useSeenContent, useUpdateProgress } from "core-team/api/activity";

const Activity = () => {
  const { query, push } = useRouter();
  const { id, activity, child } = query;
  const { data: content, isLoading } = useContent(parseInt(id as string));
  const { mutateAsync: updateProgressRequest } = useUpdateProgress();
  const { mutate: seenContent } = useSeenContent();

  const poster = content?.data?.attributes?.meta?.poster;

  const handleFinish = () => {
    if (content?.data?.attributes?.duration && content?.data?.attributes?.duration > 0) {
      updateProgressRequest({ id, duration: content?.data?.attributes?.duration }).then(() => {
        push("/child/dashboard");
      });
    } else {
      push("/child/dashboard");
    }
  };

  useEffect(() => {
    if (activity && parseInt(activity as string)) {
      seenContent(parseInt(activity as string));
    }
  }, [activity]);

  return (
    <div className="tw-min-h-screen tw-flex tw-full tw-items-center tw-justify-center tw-bg-sky-100 tw-py-10">
      {isLoading && "در حال بارگذاری..."}
      {!isLoading && (
        <Box
          className="container tw-w-11/12 tw-rounded-3xl tw-overflow-hidden tw-bg-gray-100"
          sx={{ boxShadow: "0px 14px 17px rgba(0, 0, 0, 0.08)", borderRadius: 8 }}
        >
          <div className="header tw-p-10 tw-pb-9 tw-bg-gray-100">
            <Typography variant="h5" className="!tw-font-bold">{content?.data?.attributes.title}</Typography>
          </div>
          <Box sx={{ borderRadius: 8 }} className="content tw-bg-white tw-p-10">
            <div className="tw-flex tw-mb-2">
              <div
                className="tw-w-96 tw-ml-8 tw-relative tw-cursor-pointer"
              >
                <img className="tw-w-96 tw-rounded-2xl" src={poster} alt="" />
              </div>
              <div className="tw-flex-1">
                <Typography variant="body1" className="!tw-mb-4 !tw-font-bold">توضیحات</Typography>
                <Typography variant="body1">{content?.data?.attributes?.description}</Typography>
              </div>
            </div>
            <div>
              <video controls className="tw-w-full tw-h-96">
                <source
                  src={content?.data?.attributes?.attachments?.data && `https://${content?.data?.attributes?.attachments?.data[0].attributes?.url}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <br />
            <br />
            {child === "true" &&
              <div className="tw-flex tw-justify-center tw-w-full">
                <Button
                  variant="outlined"
                  className="!tw-rounded-full tw-w-40 !tw-ml-5"
                  onClick={() => push("/child/dashboard")}
                >علاقه ندارم</Button>
                <Button variant="contained" className="!tw-rounded-full tw-w-40" onClick={handleFinish}>بازی
                  کردم</Button>
              </div>}
          </Box>
        </Box>
      )}
    </div>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Activity.guard = guard;
Activity.getLayout = (children: ReactElement) => <BaseLayout>{children}</BaseLayout>;

export default Activity;