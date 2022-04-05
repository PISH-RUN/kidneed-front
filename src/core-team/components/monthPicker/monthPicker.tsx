import { FC } from "react";
import { Typography } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import jMoment from "moment-jalaali";
import { Moment } from "moment";

interface MonthPickerProps {
  value: Moment;
  onChange: (month: Moment) => void;
}

export const MonthPicker: FC<MonthPickerProps> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="tw-flex tw-px-3 tw-pr-6 tw-py-6 tw-items-center tw-justify-between">
      <div className="tw-flex">
        <FaChevronRight
          onClick={() => onChange(jMoment(value).add("month", -1))}
          className="tw-cursor-pointer tw-w-8 tw-h-8 tw-text-gray-500 tw-border-gray-500 tw-border-2 tw-rounded-full tw-p-2 tw-ml-4"
        />
        <Typography variant="h6">
          <span className="tw-font-bold tw-ml-2">{value.format("jMMMM")}</span>
          <span className="tw-text-gray-400">{value.format("jYYYY")}</span>
        </Typography>
        <FaChevronLeft
          onClick={() => onChange(jMoment(value).add("month", 1))}
          className="tw-cursor-pointer tw-w-8 tw-h-8 tw-text-gray-500 tw-border-gray-500 tw-border-2 tw-rounded-full tw-p-2 tw-mr-4"
        />
      </div>
    </div>
  )
};