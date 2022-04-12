import { Form, Slider } from "antd";
import React, { useEffect } from "react";
import styles from "./AgeSlider.module.css";

interface AgeSliderProps {
  value?: number,
  onChange?: (value: number) => void,
  style?: React.CSSProperties;
}

export const AgeSlider: React.FC<AgeSliderProps> = (props) => {

  useEffect(() => {
    (!props.value && props.onChange) && props.onChange(3)
  }, [])

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
            tooltipVisible
            tooltipPlacement="bottom"
            defaultValue={props.value || 3}
            min={3}
            max={12}
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
