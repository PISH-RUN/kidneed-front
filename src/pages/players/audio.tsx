import React, { useState, useRef, ReactElement } from "react";
// @ts-ignore
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";
import { PLAYERS_URL } from "../../core-team/constants";

const Audio = () => {
  const { query } = useRouter();
  const { url } = query;

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
