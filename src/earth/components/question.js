
import { Radio } from 'antd';
import styles from 'earth/styles/earth.module.css'

const Question = (props) => {
    return (
        <div className={styles.questionBox}>
            <div className={styles.questionText}>{props.data.title}</div>
            <div className={styles.optionAnswer}>
                <Radio.Group onChange={(e) => props.onChange(e, props.data.id)} value={props.value}>
                    <Radio value={true}>بله</Radio>
                    <Radio value={false}>خیر</Radio>
                </Radio.Group>
            </div>
        </div>
    )
}
export default Question