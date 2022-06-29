import styles from "../../../earth/styles/earth.module.css";
import { Modal, Typography as AntTypography } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
// @ts-ignore
import CircleControls from "react-player-circle-controls";
import "react-player-circle-controls/dist/styles.css";
import { API } from "../../constants";
import { Typography } from "@mui/material";
import { IoPause, IoPlay } from "react-icons/io5";
import { useTexts } from "../../hooks/use-texts";

const Player = ({ item, isPlaying, onPlay }: any) => {
  const player = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });

  const onSeek = (amount: any) => {
    if (player.current) {
      player.current.seekTo(amount, "fraction");
    }
  };

  useEffect(() => {
    if (!isPlaying && playing) {
      setPlaying(false);
    }
  }, [isPlaying, playing]);

  return (
    <>
      <ReactPlayer
        ref={player}
        url={`${API}${item.voice?.url}`}
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
        icon={playing ? <IoPause className="tw-text-white tw-text-3xl tw-m-3" /> :
          <IoPlay className="tw-text-white tw-text-3xl tw-m-3" />}
        iconColor="#fff"
        color="#C4C4C4"
        onTogglePlaying={() => {
          setPlaying(!playing);
          !playing && onPlay();
        }}
      />
    </>
  );
};

const Expandable = ({ text }: any) => {
  const [expand, setExpand] = useState(false);

  console.log(text);

  return (
    <>
      {text && expand ? text : text.substring(0, 250) + ' ...'}
      <div onClick={() => setExpand(!expand)} className="tw-text-blue-500 tw-text-sm tw-cursor-pointer">
        {expand ? "مشاهده کمتر" : "مشاهده بیشتر"}
      </div>
    </>
  )
};

export const ApproachModal = ({ data, ...rest }: any) => {
  const [playing, setPlay] = useState<boolean | number>(false);

  return (
    <Modal
      footer={false}
      closable={true}
      centered
      {...rest}
      destroyOnClose
      className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
    >
      <div className={styles.allContent}>
        <div className={styles.header}>
          راهکار
        </div>
        <div className="tw-flex tw-flex-col tw-p-5 tw-px-10">
          <div className={styles.movie}>
            <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
              <iframe
                src={`https://www.aparat.com/video/video/embed/videohash/${data?.data?.subject?.aparat}/vt/frame`}
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
          <div className="tw-mt-6">
            <Typography variant="body1">
              {data?.data?.subject?.solution}
            </Typography>
          </div>
          <div className="tw-mt-6 tw-overflow-y-auto tw-max-h-96">
            {data?.data && data?.data.approaches.map((item: any) => (
              <div className="tw-flex tw-items-center tw-mb-5" key={item.id}>
                <div key={item.id} className="tw-ml-4">
                  <Player item={item} isPlaying={playing === item.id} onPlay={() => setPlay(item.id)} />
                </div>
                <div>
                  <Typography variant="body1">
                    {item.title}
                  </Typography>
                  <Typography variant="caption">
                    <Expandable text={item.body} />
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};