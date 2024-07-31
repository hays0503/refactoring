'use client'

import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from '@/shared/hook/useTheme';
import { Footer } from '@/features/Footer';

const { Content } = Layout;

const RewiewsPage = () => {

  return (<>
    <Content style={{ padding: '25px', display: 'flex', justifyContent: 'center',height:'100dvh' }}>
      RrewiewsPage
    </Content>
  </>)
};

export default function RewiewsPageProvider() {
  const { CurrentTheme } = useTheme();
  return (
    <>
      <ConfigProvider theme={CurrentTheme}>
        <Layout>
          <Content>
            <header>
              <Header />
              <HeaderMenu />
            </header>
            <section>
          <RewiewsPage />
          </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
