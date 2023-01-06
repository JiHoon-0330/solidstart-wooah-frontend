// @refresh reload
import "@fontsource/noto-sans-kr/korean-300.css";
import "@fontsource/noto-sans-kr/korean-400.css";
import "@fontsource/noto-sans-kr/korean-500.css";
import "@fontsource/noto-sans-kr/korean-700.css";
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { TurboContext, TurboSolidResourceOptions } from "turbo-solid";
import Layout from "~/components/layout";
import "./root.css";

const configuration = {
  // Available configuration options:
  // https://erik.cat/post/turbo-solid-lightweight-asynchronous-data-management-for-solid#configuration
  refetchOnFocus: false,
  transition: false,
  refetchOnConnect: false,
  expiration: () => 1000 * 60 * 60,
} satisfies TurboSolidResourceOptions;

export default function Root() {
  return (
    <Html lang="ko">
      <Head>
        <Title>우아!(woo!ah!)</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <TurboContext.Provider value={configuration}>
          <Suspense>
            <ErrorBoundary>
              <Layout>
                <Routes>
                  <FileRoutes />
                </Routes>
              </Layout>
            </ErrorBoundary>
          </Suspense>
        </TurboContext.Provider>
        <Scripts />
      </Body>
    </Html>
  );
}
