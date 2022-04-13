import { Guard } from "@kidneed/types";
import React from "react";
import { Quiz } from "../../venus/Quiz/Quiz";
import { useApp } from "@kidneed/hooks";

const QuizPage = () => {
  const { ctx } = useApp();

  return (
    <div className="tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center">
      <Quiz way="" childId={ctx?.child?.id} type="endOfMonth" />
    </div>
  )
}

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

QuizPage.guard = guard;

export default QuizPage;