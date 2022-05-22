import { Guard } from "@kidneed/types";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useApp } from "@kidneed/hooks";
import Logo from "core-team/components/logo/logo";
import { useState } from "react";
import TokenForm from "core-team/components/loginForm/tokenForm";
import { useLogin, useSendOtp } from "../../core-team/api";
import { useRouter } from "next/router";

const Verify = () => {
  const [state, setState] = useState();
  const { login } = useApp();
  const router = useRouter();
  const { mutateAsync: requestLogin, isLoading } = useLogin();
  const { mutateAsync: requestOtp, isLoading: otpLoading } = useSendOtp();

  const handleMobileSubmit = async ({ token }: any) => {
    const user = await requestLogin({ token, mobile: router.query.mobile });
    login(user);
    router.push(router.query.redirect as string || "/parent");
  };

  const handleRequestOtp = async () => {
    await requestOtp({ mobile: router.query.mobile });
    message.info("کد تایید ارسال شد.");
  };

  return (
    <div id="login" className="tw-h-screen tw-bg-sky-100">
      <div className="tw-flex tw-flex-col tw-h-full tw-justify-center tw-items-center">
        <Logo />
        <div className="tw-mb-10 tw-text-gray-500">
          به یکودو خوش آمدید، ابتدا لطفا وارد شوید.
        </div>
        <Card className="tw-rounded tw-rounded-3xl tw-w-1/2 tw-max-w-lg tw-pb-16 tw-pt-10 tw-px-10">
          <TokenForm
            loading={isLoading}
            otpLoading={otpLoading}
            requestOtp={handleRequestOtp}
            onSubmit={handleMobileSubmit}
          />
        </Card>
      </div>
    </div>
  );
};

export const loginGuard: Guard = (matcher, _, router) => {
  if (matcher("guest")) {
    return true;
  }

  router.push("/parent");

  return false;
};

Verify.guard = loginGuard;

export default Verify;
