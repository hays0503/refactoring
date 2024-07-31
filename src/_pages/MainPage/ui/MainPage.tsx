"use client";

import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { iCity } from "@/shared/types/city";
import { Products } from "@/shared/types/products";
import { BannerProduct } from "@/widgets/BannerProduct";
import { PopularProduct } from "@/widgets/PopularProduct";
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export function MainPage({
  params,
  Cities,
  populates,
}: {
  params: any;
  Cities: iCity[];
  populates: Products[];
}) {
  const { CurrentTheme } = useTheme();

  const currentCity:string = Cities.find((i) => i.additional_data['EN'] === params.city)?.name_city||"Ошибка";
 
  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header />
            <HeaderMenu city={currentCity} urlCity={params.city}/>
          </header>
          <section style={{ padding: "10px", height: "calc(100dvh+10px)" }}>
            {/* Место для баннера */}
            <BannerProduct />
            {/* Популярные продукты */}
            <PopularProduct city={currentCity} urlCity={params.city} populates={populates} />
          </section>
          <Footer />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
