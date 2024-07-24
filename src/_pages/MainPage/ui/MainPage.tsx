"use client";

import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { Populates } from "@/shared/types/populates";
import { BannerProduct } from "@/widgets/BannerProduct";
import { PopularProduct } from "@/widgets/PopularProduct";
import { ConfigProvider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

export function MainPage() {

  const { CurrentTheme } = useTheme();

  const fetchPopularProduct = async () => {
    const limit = 16;
    const data = await (await fetch(`/api/v1/populates/?limit=${limit}`,{cache:'force-cache'})).json() as Populates[];
    return data;
  };

  const [populates, setPopulates] = useState<Populates[]>([]);

  useEffect(() => {
    fetchPopularProduct().then((data) => {
      setPopulates(data);
    });
  }, []);

  if (populates.length === 0) {
    return <div>Загрузка...</div>;
  }



  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
            <Header />
            <HeaderMenu />
          </header>
          <section style={{ padding: '10px',height:'calc(100dvh+10px)' }}>
            {/* Место для баннера */}
            <BannerProduct />
            {/* Популярные продукты */}
            <PopularProduct populates={populates} /> 
          </section>
          <Footer/>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
