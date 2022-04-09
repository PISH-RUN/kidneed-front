import { Modal } from "antd";
import styles from "earth/styles/earth.module.css";
import { Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { PLAYERS_URL } from "../../constants";
import _ from "lodash";
import jMoment from "moment-jalaali";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const poster = content?.attributes?.meta?.poster;

  const openPlayer = () => {
    const playerType = content?.attributes?.type;
    let source = content?.attributes?.meta?.source && content?.attributes?.meta?.source[0].src;
    source = source ? source : content?.attributes?.srcFile;

    if(playerType === 'activity')
      router.push(`/players/activity?id=${content.id}`)
    else if (playerType === 'game')
      router.push(`/players/${playerType}?url=${encodeURIComponent(content?.attributes?.sourceUrl)}`)
    else if (source)
      router.push(`/players/${playerType}?url=${encodeURIComponent(source)}`)
  };

  return (
    <Modal
      footer={false}
      closable
      centered
      {...rest}
      className={styles.resultModal + " tw-rounded-3xl tw-overflow-hidden"}
    >
      <div className={styles.allContent}>
        <div className={styles.header}>
          {content?.attributes?.title}
        </div>
        <div className="tw-p-10">
          <div className="tw-flex tw-mb-2">
            <div
              className="tw-w-96 tw-ml-8 tw-relative tw-cursor-pointer tw-h-fit"
              onClick={openPlayer}
            >
              <img className="tw-w-96 tw-rounded-2xl" src={poster} alt="" />
              <div className="tw-absolute tw-rounded-2xl tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-top-0 tw-bg-gray-500 tw-bg-opacity-30">
                <FaPlay className="tw-text-white tw-w-24 tw-h-24" />
              </div>
            </div>
            <div className="tw-flex-1">
              <Typography variant="body1" className="!tw-mb-4 !tw-font-bold">خلاصه اثر</Typography>
              <Typography variant="body1">{content?.attributes?.description}</Typography>
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
            <Typography variant="body1" className="!tw-mb-4 !tw-font-bold !tw-mt-4">سایر اطلاعات</Typography>
            <div className="">
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">سال ساخت:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.productionYear?.solar && content?.attributes?.meta?.productionYear?.solar[0].name}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">کشور سازنده:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.factors?.country && _.map(content?.attributes?.meta?.factors?.country, "name").join("، ")}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">کارگردان:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.factors?.director && _.map(content?.attributes?.meta?.factors?.director, "name").join("، ")}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">نویسنده:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.factors?.genre && _.map(content?.attributes?.meta?.factors?.writer, "name").join("، ")}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">بازیگران:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.factors?.faces ? _.map(content?.attributes?.meta?.factors?.faces, "name").join("، ") : "-"}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">ژانر:</Typography>
                <Typography
                  variant="body1"
                >{content?.attributes?.meta?.factors?.genre && _.map(content?.attributes?.meta?.factors?.genre, "name").join("، ")}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">وضعیت دوبله:</Typography>
                <Typography
                  variant="body1"
                  className="!tw-w-40"
                >{content?.attributes?.meta?.dubbed ? content?.attributes?.meta?.dubbed[0].name : "-"}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">وضعیت زیرنویس:</Typography>
                <Typography
                  variant="body1"
                  className="!tw-w-40"
                >{content?.attributes?.meta?.productionYear?.subtitle ? content?.attributes?.meta?.productionYear?.subtitle[0].name : "-"}</Typography>
              </div>
              <div className="tw-flex tw-mb-2">
                <Typography variant="body1" className="!tw-w-40">مدت زمان فیلم:</Typography>
                <Typography
                  variant="body1"
                  className="!tw-w-40"
                >{jMoment.duration(content?.attributes?.meta?.duration, "minute").humanize()}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};