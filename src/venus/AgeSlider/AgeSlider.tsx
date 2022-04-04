import { Form, Slider } from "antd";
import React from "react";
import styles from "./AgeSlider.module.css";

interface AgeSliderProps {
  value?: number,
  onChange?: (value: number) => void,
  style?: React.CSSProperties;
}

export const AgeSlider: React.FC<AgeSliderProps> = (props) => {
  return (
    <div className={styles.ageSliderContainer} style={props.style}>
      <div className="tw-flex">
        <img
          src="/venus-baby-icon.svg"
          className="tw-h-fit tw-pt-2 tw-ml-2"
          style={{ justifySelf: "center" }}
        />
        <div className="tw-flex-auto tw-relative tw-mx-2">
          <Slider
            defaultValue={3}
            min={3}
            max={12}
            step={3}
            dots
            marks={{
              3: "3",
              6: "6",
              9: "9",
              12: "12",
            }}
          />
        </div>
        <img
          src="/venus-adult-icon.svg"
          className="tw-h-fit tw-pt-2 tw-mr-2"
          style={{ justifySelf: "center" }}
        />
      </div>
    </div>
  );
};
