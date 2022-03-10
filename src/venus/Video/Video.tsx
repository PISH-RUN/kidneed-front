import React from "react";
import styles from "./Video.module.css";

export const Video: React.FC<{style?: React.CSSProperties}> = (props) => {
    return (
        <a href="#">
            <div style={props.style} className={styles.videoContainer}>
                <div className={styles.videoBackground}></div>
                <img
                    src="venus-play-icon.svg"
                    className={styles.videoPlayBtn}
                ></img>
            </div>
        </a>
    );
};
