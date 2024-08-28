"use client";

import { useLocale, useTranslations } from "next-intl";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { LangSwitcher } from "@/entities/LangSwitcher";
import { SelectCity } from "@/entities/SelectCity";

import type { MenuProps } from "antd";
import { Col, Menu, Row } from "antd";

import { Dropdown, Space, Flex, Modal, Typography } from "antd";
import { ModalLeaveRequest } from "@/entities/ModalLeaveRequest";
import { ThemeSwitcher } from "@/entities/ThemeSwitcher";
import { DownOutlined } from "@ant-design/icons";
import useTheme from "@/shared/hook/useTheme";

type MenuItem = Required<MenuProps>["items"][number];

export default function Header({ params, currentCity, Cities }: any) {
  const t = useTranslations();

  const localActive = useLocale();

  const [ModalToggle, ModalLeaveRequestComponent] = ModalLeaveRequest();

  const { isDarkTheme,isDarkMode } = useTheme();

  const items: MenuItem[] = [
    {
      label: (
        <Link href={`/${localActive}/${params.city}/reviews`}>
          {t("otzyvy")}
        </Link>
      ),
      key: "rewiews",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/about`}>
          {t("o-nas-0")}
        </Link>
      ),
      key: "about",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/delivery`}>
          {t("dostavka")}
        </Link>
      ),
      key: "delivery",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/about-pays`}>
          {t("oplata")}
        </Link>
      ),
      key: "payment",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/about-our-guarantees`}>
          {t("nashi-garantii")}
        </Link>
      ),
      key: "our-guarantees",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/about-why-we`}>
          {t("pochemu-my")}
        </Link>
      ),
      key: "why-we",
    },
    {
      label: (
        <Link href={`/${localActive}/${params.city}/contact`}>
          {t("kontakty-0")}
        </Link>
      ),
      key: "contacts",
    },
    {
      label: <a onClick={() => ModalToggle()}>{t("ostavit-obrashenie")}</a>,
      key: "leave-request",
    },
  ];

  const accountItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={`/${localActive}/${params.city}/account`}>
          {t("akkaunt")}
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Flex gap={"10px"}>
          <span>{t("vybrat-temu")}</span>
          <ThemeSwitcher />
        </Flex>
      ),
    },
    { key: "2", label: <LangSwitcher params={params} /> },
  ];

  const selectCity = {order:1,flex:"10%"};
  const selectCityMobile = {order:1,flex:"100%"};
  const menu = {order:2,flex:"auto"};
  const menuMobile = {order:3,flex:"100%"};
  const account = {order:3,flex:"10%"};
  const accountMobile = {order:2,flex:"100%"};

  return (
    <>
      {ModalLeaveRequestComponent()}
      <Flex justify="center" style={{width:'100%'}}>
        <div 
        className={styles.HeaderContainer}
        style={{backgroundColor: isDarkMode ? "black" : "#f5f5f5"}}
        >
        <Row className={styles.Container} justify="center" align={"middle"} style={{width:'100%'}}>
          <Col xs={selectCityMobile} sm={selectCityMobile} md={selectCity} lg={selectCity} xl={selectCity} xxl={selectCity}>
          <div className={styles.HeaderSelectCity}>
            <SelectCity
              param={params}
              currentCity={currentCity}
              Cities={Cities}
            />
          </div>
          </Col>

          <Col xs={menuMobile} sm={menuMobile} md={menu} lg={menu} xl={menu} xxl={menu}>
          <div id={styles.desktop} className={styles.HeaderMenuContainer}>
            <Menu
              className={styles.HeaderMenu}
              mode="horizontal"
              items={items}
            />
          </div>
          </Col>

          <Col xs={accountMobile} sm={accountMobile} md={account} lg={account} xl={account} xxl={account}>
          <div id={styles.desktop} className={styles.HeaderAccountUser}>
            <Dropdown menu={{ items: accountItems }}>
              <div className={styles.HeaderAccountUserInfo}>
                <Space>
                  <Image
                    src="/login.svg"
                    alt="kabinet"
                    width={32}
                    height={32}
                  />
                  {t("lichnyi-kabinet")}
                  <DownOutlined />
                </Space>
              </div>
            </Dropdown>
          </div>
          </Col>
        </Row>
        </div>
      </Flex> 
    </>
  );
}
