import React from "react";
import styles from "./Video.module.css";

export const Video: React.FC = () => {
    return (
        <a href="#">
            <div className={styles.videoContainer}>
                <div className={styles.videoBackground}></div>
                <img
                    src="venus-play-icon.svg"
                    className={styles.videoPlayBtn}
                ></img>
            </div>
        </a>
    );
};
