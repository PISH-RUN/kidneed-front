import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function Activity(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 64 64">
      <path
        d="M32 58.6667C46.7276 58.6667 58.6667 46.7276 58.6667 32C58.6667 17.2724 46.7276 5.33337 32 5.33337C17.2724 5.33337 5.33337 17.2724 5.33337 32C5.33337 46.7276 17.2724 58.6667 32 58.6667Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3334 37.3334C21.3334 37.3334 25.3334 42.6667 32 42.6667C38.6667 42.6667 42.6667 37.3334 42.6667 37.3334"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 24H24.0267" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 24H40.0267" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

export default Activity;
