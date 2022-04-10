import { Typography } from "@mui/material";
import _ from "lodash";
import jMoment from "moment-jalaali";

const AudioDetails = ({ data }: any) => (
  <div className="">
    {_.map(data, (value, key) => (
      typeof value === "string" && <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-52">{key}:</Typography>
        <Typography
          variant="body1"
        >{value}</Typography>
      </div>
    ))}
  </div>
);

export default AudioDetails;