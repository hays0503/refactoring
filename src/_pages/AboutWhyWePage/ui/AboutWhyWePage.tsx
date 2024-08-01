"use client";

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
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";
import { useTranslations } from "next-intl";
import useTheme from "@/shared/hook/useTheme";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;


export default function AboutWhyWePage({
  params,
  Cities,
  currentCity,
}: {
  params: any;
  Cities: iCity[];
  currentCity: string;
}) {

  const t = useTranslations();
  const { CurrentTheme } = useTheme();

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
                <Content
                  style={{
                    padding: "25px",
                    display: "flex",
                    justifyContent: "center",
                    height: "100dvh",
                  }}
                >
                  <Row justify="center" style={{ width: "50dvw" }}>
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
                              {t("pochemu-my-0")}
                            </div>
                          </Title>
                          <Divider />
                          <Paragraph>
                            <ul>
                              <li>
                                <Text>
                                  {t("besplatnaya-dostavka-po-gorodu")}
                                </Text>
                              </li>
                            </ul>
                          </Paragraph>
                        </Typography>
                      </Card>
                    </Col>
                  </Row>
                </Content>
              </Suspense>
            </section>
            <Footer />
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
