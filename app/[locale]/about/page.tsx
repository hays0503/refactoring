"use client";

import React from "react";
import { Typography, Card, Row, Col, Divider, Layout, ConfigProvider } from "antd";
import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import Image from "next/image";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";

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

export default function AboutPageProvider() {
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
              <AboutPage />
            </section>
            <Footer/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
