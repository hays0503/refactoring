import React, { use } from "react";
import { Input, Button, Row, Col, Typography, Flex } from "antd";
import { MailOutlined } from "@ant-design/icons";
import style from "./style.module.scss";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import useTheme from "@/shared/hook/useTheme";

const { Title, Text } = Typography;

const Footer = ({ params }: { params: any }) => {
  const t = useTranslations();

  const localActive = useLocale();

  const { isDarkTheme,isDarkMode } = useTheme();

  return (
    <div style={
      isDarkMode ? { backgroundColor: "#5e5e5e" } : { backgroundColor: "#fff" }
    } className={style.footer}>
      <div className={style.subscribeSection}>
        <div className={style.LogoContainer}>
          <div className={style.Logo}>
            {/* <Flex justify='center' align='center' style={{width:'100%'}}> */}
            <a href={`/${localActive}/${params.city}`}>
              <Image src="/logo.svg" alt="logo" height={60} width={95} />
            </a>
            {/* </Flex> */}
          </div>
        </div>
        <div className={style.conteiner}>
          <Text>{t("podpishites-na-rassylku-chtoby-byt-v-kurse-akcii")}</Text>
          <Input
            className={style.inputEmail}
            placeholder={t("vvedite-vash-e-mail")}
            type="email"
            width={200}
            suffix={
              <Button shape="round" style={{ width: "48px" }}>
                <MailOutlined />
              </Button>
            }
          />
        </div>
      </div>
      <div style={{ width: "95%" }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("kompaniya")}</Title>
            <ul>
              <li>
                <Text>{t("o-nas")}</Text>
              </li>
              <li>
                <Text>{t("blog")}</Text>
              </li>
              <li>
                <Text>{t("garantii")}</Text>
              </li>
              <li>
                <Text>{t("vybor-goroda")}</Text>
              </li>
              <li>
                <Text>{t("kontakty")}</Text>
              </li>
              <li>
                <Text>{t("novosti")}</Text>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("pomosh")}</Title>
            <ul>
              <li>
                <Text>{t("sposoby-oplaty")}</Text>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("internet-magazin")}</Title>
            <ul>
              <li>
                <Text>{t("kak-sdelat-zakaz")}</Text>
              </li>
              <li>
                <Text>{t("svyazhites-s-nami")}</Text>
              </li>
              <li>
                <Text>+7 705 655 00 00</Text>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>
              TOO «SCK» (ЭсСиКей) Sales Center of Kazakhstan
            </Title>
            <p>
              <Text>БИН 160 440 027 443</Text>
            </p>
            <p>
              <Text>{t("polzovatelskoe-soglashenie")}</Text>
            </p>
            <p>
              <Text>{t("politika-konfidencialnosti")}</Text>
            </p>
          </Col>
        </Row>
      </div>
      <div className={style.footerBottom}>
        <Text> {t("c-2024-sck-essikei-zona-unikalnykh-cen")}</Text>
      </div>
    </div>
  );
};

export default Footer;
