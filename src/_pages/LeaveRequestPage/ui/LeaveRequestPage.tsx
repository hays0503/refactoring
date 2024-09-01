"use client"

import React, { Suspense } from "react";
import { ConfigProvider, Layout } from "antd";

import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";
import { FooterMobile } from "@/features/FooterMobile";

const { Content } = Layout;

export default function LeaveRequestPage({
  params,
  Cities,
  currentCity,
}: {
  params: any;
  Cities: iCity[];
  currentCity: string;
}) {
  const t = useTranslations();

  const { CurrentTheme } = useTheme();

  return (
    <>
      <ConfigProvider theme={CurrentTheme}>
        <Layout>
          <Content>
            <header>
              <Header
                params={params}
                currentCity={currentCity}
                Cities={Cities}
              />
              <HeaderMenu city={currentCity} urlCity={params.city} />
            </header>
            <section>
              <Suspense>
                <Content
                  style={{
                    padding: "25px",
                    display: "flex",
                    justifyContent: "center",
                    height: "100dvh",
                  }}
                >
                  leaveRequest
                </Content>
              </Suspense>
            </section>
            <Footer params={params}/>
            <FooterMobile params={params} />
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
