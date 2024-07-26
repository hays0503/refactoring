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

const { Search } = Input;
const { Text } = Typography;

const { useBreakpoint } = Grid;

function HeaderMenu() {
  const [componentTopMenu, componentButtonMenu] = CustomMenu();

  const { isDarkTheme, isDarkThemeImage } = useTheme();

  const itemsCart: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{
            width: "290px",
          }}
        >
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: "max-content" }}>Товар 1</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: "max-content" }}> 100000 ₸</div>
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            width: "290px",
          }}
        >
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: "max-content" }}>Товар 2</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: "max-content" }}> 200000 ₸</div>
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{
            width: "290px",
            borderTop: "6px dashed #f0f0f0",
            paddingTop: "10px",
          }}
        >
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: "max-content" }}>Итог</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: "max-content" }}> 300000 ₸</div>
            </span>
          </div>
        </div>
      ),
    },
  ];

  const screens = useBreakpoint();
  const isMobile = screens['xs'] || screens['sm'] && !screens['md'] && !screens['lg'] && !screens['xl'] ;

  console.log(screens)

  return (
    <>
      <div className={styles.HeaderMenuContainer} style={isDarkTheme}>
        <div className={styles.HeaderMenuTop} style={isDarkTheme}>
          <Flex vertical={true} gap={15}>
            <Flex justify="center">
            <Logo />
            </Flex>
            <div className={styles.HeaderMenuLine2ContainerCategory}>
              <AllCategory />
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
                  style={{ width: isMobile?"100%":"35%" }}
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

                <Flex align="center" justify="center" vertical={true}>
                  <Text>
                    <a href="tel:+7(495) 55-55-55">+7(495) 55-55-55</a>
                  </Text>
                  <Text>9:00 - 22:00</Text>
                  <Text> без выходных </Text>
                </Flex>
                <Dropdown
                  menu={{ items: itemsCart }}
                  trigger={["hover"]}
                  placement="top"
                >
                  <div className={styles.HeaderMenuLine1TabsСartContainer}>
                    <div
                      className={styles.HeaderMenuLine1TabsСartContainerContent}
                    >
                      <Badge count={5}>
                        <Image
                          src="/cart.svg"
                          alt="cart"
                          width={48}
                          height={48}
                          style={isDarkThemeImage}
                        />
                      </Badge>
                      <div
                        className={
                          styles.HeaderMenuLine1TabsСartContainerContentData
                        }
                      >
                        <Text>Корзина</Text>
                        <Text>123456789 ₸</Text>
                      </div>
                    </div>
                  </div>
                </Dropdown>
              </Flex>
              <Flex style={{ width: "75%" }}>
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
