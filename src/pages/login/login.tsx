import { Guard } from "@kidneed/types";
import { Card } from "antd";
import MobileForm from "core-team/components/loginForm/mobileForm";
import Logo from "core-team/components/logo/logo";
import { useRouter } from "next/router";
import { useSendOtp } from "core-team/api";

const chars: any = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
};

const Login = () => {
  const { mutateAsync: requestOtp, isLoading } = useSendOtp();
  const router = useRouter();

  const handleMobileSubmit = ({ mobile }: any) => {
    requestOtp({
      mobile: mobile.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (c: string) => chars[c]),
    }).then(() => {
      router.push(`/login/verify?mobile=${mobile.replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (c: string) => chars[c])}${router.query.redirect ? `&redirect=${router.query.redirect}` : ""}`);
    });
  };

  return (
    <div id="login" className="tw-h-screen tw-bg-sky-100">
      <div className="tw-flex tw-flex-col tw-h-full tw-justify-center tw-items-center">
        <Logo />
        <div className="tw-mb-10 tw-text-gray-500">
          به یکودو خوش آمدید، ابتدا لطفا وارد شوید.
        </div>
        <Card className="tw-rounded tw-rounded-3xl tw-w-1/2 tw-max-w-lg tw-pb-16 tw-pt-10 tw-px-10">
          <MobileForm onSubmit={handleMobileSubmit} loading={isLoading} />
        </Card>
      </div>
    </div>
  );
};

export const loginGuard: Guard = (matcher, _, router) => {
  if (matcher("guest")) {
    return true;
  }

  router.push(router.query.redirect as string || "/parent");

  return false;
};

Login.guard = loginGuard;

export default Login;
