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
import { useTranslations } from "next-intl";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import Image from "next/image";
import useTheme from "@/shared/hook/useTheme";
import { Footer } from "@/features/Footer";
import { iCity } from "@/shared/types/city";

const { Text,Title,Paragraph } = Typography;

const AccountPage = ({
  params,
  Cities,
  currentCity,
}: {
  params: any;
  Cities: iCity[];
  currentCity: string;
}) => {
  const t = useTranslations();
  const styleList = {
    listStyleType: "square",
    padding: "10px",
    border: "1px solid #f0f0f0",
    borderRadius: "5px",
  };

  const { CurrentTheme } = useTheme();

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
          <header>
            <Header params={params} currentCity={currentCity} Cities={Cities} />
            <HeaderMenu city={currentCity} urlCity={params.city} />
          </header>
          <section>
            <Suspense>
              <div
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
                            <Image
                              src="/logo.svg"
                              alt="SCK"
                              width={200}
                              height={200}
                            />
                          </div>
                        </Title>
                        <Divider />
                        <Paragraph>
                          <ul>
                            <li style={styleList}>
                              <Title>
                                Ведётся разработка этой страницы 
                              </Title>
                            </li>                            
                          </ul>
                        </Paragraph>
                      </Typography>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Suspense>
          </section>
          <Footer params={params}/>
      </Layout>
    </ConfigProvider>
  );
};


export default AccountPage;