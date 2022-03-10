import React from "react";
import styles from "./ContentWrapper.module.css";

interface ContentWrapperProps {
    title: string;
    contentStyle?: React.CSSProperties
}

export const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.title}>{props.title}</div>
            <div style={props.contentStyle} className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}
