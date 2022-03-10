import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function arrowDown(props) {
  return (
      <SvgIcon {...props} viewBox="0 0 10 6">
          <g fill="none">
            <path d="M1 1L5 5L9 1" stroke="#8CA3A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
      </SvgIcon>
  );
}
export default arrowDown;
