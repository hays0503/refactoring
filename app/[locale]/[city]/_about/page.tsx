"use server";

import React, { Suspense } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Divider,
  Layout,
  ConfigProvider,
} from "antd";
import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import Image from "next/image";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
  const t = useTranslations();
  const styleList = {
    listStyleType: "square",
    padding: "10px",
    border: "1px solid #f0f0f0",
    borderRadius: "5px",
  };
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
        <Row justify="center">
          <Col span={16}>
            <Card>
              <Typography>
                <Title level={5}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {t("sck-s-and-k-shopping-center-of-kazakhstan")}
                    <Image src="/logo.svg" alt="SCK" width={200} height={200} />
                  </div>
                </Title>
                <Divider />
                <Paragraph>
                  <ul>
                    <li style={styleList}>
                      <Text>
                        {" "}
                        {t(
                          "bytovaya-tekhnika-elektronika-mebel-s-besplatnoi-dostavkoi"
                        )}
                      </Text>
                    </li>
                    <li style={styleList}>
                      <Text>
                        {t(
                          "nam-udayotsya-derzhat-odni-iz-samykh-nizkikh-cen-tak-kak-my-rabotaem-napryamuyu-s-postavshikami-izbegaya-lishnikh-raskhodov-v-tom-chisle-i-na-arendu-torgovykh-ploshadei-i-personala-my-uzhe-v-budushem-my-internet-supermarket"
                        )}
                      </Text>
                    </li>
                  </ul>
                </Paragraph>
              </Typography>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
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

export default async function AboutPageProvider({ params }: { params: any }) {
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
                <AboutPage />
              </Suspense>
            </section>
            <Footer />
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
