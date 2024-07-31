"use server";

import React, { Suspense } from "react";
import { ConfigProvider, Layout } from "antd";

import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";

const { Content } = Layout;

const fetchCities = async () => {
  return [
    {
      id: 1,
      additional_data: {
        EN: "Petropavlovsk",
        KZ: "",
      },
      name_city: "Петропавловск",
    },
    {
      id: 2,
      additional_data: {
        EN: "Astana",
        KZ: "",
      },
      name_city: "Астана",
    },
  ];
};

export default async function LeaveRequestPageProvider({
  params,
}: {
  params: any;
}) {
  const { CurrentTheme } = useTheme();

  const Cities: iCity[] = await fetchCities();

  const currentCity: string =
    Cities.find((i) => i.additional_data["EN"] === params.city)?.name_city ||
    "Ошибка";

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
                <LeaveRequestPage />
              </Suspense>
            </section>
            <Footer />
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}

const LeaveRequestPage = () => {
  const t = useTranslations();

  return (
    <>
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
    </>
  );
};
