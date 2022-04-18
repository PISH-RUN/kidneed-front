import React, { useEffect, useState } from "react";
import { AddChild } from "venus/AddChild/AddChild";
import { Intro } from "venus/Intro/Intro";
import { Quiz } from "venus/Quiz/Quiz";
import { SelectWay } from "venus/SelectWay/SelectWay";
import styles from "./AddChildPage.module.css";
import { useRouter } from "next/router";

export const AddChildPage: React.FC = () => {
  const [page, setPage] = useState<string>("intro");
  const [way, setWay] = useState<string>();
  const router = useRouter();
  const { id: childId, step } = router.query;

  const setChildId = (id: number) => {
    router.push("/add-child?id=" + id);
  };

  const pages: { [key: string]: JSX.Element } = {
    "intro": <Intro setPage={setPage} />,
    "addChild": <AddChild setPage={setPage} setChildId={setChildId} />,
    "selectWay": <SelectWay setPage={setPage} childId={parseInt(childId as string)} setWay={setWay} />,
    "quiz": <Quiz way={way} childId={parseInt(childId as string)} />
  };

  useEffect(() => {
    if (childId) {
      setPage("selectWay");
    }
  }, [childId]);

  useEffect(() => {
    if (step && step === "add") {
      setPage("addChild");
    }
  }, [childId]);

  return (
    <div className={styles.addChildPage}>
      {pages[page]}
    </div>
  );
};
