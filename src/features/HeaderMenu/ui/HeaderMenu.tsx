import { CustomMenu } from "@/entities/CustomMenu";
import { Logo } from "@/entities/Logo";
import useTheme from "@/shared/hook/useTheme";
import { Flex, Input, Typography } from "antd";
import { Grid } from "antd";
import styles from "./HeaderMenu.module.scss";
import { AllCategory } from "@/entities/AllCategory";
import { Basket } from "@/entities/Basket";
import { memo, useCallback } from "react";

const { Search } = Input;
const { Text } = Typography;

const { useBreakpoint } = Grid;

function HeaderMenu({ city, urlCity }: { city: string; urlCity: string }) {
  // const [componentTopMenu, componentButtonMenu] = CustomMenu({urlCity});
  const Menu = useCallback(() => {
    return CustomMenu({ urlCity: urlCity });
  }, [urlCity]);
  const [componentTopMenu, componentButtonMenu] = Menu();

  const { isDarkTheme, isDarkThemeImage } = useTheme();

  const screens = useBreakpoint();
  const isMobile =
    screens["xs"] ||
    (screens["sm"] && !screens["md"] && !screens["lg"] && !screens["xl"]);

  // console.count("HeaderMenu")

  return (
    <>
      <div className={styles.HeaderMenuContainer} style={isDarkTheme}>
        <div
          id={styles.desktop}
          className={styles.HeaderMenuTop}
          style={isDarkTheme}
        >
          <Flex vertical={true} gap={15}>
            <Flex justify="center">
              <Logo urlCity={urlCity} />
            </Flex>

            <AllCategory city={city} urlCity={urlCity} />
          </Flex>

          <div id={styles.desktop} className={styles.HeaderMenuTopTabs}>
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
                  style={{ width: isMobile ? "100%" : "60%" }}
                  disabled={true}
                />

                {/* <Flex
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
                </Flex> */}

                <div id={styles.desktop}>
                  <Basket city={city} />
                </div>
                <Flex
                  align="center"
                  justify="center"
                  vertical={true}
                  style={{ minWidth: "fit-content" }}
                >
                  <Text>
                    <a href="tel:+7(495) 55-55-55">+7(495) 55-55-55</a>
                  </Text>
                  <Text>9:00 - 22:00</Text>
                  <Text> без выходных </Text>
                </Flex>
              </Flex>
              <Flex style={{ width: "100%" }}>
                {componentButtonMenu}
                {/* <SaleLink /> */}
              </Flex>
            </Flex>
          </div>
        </div>
        <div id={styles.mobile}>
          <Flex
            justify="flex-start"
            align="center"
            style={{ width: "100%" }}
            gap={5}
          >
            <Logo urlCity={urlCity} width={80} height={40} />
            <Search
              placeholder="Что будем искать ?"
              style={{ width: isMobile ? "100%" : "60%" }}
              disabled={true}
            />
          </Flex>
        </div>
      </div>
    </>
  );
}

export default memo(HeaderMenu);
