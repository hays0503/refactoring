import { Flex, List, MenuProps, Tabs, Typography } from "antd";
import Image from "next/image";
import { useState, CSSProperties } from "react";
import style from "./FooterMobile.module.scss";
import { CatalogMobile } from "@/entities/CatalogMobile";
import { BasketMobile } from "@/entities/BasketMobile";
import { BasketMobileBody } from "@/entities/BasketMobile/ui/BasketMobileBody";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ThemeSwitcher } from "@/entities/ThemeSwitcher";
import { LangSwitcher } from "@/entities/LangSwitcher";
import useTheme from "@/shared/hook/useTheme";


const { Text } = Typography;

export default function FooterMobile({ params }: { params: any }) {
  const t = useTranslations();
  const [current, setCurrent] = useState<string>("1");
  const localActive = useLocale();

  const returnStyleActive = (key: string): CSSProperties => {
    return {
      color: key === current ? "#3F54CF" : "#8E8E8E",
    };
  };

  const returnStyleActiveAccent = (key: string): string => {
    return key === current ? "#3F54CF" : "#8E8E8E";
  };

  const returnStyleActiveBg = (key: string): string => {
    return key === current ? "#A53594" : "#8E8E8E";
  };

  const accountItems = [
    <Link key={"account"} href={`/${localActive}/${params.city}/account`}>{t("akkaunt")}</Link>,
    <Flex key={"theme"} gap={"10px"}>
      <span>{t("vybrat-temu")}</span>
      <ThemeSwitcher />
    </Flex>,
    <LangSwitcher key={"lang"} params={params} />,
  ];

  const {isDarkTheme,isDarkThemeImage} = useTheme();

  const styleContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    // backgroundColor: "#FFFFFF",
    zIndex: 1000,
  };

  return (
    <div      
      id={style.mobile}
      style={{...styleContainer,...isDarkTheme}}
    >
      <Tabs
        style={{ "--ant-tabs-horizontal-item-gutter": "3.5dvw" } as CSSProperties}
        accessKey={current}
        onTabClick={(key) => setCurrent(key)}
        size="small"
        centered
        tabPosition="bottom"
        items={[
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <Image src="/logo.svg" alt="logo" height={24} width={43} />
                <Text style={returnStyleActive("1")}>Главная</Text>
              </Flex>
            ),
            key: "1",
          },
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.75 13V13.12C3.68 13.12 4.25 13.61 4.25 14.66V15H6.25V13H2.75ZM10.25 9H18.25V7H10.25V9ZM22.25 5H10.25V3H22.25V5ZM2.25 12C2.25 11.45 2.7 11 3.25 11H7.25C7.8 11 8.25 11.45 8.25 12V16C8.25 16.55 7.8 17 7.25 17H3.25C2.7 17 2.25 16.55 2.25 16V12ZM2.75 5V5.12C3.68 5.12 4.25 5.61 4.25 6.66V7H6.25V5H2.75ZM2.25 4C2.25 3.45 2.7 3 3.25 3H7.25C7.8 3 8.25 3.45 8.25 4V8C8.25 8.55 7.8 9 7.25 9H3.25C2.7 9 2.25 8.55 2.25 8V4Z"
                    fill={returnStyleActiveBg("2")}
                  />
                  <path
                    d="M12.9901 17.8502L12.4001 13.1502L17.1001 13.7402L16.5401 14.2902C16.1501 14.6802 16.1501 15.3202 16.5401 15.7102L18.8401 18.0002L17.2501 19.5902L14.9601 17.2902C14.5701 16.9002 13.9401 16.9002 13.5401 17.2902L12.9901 17.8502ZM11.3801 11.0102C10.6701 10.9202 10.1801 11.4702 10.2601 12.1202L11.2601 20.1202C11.3701 20.9902 12.3701 21.3002 12.9601 20.7102L14.2501 19.4102L16.5401 21.7102C16.9401 22.1002 17.5701 22.1002 17.9601 21.7102L20.9601 18.7102C21.3501 18.3202 21.3501 17.6802 20.9601 17.2902L18.6701 15.0002L19.9601 13.7102C20.5701 13.1002 20.2201 12.1102 19.3801 12.0102L11.3801 11.0102Z"
                    fill={returnStyleActiveAccent("2")}
                  />
                </svg>
                <Text style={returnStyleActive("2")}>Каталог</Text>
              </Flex>
            ),
            key: "2",
            children: <CatalogMobile params={params} />,
          },
          {
            label: (
              <BasketMobile>
                <Flex vertical={true} gap={"10px"} align="center">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.30847 18.71L4.70847 10.71H20.2685L18.6685 18.71H6.30847ZM5.48847 20.71H19.4885C20.0285 20.71 20.3685 20.42 20.4685 19.91L22.4285 10.11C22.5385 9.58 22.4385 9.24 22.0485 8.85L15.1985 2L13.7785 3.42L18.1085 7.74C18.8285 8.46 19.5085 8.59 20.5285 8.59V8.71H4.45847V8.59C5.47847 8.59 6.15847 8.46 6.87847 7.74L11.1985 3.42L9.77847 2L2.90847 8.82C2.49847 9.23 2.43847 9.57 2.54847 10.11L4.50847 19.91C4.60847 20.42 4.95847 20.71 5.48847 20.71Z"
                      fill={returnStyleActiveBg("3")}
                    />
                    <path
                      d="M17.4885 16.71H15.4885V12.71H17.4885V16.71Z"
                      fill={returnStyleActiveBg("3")}
                    />
                    <path
                      d="M13.4885 16.71H11.4885V12.71H13.4885V16.71Z"
                      fill={returnStyleActiveBg("3")}
                    />
                    <path
                      d="M9.48846 16.71H7.48846V12.71H9.48846V16.71Z"
                      fill={returnStyleActiveBg("3")}
                    />
                  </svg>
                  <Text style={returnStyleActive("3")}>Корзина</Text>
                </Flex>
              </BasketMobile>
            ),
            key: "3",
            children: <BasketMobileBody city={params.city} />,
          },
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.75 6H18.61C17.66 6 17.09 6.49 16.87 7.33H16.75V5C16.75 2.76 14.95 1 12.75 1C10.53 1 8.75 2.79 8.75 5V6H5.75C4.65 6 3.75 6.9 3.75 8V19C3.75 20.1 4.65 21 5.75 21H11.75V19H5.75V8H8.75V10H10.75V8H14.75V10H16.75V8H19.75V11.01H21.75V8C21.75 6.9 20.86 6 19.75 6ZM10.87 7.33H10.75V5C10.75 3.86 11.65 3 12.75 3C13.85 3 14.75 3.86 14.75 5V6H12.61C11.66 6 11.09 6.49 10.87 7.33Z"
                    fill={returnStyleActiveAccent("4")}
                  />
                  <path
                    d="M20.2501 20.9996C21.0785 20.9996 21.7501 20.328 21.7501 19.4996C21.7501 18.6711 21.0785 17.9996 20.2501 17.9996C19.4216 17.9996 18.7501 18.6711 18.7501 19.4996C18.7501 20.328 19.4216 20.9996 20.2501 20.9996Z"
                    fill={returnStyleActiveBg("4")}
                  />
                  <path
                    d="M20.3555 13.0059L13.7582 19.6031L15.1583 21.0032L21.7555 14.4059L20.3555 13.0059Z"
                    fill={returnStyleActiveBg("4")}
                  />
                  <path
                    d="M15.2501 16.0096C16.0785 16.0096 16.7501 15.338 16.7501 14.5096C16.7501 13.6811 16.0785 13.0096 15.2501 13.0096C14.4216 13.0096 13.7501 13.6811 13.7501 14.5096C13.7501 15.338 14.4216 16.0096 15.2501 16.0096Z"
                    fill={returnStyleActiveBg("4")}
                  />
                </svg>

                <Text
                  delete={true}
                  disabled={true}
                  style={returnStyleActive("4")}
                >
                  Акции
                </Text>
              </Flex>
            ),
            key: "4",
            disabled: true,
          },
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_142_1257)">
                    <path
                      d="M13.4 14.78V12.57C12.71 12.3 11.98 12.12 11.22 12.04V11.93C13.59 11.54 15.4 9.48 15.4 7C15.4 4.24 13.16 2 10.4 2C7.64 2 5.4 4.24 5.4 7C5.4 9.48 7.21 11.54 9.58 11.93V12.04C6.39 12.36 3.7 14.52 2.67 17.5C2.28 18.63 2.18 19.85 2.08 21.05L2 22H4.01L4.08 21.05C4.17 19.85 4.26 18.71 4.75 17.66C5.81 15.39 7.97 14 10.4 14C11.47 14 12.49 14.27 13.4 14.78ZM7.4 7C7.4 5.34 8.74 4 10.4 4C12.06 4 13.4 5.34 13.4 7C13.4 8.66 12.06 10 10.4 10C8.74 10 7.4 8.66 7.4 7Z"
                      fill={returnStyleActiveAccent("5")}
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.8199 20C18.9245 20 19.8199 19.1046 19.8199 18C19.8199 16.8954 18.9245 16 17.8199 16C16.7154 16 15.8199 16.8954 15.8199 18C15.8199 19.1046 16.7154 20 17.8199 20ZM17.8199 22C20.0291 22 21.8199 20.2091 21.8199 18C21.8199 15.7909 20.0291 14 17.8199 14C15.6108 14 13.8199 15.7909 13.8199 18C13.8199 20.2091 15.6108 22 17.8199 22Z"
                      fill={returnStyleActiveBg("5")}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_142_1257">
                      <rect
                        width="19.82"
                        height="20"
                        fill="white"
                        transform="translate(2 2)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <Text style={returnStyleActive("5")}>Профиль</Text>
              </Flex>
            ),
            key: "5",
            children: (
              <>
                <List
                  dataSource={accountItems}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
