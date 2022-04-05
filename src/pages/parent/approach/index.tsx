import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Guard } from "@kidneed/types";
import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import ApproachStep from "./approach";
import { useRouter } from "next/router";
import SignStep from "./sign";
import RootStep from "./root";
import ResultStep from "./result";
import styles from "earth/styles/earth.module.css";

const steps = [
  "موضوع",
  "نشانه ها",
  "ریشه ها",
  "راهکار"
];

const Approach = () => {
  const [modal, setModal] = useState(true);
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.query.root || router.query.root === '') {
      setStep(3);
    } else if (router.query.sign || router.query.sign === '') {
      setStep(2);
    } else if (router.query.id) {
      setStep(1);
    } else {
      setStep(0);
    }
  }, [router.query]);

  return (
    <ParentDashboardLayout
      showChild="header"
      Header={<Steps current={step} className="tw-mx-10">{steps.map(step => <Steps.Step
        key={step}
        title={step}
      />)}</Steps>}
    >
      <div className="tw-p-8">
        {step === 0 && <ApproachStep />}
        {step === 1 && <SignStep />}
        {step === 2 && <RootStep />}
        {step === 3 && <ResultStep />}
      </div>

      <Modal
        footer={false}
        closable={false}
        centered
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        className={styles.preShowModal + " tw-rounded-3xl tw-overflow-hidden"}
      >
        <div className={styles.allContent}>
          <div className={styles.header}>
            راه چه
          </div>
          <div className={styles.content}>
            <div className={styles.plan}>
              <div className={styles.text}>
                پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی
                کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و
                درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات فراغت و درسی کودک شما پلنت، تعیین برنامه هوشمند اوقات
                فراغت و درسی کودک شما
              </div>
              <div className={styles.buttons}>
                <div>
                  <button className={styles.continueBtn} onClick={() => setModal(false)} type="button">ادامه</button>
                </div>
                <div>
                  <button className={styles.backBtn} onClick={() => setModal(false)} type="button">بازگشت</button>
                </div>
              </div>
            </div>
            <div className={styles.movie}>
              <div className={styles.iframeDiv}><span style={{ display: "block", paddingTop: "57%" }}></span>
                <iframe
                  src="https://www.aparat.com/video/video/embed/videohash/7ZXqM/vt/frame"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ParentDashboardLayout>
  );
};

const guard: Guard = (matcher, ctx, router) => {
  if (matcher("guest")) {
    return false;
  }

  return true;
};

Approach.guard = guard;

export default Approach;