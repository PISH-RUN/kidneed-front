import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function Book(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 64 64">
      <path
        d="M10.6667 52C10.6667 50.2319 11.3691 48.5362 12.6193 47.286C13.8696 46.0358 15.5652 45.3334 17.3334 45.3334H53.3334"
        stroke="#8CA3A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3334 5.33337H53.3334V58.6667H17.3334C15.5652 58.6667 13.8696 57.9643 12.6193 56.7141C11.3691 55.4638 10.6667 53.7682 10.6667 52V12C10.6667 10.2319 11.3691 8.53624 12.6193 7.286C13.8696 6.03575 15.5652 5.33337 17.3334 5.33337V5.33337Z"
        stroke="#8CA3A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default Book;
