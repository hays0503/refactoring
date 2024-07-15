import { CustomMenu } from "@/entities/CustomMenu";
import { Logo } from "@/entities/Logo";
import useTheme from "@/shared/hook/useTheme";
import { Badge, Dropdown, Image, Input, Typography } from "antd";
import styles from './HeaderMenu.module.scss'
import { SaleLink } from "@/entities/SaleLink";
import { AllCategory } from "@/entities/AllCategory";
import type { MenuProps } from 'antd';

const { Search } = Input;
const { Text } = Typography;

function HeaderMenu() {
  const [componentTopMenu,componentButtonMenu] = CustomMenu();

  const {isDarkTheme,isDarkThemeImage} = useTheme();

  const itemsCart: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{
          width: '290px',
        }}>
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: 'max-content' }}>Товар 1</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: 'max-content' }}> 100000 ₸</div>
            </span>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{
          width: '290px',
        }}>
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: 'max-content' }}>Товар 2</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: 'max-content' }}> 200000 ₸</div>
            </span>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{
          width: '290px',
          borderTop: '6px dashed #f0f0f0',
          paddingTop: '10px',
        }}>
          <div className={styles.row}>
            <span className={styles.left}>
              <div style={{ width: 'max-content' }}>Итог</div>
            </span>
            <span className={styles.separator}></span>
            <span className={styles.right}>
              <div style={{ width: 'max-content' }}> 300000 ₸</div>
            </span>
          </div>
        </div>
      ),
    }
  ];

  return (
    <>
      <div className={styles.HeaderMenuContainer} style={isDarkTheme}>
        <div className={styles.HeaderMenuTop} style={isDarkTheme}>
          <Logo />

          <div className={styles.HeaderMenuTopTabs}>

            {componentTopMenu}

            <div className={styles.HeaderMenuLine1TabsSearch}>
              <Search placeholder="Что будем искать ?" />
            </div>
            <div className={styles.HeaderMenuLine1TabsContacts}>
              <Image
                src="/instagram.png"
                alt="instagram"
                width={24}
                height={24}
                style={isDarkThemeImage}
              />
              <Image
                src="/telegram.png"
                alt="telegram"
                width={24}
                height={24}
                style={isDarkThemeImage}
              />
              <div>
                <Text>
                  <a
                    className={styles.HeaderMenuLine1TabsContactsLink}
                    style={isDarkTheme}
                    href="tel:+7(495) 55-55-55"
                  >
                    +7(495) 55-55-55
                  </a>
                </Text>
                <Text>9:00 - 22:00</Text>
                <Text> без выходных </Text>
              </div>
            </div>
            <Dropdown
              menu={{ items: itemsCart }}
              trigger={["hover"]}
              placement="top"
            >
              <div className={styles.HeaderMenuLine1TabsСartContainer}>
                <div className={styles.HeaderMenuLine1TabsСartContainerContent}>
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
          </div>
        </div>

        <div className={styles.HeaderMenuLine2Container}>
          <div className={styles.HeaderMenuLine2ContainerCategory}>
            <AllCategory/>
          </div>
          {componentButtonMenu}
          <SaleLink/>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;
