"use client";

import React, { CSSProperties, Suspense } from "react";
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
import { useTranslations } from "next-intl";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const DeliveryPage = ({
  params,
  Cities,
  currentCity,
}: {
  params: any;
  Cities: iCity[];
  currentCity: string;
}) => {
  const styleList: CSSProperties = {
    listStyleType: "square",
    padding: "10px",
    border: "1px-solid-f0f0f0",
    borderRadius: "5px",
  };

  const t = useTranslations();
  const { CurrentTheme } = useTheme();

  return (
    <>
      <ConfigProvider theme={CurrentTheme}>
        <Layout>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities} />
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
                            {t("dostavka-v-cherte-goroda-0")}
                          </div>
                        </Title>
                        <Divider />
                        <Paragraph>
                          <ul>
                            <li style={styleList}>
                              <Text>
                                {t(
                                  "dostavka-besplatnaya-pri-zakaze-ot-10-000kzt"
                                )}
                              </Text>
                            </li>
                            <li style={styleList}>
                              <Text>
                                {t("do-10-000-dostavka-stoit-1000kzt")}
                              </Text>
                            </li>
                          </ul>
                        </Paragraph>
                        <Paragraph>
                          <Title level={5}>
                            {t(
                              "dostavka-v-naselennye-punkty-nakhodyashiesya-vne-cherty-goroda"
                            )}
                          </Title>
                          <ul>
                            <li style={styleList}>
                              <Text>
                                {t(
                                  "dostavka-platnaya-i-rasschityvaetsya-operatorami"
                                )}
                              </Text>
                            </li>
                            <li style={styleList}>
                              <Text>
                                {t(
                                  "vy-mozhete-utochnit-stoimost-dostavki-svyazavshis-s-nami-ili-dozhdavshis-zvonka-ot-operatora-posle-oformleniya-zakaza"
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
            </Suspense>
          </section>
          <Footer params={params}/>
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default DeliveryPage;
