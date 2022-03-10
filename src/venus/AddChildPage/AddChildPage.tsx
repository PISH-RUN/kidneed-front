import React, { useState } from 'react';
import { AddChild } from 'venus/AddChild/AddChild';
import { Intro } from 'venus/Intro/Intro';
import { Quiz } from 'venus/Quiz/Quiz';
import { SelectWay } from 'venus/SelectWay/SelectWay';
import styles from "./AddChildPage.module.css";

export const AddChildPage: React.FC = () => {

    const [page, setPage] = useState<string>("intro")

    const pages: {[key: string]: JSX.Element} = {
        "intro": <Intro setPage={setPage} />,
        "addChild": <AddChild setPage={setPage} />,
        "selectWay": <SelectWay setPage={setPage} />,
        "quiz": <Quiz />,
    }

    return (
        <div className={styles.addChildPage}>
            {pages[page]}
        </div>
    )
}
