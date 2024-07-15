'use client'

import React from 'react';
import { ConfigProvider, Layout} from 'antd';

import { useTranslations } from 'next-intl';
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from '@/shared/hook/useTheme';
import { Footer } from '@/features/Footer';

const { Content } = Layout;

const LeaveRequestPage = () => {
  const t = useTranslations();

  return (<>
    <Content style={{ padding: '25px', display: 'flex', justifyContent: 'center',height:'100dvh' }}>
      leaveRequest
    </Content>
  </>)
};

export default function LeaveRequestPageProvider() {
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
          <LeaveRequestPage />
          </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
