import { Typography } from "@mui/material";
import _ from "lodash";
import jMoment from "moment-jalaali";

const fields = [
  "تاریخ انتشار",
  "موضوع",
  "مترجم",
  "از"
]

const BookDetails = ({ data }: any) => (
  <div className="">
    {_.map(fields, (key) => (
      <div className="tw-flex tw-mb-2">
        <Typography variant="body1" className="!tw-w-36">{key}:</Typography>
        <Typography
          variant="body1"
        >{data[key]}</Typography>
      </div>
    ))}
  </div>
);

export default BookDetails;