import { Form, Slider } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import styles from "./AgeSlider.module.css";

interface AgeSliderProps {
    name: string;
    style?: React.CSSProperties;
}

export const AgeSlider: React.FC<AgeSliderProps> = (props) => {
    return (
        <div className={styles.ageSliderContainer} style={props.style}>
            <div className={styles.ageSlider}>
                <img
                    src="venus-baby-icon.svg"
                    style={{ justifySelf: "center" }}
                />
                <Form.Item
                    // rules={[{ required: true, message: "این فیلد الزامی است" }]}
                    style={{ marginBottom: 0 }}
                    name={props.name}
                >
                    <Slider
                        defaultValue={3}
                        min={3}
                        max={12}
                        step={3}
                        dots
                        tooltipVisible={false}
                    />  
                </Form.Item>
                <img
                    src="venus-adult-icon.svg"
                    style={{ justifySelf: "center" }}
                />
            </div>
            <div className={styles.ageSliderMarks}>
                <Text>۳</Text>
                <Text>۶</Text>
                <Text>۹</Text>
                <Text>۱۲</Text>
            </div>
        </div>
    );
};
