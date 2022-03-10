import React, { useState } from 'react';
import { AddChild } from 'venus/AddChild/AddChild';
import { Intro } from 'venus/Intro/Intro';
import { Quiz } from 'venus/Quiz/Quiz';
import { SelectWay } from 'venus/SelectWay/SelectWay';
import styles from "./AddChildPage.module.css";

export const AddChildPage: React.FC = () => {

    const [page, setPage] = useState<string>("selectWay")
    const [childId, setChildId] = useState<number>()
    const [way, setWay] = useState<string>()

    const pages: {[key: string]: JSX.Element} = {
        "intro": <Intro setPage={setPage} />,
        "addChild": <AddChild setPage={setPage} setChildId={setChildId} />,
        "selectWay": <SelectWay setPage={setPage} childId={childId} setWay={setWay} />,
        "quiz": <Quiz way={way} childId={childId} />,
    }

    return (
        <div className={styles.addChildPage}>
            {pages[page]}
        </div>
    )
}
