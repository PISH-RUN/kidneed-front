import Title from "antd/lib/typography/Title";
import React from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import styles from "./Way.module.css";

interface WayProps {
    title: string;
    onClick?: () => void;
}

export const Way: React.FC<WayProps> = (props) => {
    return (
        <div onClick={props.onClick} className={styles.wayCardWrapper}>
            <Title style={{ fontSize: "16px" }}>{props.title}</Title>
            <PrimaryButton
                onClick={(e) => e.stopPropagation()}
                href="#"
                style={{ minWidth: "85px", height: "35px" }}
            >
                بیشتر بدانید
            </PrimaryButton>
        </div>
    );
};
