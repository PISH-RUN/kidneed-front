import React, { ReactElement, useRef } from "react";
// @ts-ignore
import ReactPlayer from 'react-player'
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";
import Activity from "./activity";

const Video = () => {
  const { query } = useRouter();
  const { url, thumbnail } = query;

  const time = useRef();
  const state = {
    video: {
      src: url,
      poster: thumbnail
    }
  };

  const onVideoTimeUpdate = (t: any) => {
    time.current = t;
  };

  return (
    <div className="tw-justify-center tw-items-center tw-flex tw-w-full tw-h-screen tw-bg-sky-100">
      <ReactPlayer url={url} />
    </div>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Video.guard = guard;
Video.getLayout = (children: ReactElement) => <BaseLayout>{children}</BaseLayout>;

export default Video;
