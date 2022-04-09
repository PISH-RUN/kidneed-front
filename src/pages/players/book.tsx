import React, { useState, useRef, ReactElement, useEffect } from "react";
// @ts-ignore
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import BaseLayout from "../../layouts/baseLayout";
import { PLAYERS_URL } from "../../core-team/constants";
import { useUpdateProgress } from "../../core-team/api/activity";

const Book = () => {
  const { query } = useRouter();
  const interval = useRef<any>();
  const { url, child, id } = query;
  const { mutate: updateProgressRequest } = useUpdateProgress();

  const updateProgress = () => {
    interval.current = setInterval(() => {
      updateProgressRequest({ id, duration: 1 });
    }, 60000);
  };

  useEffect(() => {
    if (child) {
      updateProgress();
    }
  }, [child]);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <iframe src={`${PLAYERS_URL}/pdf?url=${url as string}`} className='tw-w-full tw-h-screen' />
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Book.guard = guard;
Book.getLayout = (children: ReactElement) => <BaseLayout>{children}</BaseLayout>;

export default Book;
