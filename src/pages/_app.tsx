import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Protected } from "@kidneed/containers";
import { Guard } from "@kidneed/types";
import { ConfigProvider, notification } from "antd";
import FA from "antd/lib/locale/fa_IR";
import { AppContext, appMachine } from "@kidneed/context";
import { useInterpret } from "@xstate/react";
import { RecoilRoot } from "recoil";
import { TextsProvider } from "../core-team/hooks/use-texts";
import { isMobile } from "react-device-detect";
import { PWA_URL } from "../core-team/constants";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  guard?: Guard;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppPropsWithLayout) {
  const appService = useInterpret(appMachine);

  const getLayout = Component.getLayout ?? ((page) => page);
  const guard: Guard = Component.guard ?? (() => false);

  notification.config({
    placement: "bottomLeft"
  });

  if(isMobile) {
    window.location.href = PWA_URL;
  }

  return (
    <AppContext.Provider value={{ appService }}>
      <QueryClientProvider client={queryClient}>
        <TextsProvider>
          <ConfigProvider direction="rtl" prefixCls="ant" locale={FA}>
            <RecoilRoot>
              <Protected guard={guard}>
                {getLayout(<Component {...pageProps} />)}
              </Protected>
            </RecoilRoot>
          </ConfigProvider>
        </TextsProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
