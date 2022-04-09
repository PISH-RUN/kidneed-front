import React, { useState, useRef, ReactElement } from "react";
// @ts-ignore
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";

const Game = () => {
  const { query } = useRouter();
  const { url } = query;

  return (
    <iframe src={url as string} className='tw-w-full tw-h-screen' />
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Game.guard = guard;
Game.getLayout = (children: ReactElement) => <BaseLayout>{children}</BaseLayout>;

export default Game;
