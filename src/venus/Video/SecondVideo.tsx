import React from "react";
import styles from "./Video.module.css";
import { useTexts } from "../../core-team/hooks/use-texts";

export const SecondVideo: React.FC<{ style?: React.CSSProperties }> = (props) => {
  const { getText } = useTexts();

  return (
    <a href="#">
      <div style={props.style} className={styles.secondVideoContainer}>
        <iframe
          width="100%"
          className="tw-min-h-[300px]"
          src={`https://www.aparat.com/video/video/embed/videohash/${getText('growthFieldVideo')}/vt/frame`}
          allowFullScreen
        />
      </div>
    </a>
  );
};
