import ParentDashboardLayout from "layouts/parent-dashboard-layout";
import { Guard } from "@kidneed/types";
import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import SubjectStep from "./subject";
import { useRouter } from "next/router";
import SignStep from "./sign";
import RootStep from "./root";
import ResultStep from "./result";
import styles from "earth/styles/earth.module.css";
import { useTexts } from "../../../core-team/hooks/use-texts";

const steps = [
  "موضوع",
  "نشانه یابی",
  "ریشه یابی",
  "ارائه راهکار"
];

const Approach = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (router.query.step === 'result') {
      setStep(3);
    } else if (router.query.step === 'root') {
      setStep(2);
    } else if (router.query.step === 'sign') {
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
        {step === 0 && <SubjectStep />}
        {step === 1 && <SignStep />}
        {step === 2 && <RootStep />}
        {step === 3 && <ResultStep />}
      </div>
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