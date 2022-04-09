import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import styles from "./PrimaryButton.module.css";


export const PrimaryButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntButton {...props} className={`${styles.customBtn} ${props.className}`}>
            {props.children}
        </AntButton>
    )
}
