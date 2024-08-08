"use client";

import { ConfigProvider, Layout } from "antd";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";
import { Suspense } from "react";

const ReviewsPage = ({
  params,
  Cities,
  currentCity,
}: {
  params: any;
  Cities: iCity[];
  currentCity: string;
}) => {
  const { CurrentTheme } = useTheme();
  return (
    <>
      <ConfigProvider theme={CurrentTheme}>
        <Layout>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities} />
            <HeaderMenu city={currentCity} urlCity={params.city} />
          </header>
          <section>
            <Suspense>
              <div
                style={{
                  padding: "25px",
                  display: "flex",
                  justifyContent: "center",
                  height: "100dvh",
                }}
              >
                ReviewsPage
              </div>
            </Suspense>
          </section>
          <Footer params={params}/>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default ReviewsPage;
