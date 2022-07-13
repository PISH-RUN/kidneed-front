import React, { useState, useRef, ReactElement, useEffect } from "react";
// @ts-ignore
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";
import { PLAYERS_URL } from "../../core-team/constants";
import { useActivityDetail, useContent, useSeenContent, useUpdateProgress } from "../../core-team/api/activity";
import { Result } from "antd";
import { useApp } from "@kidneed/hooks";
import { parseInt } from "lodash";

const Audio = () => {
  const { query } = useRouter();
  const interval = useRef<any>();
  const { url, child, id, secondId, contentId } = query;
  const { ctx } = useApp();
  const [remained, setRemained] = useState(0);
  const { data: activity } = useActivityDetail(ctx?.child?.id, parseInt(id as string));
  const { data: activity2 } = useActivityDetail(ctx?.child?.id, parseInt(secondId as string));
  const { mutateAsync: updateProgressRequest } = useUpdateProgress();
  const { mutate: seenContent } = useSeenContent();

  const updateProgress = () => {
    interval.current = setInterval(() => {
      if(remained > 0) {
        updateProgressRequest({ id, duration: 1 }).then((resp: any) => {
          setRemained(resp?.data?.duration - (resp?.data?.progress + activity2?.data?.progress));
        });
      }
    }, 60000);
  };

  useEffect(() => {
    if (child) {
      updateProgress();
    }
  }, [child]);

  useEffect(() => {
    if (activity?.data && activity2?.data) {
      setRemained(activity?.data?.duration - (activity?.data?.progress + activity2?.data?.progress));
    }
  }, [activity, activity2]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (id && parseInt(id as string)) {
      seenContent(parseInt(id as string));
    }
  }, [id]);

  useEffect(() => {
    if (remained < 0) {
      clearInterval(interval.current);
    }
  }, [remained]);

  if (remained <= 0) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
        <Result
          status="404"
          title={`${ctx?.child?.name} عزیز`}
          subTitle="زمان شما به پایان رسیده است"

        />
      </div>
    );
  }

  return (
    <iframe src={`${PLAYERS_URL}/audio?url=${url as string}`} className='tw-w-full tw-h-screen' />
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Audio.guard = guard;
Audio.getLayout = (children: ReactElement) => <BaseLayout>{children}</BaseLayout>;

export default Audio;
