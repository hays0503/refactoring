import { CustomMenu } from "@/entities/CustomMenu";
import { Logo } from "@/entities/Logo";
import useTheme from "@/shared/hook/useTheme";
import { Badge, Dropdown, Flex, Input, Typography } from "antd";
import { Grid } from 'antd';
import styles from "./HeaderMenu.module.scss";
import { SaleLink } from "@/entities/SaleLink";
import { AllCategory } from "@/entities/AllCategory";
import type { MenuProps } from "antd";
import Image from "next/image";
import { Basket } from "@/entities/Basket";
import { Suspense } from "react";

const { Search } = Input;
const { Text } = Typography;

const { useBreakpoint } = Grid;

function HeaderMenu({city,urlCity}:{city:string,urlCity:string}) {
  const [componentTopMenu, componentButtonMenu] = CustomMenu(urlCity);

  const { isDarkTheme, isDarkThemeImage } = useTheme();


  const screens = useBreakpoint();
  const isMobile = screens['xs'] || screens['sm'] && !screens['md'] && !screens['lg'] && !screens['xl'] ;

  // console.log(screens)

  return (
    <>
      <div className={styles.HeaderMenuContainer} style={isDarkTheme}>
        <div className={styles.HeaderMenuTop} style={isDarkTheme}>
          <Flex vertical={true} gap={15}>
            <Flex justify="center">
            <Logo  urlCity={urlCity}/>
            </Flex>
            <div className={styles.HeaderMenuLine2ContainerCategory}>
              <AllCategory city={city} urlCity={urlCity}/>
            </div>
          </Flex>

          <div className={styles.HeaderMenuTopTabs}>
            <Flex
              justify="flex-start"
              align="baseline"              
              style={{ width: "100%" }}
              vertical={true}
              gap={10}
            >
              <Flex
                justify="flex-start"
                align="center"
                style={{ width: "100%" }}
                gap={5}
                vertical={isMobile}
              >
                {componentTopMenu}

                <Search
                  placeholder="Что будем искать ?"
                  style={{ width: isMobile?"100%":"60%" }}
                />

                <Flex
                  justify="center"
                  align="center"
                  gap={10}
                  style={{ width: "10%" }}
                >
                  <Image
                    src="/instagram.png"
                    alt="instagram"
                    width={32}
                    height={32}
                    style={isDarkThemeImage}
                  />
                  <Image
                    src="/telegram.png"
                    alt="telegram"
                    width={32}
                    height={32}
                    style={isDarkThemeImage}
                  />
                </Flex>
                  <Basket city={city}/>
                <Flex align="center" justify="center" vertical={true} style={{minWidth:'fit-content'}}>
                  <Text>
                    <a href="tel:+7(495) 55-55-55">+7(495) 55-55-55</a>
                  </Text>
                  <Text>9:00 - 22:00</Text>
                  <Text> без выходных </Text>
                </Flex>

              </Flex>
              <Flex style={{ width: "100%" }}>
                {componentButtonMenu}
                <SaleLink />
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;
