import React from "react";
import styles from "./Video.module.css";

export const Video: React.FC<{style?: React.CSSProperties}> = (props) => {
    return (
        <a href="#">
            <div style={props.style} className={styles.videoContainer}>
            <div  dangerouslySetInnerHTML={{__html: '<style>.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/kiGHL/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>'}} />
            </div>
        </a>
    );
};
