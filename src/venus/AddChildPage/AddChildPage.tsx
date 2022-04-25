import React, { useEffect, useState } from "react";
import { AddChild } from "venus/AddChild/AddChild";
import { Intro } from "venus/Intro/Intro";
import { Quiz } from "venus/Quiz/Quiz";
import { SelectWay } from "venus/SelectWay/SelectWay";
import styles from "./AddChildPage.module.css";
import { useRouter } from "next/router";
import { parseInt } from "lodash";

export const AddChildPage: React.FC = () => {
  const [page, setPage] = useState<string>("intro");
  const [way, setWay] = useState<string>();
  const router = useRouter();
  const { id: childId, step } = router.query;

  const setStep = (step: string, id?: number) => router.push(`/add-child?step=${step}${(id || childId) ? `&id=${id || childId}` : ""}`);

  const pages: { [key: string]: JSX.Element } = {
    "intro": <Intro setPage={() => setStep("add")} />,
    "addChild": <AddChild childId={parseInt(childId as string)} setPage={(id) => setStep("way", id)} />,
    "selectWay": <SelectWay setPage={() => setStep("quiz")} childId={parseInt(childId as string)} setWay={setWay} />,
    "quiz": <Quiz way={way} childId={parseInt(childId as string)} />
  };

  useEffect(() => {
    if (childId) {
      setPage("addChild");
    }
  }, [childId]);

  useEffect(() => {
    if (step && step === "add") {
      setPage("addChild");
    }
    if (step && step === "way") {
      setPage("selectWay");
    }
    if (step && step === "quiz") {
      setPage("quiz");
    }
  }, [step]);

  return (
    <div className={styles.addChildPage}>
      {pages[page]}
    </div>
  );
};
