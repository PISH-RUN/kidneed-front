import { Modal } from "antd";
import styles from "earth/styles/earth.module.css";
import { Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/router";
import VideoDetails from "./video";
import AudioDetails from "./audio";
import BookDetails from "./book";
import { POSTER_ORIGIN } from "../../constants";
import { CloseOutlined } from "@ant-design/icons";

const tags: any = {
  A: "رشدی حرکتی",
  B: "رشدی شناختی",
  C: "رشدی هیجانی",
  D: "رشد اجتماعی-اخلاقی"
};

const ageCategory: any = {
  3: "برای کودکان 3 تا 7 سال",
  8: "برای کودکان 8 تا 12 سال"
};

export const ContentDetail = (props: any) => {
  const { content, ...rest } = props;

  let poster = content?.attributes?.meta?.verticalPoster && `${POSTER_ORIGIN}${content?.attributes?.meta?.verticalPoster[0].url}`;
  poster = poster || content?.attributes?.meta?.img || content?.attributes?.meta?.poster
  poster = poster || (content?.attributes?.images?.data && content?.attributes?.images?.data[0]?.attributes?.url);

  const openPlayer = () => {
    const playerType = content?.attributes?.type;
    let source = content?.attributes?.meta?.source && content?.attributes?.meta?.source[0].src;
    source = source ? source : content?.attributes?.srcFile;

    if (playerType === "video")
      window.open(`${location.origin}/players/video?url=${encodeURIComponent(content?.attributes.sourceUrl)}`, '_blank');
    else if (playerType === "video" && content?.attributes?.attachments?.data)
      window.open(`${location.origin}/players/video?url=${encodeURIComponent(content?.attributes?.attachments?.data[0].url)}`, '_blank');
    else if (playerType === "activity")
      window.open(`${location.origin}/players/activity?id=${content.id}`, '_blank');
    else if (playerType === "game")
      window.open(`${location.origin}/players/${playerType}?url=${encodeURIComponent(content?.attributes?.sourceUrl)}`, '_blank');
    else if (playerType === "book")
      window.open(`${location.origin}/players/${playerType}?url=${encodeURIComponent(content?.attributes?.attachments?.data[0].url)}`, '_blank');
    else if (source)
      window.open(`${location.origin}/players/${playerType}?url=${encodeURIComponent(source)}`, '_blank');
  };

  return (
    <Modal
      footer={false}
      closable={false}
      centered
      {...rest}
      className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
    >
      <div className={styles.allContent}>
        <CloseOutlined className="tw-absolute tw-left-5 tw-text-2xl tw-top-8 tw-text-gray-500 tw-cursor-pointer" onClick={props.onCancel} />
        <div className={styles.header}>
          {content?.attributes?.title}
        </div>
        <div className="tw-p-10">
          <div className="tw-flex tw-mb-2">
            <div
              className="tw-w-80 tw-ml-8 tw-relative tw-cursor-pointer tw-h-fit"
              onClick={openPlayer}
            >
              <img className="tw-w-80 tw-rounded-2xl" src={poster} alt="" />
              <div className="tw-absolute tw-rounded-2xl tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-top-0 tw-bg-gray-500 tw-bg-opacity-30">
                <FaPlay className="tw-text-white tw-w-24 tw-h-24" />
              </div>
            </div>
            <div className="tw-flex-1">
              <Typography variant="body1" className="!tw-mb-4 !tw-font-bold">توضیحات</Typography>
              <Typography variant="body1">
                {content?.attributes?.meta?.fields?.detail?.value || content?.attributes?.meta?.description || content?.attributes?.description}
              </Typography>
              {content?.attributes?.editions?.data.length > 0 && <>
                <Typography variant="body1" className="!tw-mb-4 !tw-mt-4 !tw-font-bold">برچسب ها</Typography>
                <div className="tw-flex tw-mb-2">
                  {content?.attributes?.editions && content?.attributes?.editions?.data?.map((edition: any) => (
                    <Typography
                      key={edition.id}
                      variant="body1"
                      className="tw-whitespace-nowrap !tw-ml-4 tw-mb-4 !tw-font-bold tw-text-blue-900 tw-p-3 tw-rounded-lg tw-border tw-border-gray-300"
                    >{tags[edition?.attributes?.tag]}</Typography>
                  ))}
                </div>
              </>}
              <Typography variant="body1" className="!tw-mb-4 !tw-mt-4 !tw-font-bold">مناسب برای</Typography>
              <Typography variant="body1">{ageCategory[content?.attributes?.ageCategory]}</Typography>
            </div>
          </div>
          <div className="tw-mt-10">
            {["game", "activity"].indexOf(content?.attributes?.type) === -1 &&
              <Typography variant="body1" className="!tw-mb-4 !tw-font-bold !tw-mt-4">سایر اطلاعات</Typography>}
            {(content?.attributes?.type === "video" && content?.attributes?.meta) &&
              <VideoDetails data={content?.attributes?.meta} />}
            {(content?.attributes?.type === "audio" && content?.attributes?.meta) &&
              <AudioDetails data={content?.attributes?.meta} />}
            {(content?.attributes?.type === "book" && content?.attributes?.meta) &&
              <BookDetails data={content?.attributes?.meta} />}
          </div>
        </div>
      </div>
    </Modal>
  );
};