import { Button, Typography } from "@mui/material";
import { IoCheckmarkCircle, IoWarning } from "react-icons/io5";
import {
  usePurchaseDetail,
} from "../../core-team/api/payment";
import { isMobile } from 'react-device-detect';
import BaseLayout from "../../layouts/baseLayout";
import logo from "../../landing/media/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Subscription = () => {
  const router = useRouter();
  const { data: purchase } = usePurchaseDetail(router.query.purchase);

  return (
    <BaseLayout>
      <>
        <div className="tw-bg-gray-50 tw-p-2 tw-px-10 tw-flex">
          <Image src={logo} alt="logo" />
        </div>
        <div className="tw-max-w-2xl tw-m-auto tw-border tw-mt-20 tw-rounded-xl">
          <div className="tw-flex tw-items-center tw-justify-center tw-py-8">
            {purchase?.status === "completed" &&
              <>
                <IoCheckmarkCircle
                  className="tw-text-green-500 tw-text-4xl tw-ml-2"
                />
                <Typography variant="h5">
                  خرید اشتراک با موفقیت انجام شد
                </Typography>
              </>
            }
            {purchase?.status !== "completed" &&
              <>
                <IoWarning
                  className="tw-text-red-500 tw-text-4xl tw-ml-2"
                />
                <Typography variant="h5">
                  خرید اشتراک با مشکل مواجه شد
                </Typography>
              </>
            }
          </div>
          <div className="tw-py-8 tw-flex tw-justify-center">
            {!isMobile && <Link href="/parent/dashboard">
              <Button variant="contained">
                بازگشت به داشبورد
              </Button>
            </Link>}
            {isMobile && <a href="https://pwa.yekodo.ir">
              <Button variant="contained">
                بازگشت به برنامه
              </Button>
            </a>}
          </div>
        </div>
      </>
    </BaseLayout>
  );
};

Subscription.guard = () => true;

export default Subscription;