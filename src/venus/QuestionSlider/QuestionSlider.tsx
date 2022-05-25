import { Form, Slider } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import styles from "./QuestionSlider.module.css";

export const QuestionSlider = (props: any) => {
  return (
    <div className={styles.questionSliderContainer}>
      <Slider
        defaultValue={2}
        value={props.value}
        onChange={props.onChange}
        handleStyle={!props.value ? { backgroundColor: "#939393" } : {}}
        trackStyle={!props.value ? { backgroundColor: "#939393" } : {}}
        onAfterChange={props.onChange}
        min={1}
        max={4}
        marks={{
          1: "کم",
          2: "معمولی",
          3: "زیاد",
          4: <span className="tw-whitespace-nowrap">بیش از حد</span>
        }}
        tooltipVisible={false}
      />
    </div>
  );
};
