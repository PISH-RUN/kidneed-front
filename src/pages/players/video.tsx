import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import videojs from "video.js";
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "layouts/baseLayout";

const PlayerCSS = () => {
  return (
    <>
      <div>
        <video
          id="my-video"
          className="video-js vjs-theme-city"
          playsInline
          controls
          preload="auto"
          data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=IkOVe40Sy0U"}] }'
        ></video>
      </div>
    </>
  );
};

const Video = () => {
  const { query } = useRouter();
  const { url, thumbnail } = query;

  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(videoEl, {
      autoplay: false,
      sources: [
        {
          src: url as string,
          type: 'application/x-mpegURL'
        }
      ]
    });
    return () => {
      player.dispose();
    };
  }, [videoEl]);

  return (
    <div className="tw-justify-center tw-items-center tw-flex tw-w-full tw-h-screen tw-bg-sky-100">
      <video ref={onVideo} className="video-js" playsInline />
      <PlayerCSS />
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
