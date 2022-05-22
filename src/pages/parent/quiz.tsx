import { Guard } from "@kidneed/types";
import React, { useState } from "react";
import { Quiz } from "../../venus/Quiz/Quiz";
import { useApp } from "@kidneed/hooks";
import { useRouter } from "next/router";
import { parseInt } from "lodash";
import { SelectWay } from "../../venus/SelectWay/SelectWay";

const QuizPage = () => {
  const { ctx } = useApp();
  const { query } = useRouter();
  const [way, setWay] = useState<string>();

  let type = "endOfMonth";
  if(typeof query.type === 'string') {
    type = query.type;
  }

  return (
    <div className="tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center">
      {(ctx?.child?.id && !way) && <SelectWay setPage={() => null} childId={ctx?.child?.id} setWay={setWay} />}
      {way && <Quiz way="" childId={ctx?.child?.id} type={type} />}
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