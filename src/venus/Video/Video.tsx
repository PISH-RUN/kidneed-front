import React from "react";
import styles from "./Video.module.css";
import { useTexts } from "../../core-team/hooks/use-texts";

export const Video: React.FC<{ style?: React.CSSProperties }> = (props) => {
  const { getText } = useTexts();

  return (
    <a href="#">
      <div style={props.style} className={styles.videoContainer}>
        <iframe
          src={`https://www.aparat.com/video/video/embed/videohash/${getText("yekodoIntroduceVideo")}/vt/frame`}
          allowFullScreen
        />
      </div>
    </a>
  );
};
