import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import styles from "./OutlinedButton.module.css";


export const OutlinedButton: React.FC<ButtonProps> = (props) => {
    return (
        <AntButton className={styles.customBtn} {...props}>
            {props.children}
        </AntButton>
    )
}
