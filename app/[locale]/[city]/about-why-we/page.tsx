'use client'

import React from 'react';
import { Typography, Card, Row, Col, Divider, Layout, ConfigProvider } from 'antd';
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { useTranslations } from 'next-intl';
import useTheme from '@/shared/hook/useTheme';
import { Footer } from '@/features/Footer';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const AboutWhyWePage = () => {

  const styleList = {
    listStyleType: 'square',
    padding: '10px',
    border: '1px solid #f0f0f0',
    borderRadius: '5px'
  }

  const t = useTranslations();

  return (<>
    <Content style={{ padding: '25px', display: 'flex', justifyContent: 'center',height:'100dvh' }}>
      <Row justify="center" style={{width:'50dvw'}} >
        <Col span={16}>
          <Card>
            <Typography>
              <Title level={5}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {t('pochemu-my-0')}
                </div>
              </Title>
              <Divider />
              <Paragraph>
                <ul>
                  <li style={styleList}><Text>{t('besplatnaya-dostavka-po-gorodu')}</Text></li>
                </ul>
              </Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
    </Content>
  </>)
};



export default function AboutWhyWePageProvider() {
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
          <AboutWhyWePage />
          </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}