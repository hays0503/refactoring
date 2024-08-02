"use client";

import React, { Suspense } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Divider,
  Space,
  ConfigProvider,
} from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Maps } from "@/widgets/Maps";
import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { Footer } from "@/features/Footer";
import useTheme from "@/shared/hook/useTheme";
import { iCity } from "@/shared/types/city";

const { Title, Paragraph, Text, Link } = Typography;
const { Content } = Layout;

export default function ContactsPage({
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
                    padding: "50px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ maxWidth: "800px", width: "100%" }}>
                    <Title level={1} style={{ textAlign: "center" }}>
                      {t("kontakty")}
                    </Title>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Title level={2} style={{ textAlign: "center" }}>
                          {t("nashi-kontakty")}
                        </Title>
                        <Paragraph style={{ textAlign: "center" }}>
                          {t("Thanks")}
                        </Paragraph>
                        <Space
                          direction="vertical"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          <Text>
                            <PhoneOutlined />
                            <Link href="tel:+77056550000">
                              +7 705 655 00 00
                            </Link>
                            ,
                            <Link href="tel:+77152462738">
                              +7 (7152) 46 27 38
                            </Link>
                          </Text>
                          <Text>
                            <MailOutlined />
                            <Link href="mailto:info@sck-1.kz">
                              info@sck-1.kz
                            </Link>
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Title level={2} style={{ textAlign: "center" }}>
                          {t("nashi-osnovnye-sklady")}
                        </Title>
                        <Maps />
                        <Paragraph style={{ textAlign: "center" }}>
                          <Text>{t("g-astana-pereulok-ashutas-2")}</Text>
                          <br />
                          <Text>{t("g-almaty-nurmakova-1a")}</Text>
                          <br />
                          <Text>{t("g-aktobe-41-razezd-114-a")}</Text>
                          <br />
                          <Text>
                            {t("g-karaganda-ul-sakena-seifullina-105")}
                          </Text>
                          <br />
                          <Text>{t("g-petropavlovsk-ul-musrepova-34a")}</Text>
                          <br />
                          <Text>{t("g-shymkent-ul-koikeldi-batyra-18-2")}</Text>
                        </Paragraph>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={24}>
                        <Title level={2} style={{ textAlign: "center" }}>
                          {t("dlya-predlozhenii-o-sotrudnichestve")}
                        </Title>
                        <Paragraph style={{ textAlign: "center" }}>
                          {t("po-voprosam")}
                        </Paragraph>
                        <Space
                          direction="vertical"
                          style={{ textAlign: "center", width: "100%" }}
                        >
                          <Text>
                            <PhoneOutlined />
                            <Link href="tel:+77056550000">
                              +7 705 655 00 00
                            </Link>
                            ,
                            <Link href="tel:+77152462738">
                              +7 (7152) 46 27 38
                            </Link>
                          </Text>
                          <Text>
                            <MailOutlined />
                            <Link href="mailto:info@sck-1.kz">
                              info@sck-1.kz
                            </Link>
                          </Text>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                </Content>
              </Suspense>
            </section>
            <Footer params={params}/>
          </Content>
        </Layout>
      </ConfigProvider>
    </>
  );
}
