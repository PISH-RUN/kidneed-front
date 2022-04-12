import styles from "../../../earth/styles/earth.module.css";
import { Modal } from "antd";

export const ApproachModal = ({ data, ...rest }: any) => (
  <Modal
    footer={false}
    closable={true}
    centered
    {...rest}
    className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
  >
    <div className={styles.allContent}>
      <div className={styles.header}>
        {data?.data && data?.data[0].title}
      </div>
      <div className={styles.content}>
        <div className={styles.plan}>
          <div className={styles.text}>
            {data?.data && data?.data[0].body}
          </div>
        </div>
        <div className={styles.movie}>
          <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
            <iframe
              src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame"
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);