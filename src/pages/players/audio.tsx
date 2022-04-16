import React, { useState, useRef, ReactElement, useEffect } from "react";
// @ts-ignore
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";
import { PLAYERS_URL } from "../../core-team/constants";
import { useContent, useUpdateProgress } from "../../core-team/api/activity";
import { Result } from "antd";
import { useApp } from "@kidneed/hooks";

const Audio = () => {
  const { query } = useRouter();
  const interval = useRef<any>();
  const { url, child, id } = query;
  const { ctx } = useApp();
  const [remained, setRemained] = useState(0);
  const { data: content } = useContent(parseInt(id as string));
  const { mutateAsync: updateProgressRequest } = useUpdateProgress();

  const updateProgress = () => {
    interval.current = setInterval(() => {
      updateProgressRequest({ id, duration: 1 }).then((resp: any) => {
        setRemained(resp?.data?.duration - resp?.data?.progress);
      });
    }, 60000);
  };

  useEffect(() => {
    if (child) {
      updateProgress();
    }
  }, [child]);

  useEffect(() => {
    if (content?.data) {
      setRemained(content?.data?.attributes?.duration - content?.data?.attributes?.progress);
    }
  }, [content]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  if (remained < 0) {
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
