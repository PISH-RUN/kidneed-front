import styles from "../../../earth/styles/earth.module.css";
import { Modal } from "antd";
import { useRef, useState } from "react";
import ReactPlayer from 'react-player';
// @ts-ignore
import CircleControls from 'react-player-circle-controls';
import 'react-player-circle-controls/dist/styles.css';
import { API } from "../../constants";
import { Typography } from "@mui/material";
import { IoPlay } from "react-icons/io5";

export const ApproachModal = ({ data, ...rest }: any) => {
  const player = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });

  const onSeek = (amount: any) => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  };


  return (
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
        <div className="tw-flex tw-flex-col tw-p-5 tw-px-10">
          <div className={styles.movie}>
            <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
              <iframe
                src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
          <div className="tw-mt-6">
            <Typography variant="body1">
              {data?.data && data?.data[0].body}
            </Typography>
          </div>
          <div className="tw-mt-6">
            {data?.data && data?.data.map((item: any) => (
              <div className="tw-flex tw-items-center" key={item.id}>
                <div key={item.id} className="tw-ml-4">
                  <ReactPlayer
                    ref={player}
                    url={`${API}${item.voice.url}`}
                    playing={playing}
                    height="0"
                    width="0"
                    onProgress={setPlayerState}
                    onEnded={() => setPlaying(false)}
                  />
                  <CircleControls
                    className={styles.voiceControls}
                    size={80}
                    played={playerState.played}
                    loaded={playerState.loaded}
                    playing={playing}
                    onSeek={onSeek}
                    icon={<IoPlay className="tw-text-white tw-text-3xl tw-m-3" />}
                    iconColor="#fff"
                    color="#C4C4C4"
                    onTogglePlaying={() => setPlaying(!playing)}
                  />
                </div>
                <div>
                  <Typography variant="body1">
                    {item.title}
                  </Typography>
                  <Typography variant="caption">
                    {item.body}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
};