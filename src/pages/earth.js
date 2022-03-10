import { useState } from 'react'
import { Modal, Steps } from "antd";
import styles from 'earth/styles/earth.module.css'
import UserProfile from 'earth/components/userProfile'
import Image from 'next/image'
import SearchBox from 'earth/components/searchBox'
import Card from '../earth/components/card';
const Earth = () => {
  const { Step } = Steps;
  const [step, setStep] = useState(0);
  return (
    <div>
      <div>
        <div>
          <Steps current={step}>
            <Step title="موضوع" />
            <Step title="نشانه ها" />
            <Step title="ریشه ها" />
            <Step title="راهکار" />
          </Steps>
        </div>
        <UserProfile />
      </div>
      {step === 0 && <div>
        <SearchBox />
        <Card />
        <Modal
          title="راه چه"
          centered
          visible={true}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          className={styles.preShowModal}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>}
    </div>
  );
};

export default Earth;
Earth.guard = () => true