"use server";

import React, { Suspense } from 'react';
import { Typography, Card, Row, Col, Divider, Layout, ConfigProvider } from 'antd';
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { useTranslations } from 'next-intl';
import { Footer } from '@/features/Footer';
import useTheme from '@/shared/hook/useTheme';
import { iCity } from '@/shared/types/city';

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

export default async function AboutPaysPageProvider({ params }: { params: any }) {
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
          <AboutPaysPage />
          </Suspense>
          </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}