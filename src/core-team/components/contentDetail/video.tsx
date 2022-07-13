import { Typography } from "@mui/material";
import _ from "lodash";
import jMoment from "moment-jalaali";
import moment from "moment";

const VideoDetails = ({ data }: any) => {
  const getDuration = (minutes: number) => {
    const progress = moment.duration(minutes, 'minute');
    const hour = progress.hours();
    const minute = progress.minutes();

    if((hour === 0 && minute === 0) || (!hour && !minute)) {
      return '0 دقیقه'
    }

    if(hour === 0) {
      return `${minute} دقیقه`
    }

    return `${hour} ساعت و ${minute} دقیقه`
  }

  return (
    <div className="">
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">نام انگلیسی:</Typography>
        <Typography
          variant="body1"
        >{data?.enTitle}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">سال ساخت:</Typography>
        <Typography
          variant="body1"
        >{data?.productionYear?.solar && data?.productionYear?.solar[0].name}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">کشور سازنده:</Typography>
        <Typography
          variant="body1"
        >{data?.factors?.country && _.map(data?.factors?.country, "name").join("، ")}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">کارگردان:</Typography>
        <Typography
          variant="body1"
        >{data?.factors?.director && _.map(data?.factors?.director, "name").join("، ")}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">نویسنده:</Typography>
        <Typography
          variant="body1"
        >{data?.factors?.genre && _.map(data?.factors?.writer, "name").join("، ")}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">بازیگران:</Typography>
        <Typography
          variant="body1"
        >{data?.factors?.faces ? _.map(data?.factors?.faces, "name").join("، ") : "-"}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">ژانر:</Typography>
        <Typography
          variant="body1"
        >{data?.factors?.genre && _.map(data?.factors?.genre, "name").join("، ")}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">وضعیت دوبله:</Typography>
        <Typography
          variant="body1"
          className="!tw-w-40"
        >{data?.dubbed ? data?.dubbed[0].name : "-"}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">وضعیت زیرنویس:</Typography>
        <Typography
          variant="body1"
          className="!tw-w-40"
        >{data?.productionYear?.subtitle ? data?.productionYear?.subtitle[0].name : "-"}</Typography>
      </div>
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-40">مدت زمان فیلم:</Typography>
        <Typography
          variant="body1"
          className="!tw-w-40"
        >{getDuration(data?.duration)}</Typography>
      </div>
    </div>
  );
};

export default VideoDetails;