import { Form, Slider } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import styles from "./QuestionSlider.module.css";

interface QuestionSliderProps {
    label: string;
    name: string;
}

export const QuestionSlider: React.FC<QuestionSliderProps> = (props) => {
    return (
        <div className={styles.questionSliderContainer}>
            <Form.Item rules={[{ required: true, message: "این فیلد الزامی است" }]} label={props.label} style={{marginBottom: 0}} name={props.name}>
                <Slider min={1} max={4} dots tooltipVisible={false} />
            </Form.Item>
            <div className={styles.questionSliderMarks}>
                <Text>کم</Text>
                <Text>معمولی</Text>
                <Text>زیاد</Text>
                <Text>بیش از حد</Text>
            </div>
        </div>
    )
}
