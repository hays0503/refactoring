'use client'

import React from 'react';
import { Typography, Card, Row, Col, Divider, Layout, ConfigProvider } from 'antd';
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { useTranslations } from 'next-intl';
import { Footer } from '@/features/Footer';
import useTheme from '@/shared/hook/useTheme';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const AboutPaysPage = () => {
  const styleList = {
    listStyleType: 'square',
    padding: '10px',
    border: '1px solid #f0f0f0',
    borderRadius: '5px'
  }
  const t = useTranslations();

  return (<>
    <Content style={{ padding: '25px', display: 'flex', justifyContent: 'center',height:'100dvh' }}>
      <Row justify="center">
        <Col span={16}>
          <Card>
            <Typography>
              <Title level={5}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {t('dostavka-v-cherte-goroda')}
                </div>
              </Title>
              <Divider />
              <Paragraph>
                <ul>
                  <li style={styleList}><Text>{t('oplata-nalichnymi-vozmozhna-lichno-v-ruki-kureru-pri-dostavke-na-dom-v-moment-polucheniya-zakaza')}</Text></li>
                  <li style={styleList}><Text>{t('oplata-proizvoditsya-isklyuchitelno-v-nacionalnoi-valyute')}</Text></li>
                  <li style={styleList}><Text>{t('v-podtverzhdenie-oplaty-my-vydaem-vam-tovarnyi-chek')}</Text></li>
                </ul>
              </Paragraph>
              <Divider />
              <Paragraph>
                <Title level={5}>{t('oplata-platezhnoi-kartoi-pri-poluchenii')}</Title>
                <ul>
                  <li style={styleList}><Text>
                    {t('oplata-platezhnoi-kartoi-kureru-internet-magazina-pri-dostavke-proizvoditsya-posredstvom-mobilnogo-bankovskogo-terminala')}
                  </Text></li>
                  <li style={styleList}><Text> {t('v-podtverzhdenie-oplaty-my-vydaem-vam-fiskalnyi-chek')}</Text></li>
                </ul>
              </Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
    </Content>
  </>)
};

export default function AboutPaysPageProvider() {
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
          <AboutPaysPage />
          </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}