import useBasketStore from "@/_app/store/basket";
import useOrderStore from "@/_app/store/order";
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Children, CSSProperties, useEffect, useState } from "react";
import styles from "./OrderInBasket.module.scss"; // Предполагается, что у вас есть соответствующий CSS модуль
import OrderApiManipulator from "@/_app/api/apiOrderApiManipulator";

const styleInput: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  color: "black",
};

const { useBreakpoint } = Grid;

const { Text } = Typography;

export function OrderInBasket({
  city,
  children,
}: {
  city: string;
  children: React.ReactNode;
}) {
  const [isMobileSize, setIsMobileSize] = useState("100%"); // isMobileSize

  const [formOrder] = Form.useForm();

  const { uuid4, clearBasket } = useBasketStore((state) => ({
    uuid4: state.uuid4,
    clearBasket: state.clearBasket,
  }));

  const { isOpenModalOrder, toggleModal, addOrder, order } = useOrderStore(
    (state) => ({
      isOpenModalOrder: state.isOpenModalOrder,
      toggleModal: state.toggleModal,
      addOrder: state.addOrder,
      order: state.order,
    })
  );

  const handleOrderSubmit = async (values: any) => {
    const newOrder = {
      uuid_id: uuid4,
      order_status: "NEW",
      ...values, // Используем сразу значения из формы
      shipping_city: city,
    };
    addOrder(newOrder);

    const isSuccess = await OrderApiManipulator.create(newOrder);
    if (isSuccess) {
      alert(
        "Заказ оформлен и передан менеджеру. С вами свяжутся в скором времени."
      );
      localStorage.removeItem("basket-storage");
      clearBasket();
      toggleModal();
    } else {
      alert("Произошла ошибка при оформлении заказа. Попробуйте еще раз.");
    }
  };

  const screens = useBreakpoint();

  const isMobile = Boolean(screens.xs || screens.sm || screens.md);
  const itIsMobile =
    screens["xs"] ||
    (screens["sm"] && !screens["md"] && !screens["lg"] && !screens["xl"]);

  useEffect(() => {
    //width = 320px
    if (
      screens["xs"] &&
      !screens.sm &&
      !screens.md &&
      !screens.lg &&
      !screens.xl &&
      !screens.xxl
    ) {
      setIsMobileSize("90%");
    }
    //width = 576px
    if (
      screens["sm"] &&
      !screens.lg &&
      !screens.xl &&
      !screens.xs &&
      !screens.xxl
    ) {
      setIsMobileSize("100%");
    }
    //width = 768px
    if (
      screens.lg &&
      screens.md &&
      screens.sm &&
      !screens.xl &&
      !screens.xs &&
      !screens.xxl
    ) {
      setIsMobileSize("80%");
    }
    //width = 992px
    if (
      screens.lg &&
      screens.md &&
      screens.sm &&
      screens.xl &&
      !screens.xs &&
      !screens.xxl
    ) {
      setIsMobileSize("50%");
    }
    //width = 1200px
    if (
      screens.lg &&
      screens.md &&
      screens.sm &&
      screens.xl &&
      screens.xxl &&
      !screens.xs
    ) {
      setIsMobileSize("40%");
    }
    //width = 1600px
    if (
      screens.lg &&
      screens.md &&
      screens.sm &&
      screens.xl &&
      screens.xxl &&
      screens.xs
    ) {
      setIsMobileSize("30%");
    }
  }, [screens]);

  return (
    <Modal
      title="Оформление заказа"
      centered
      open={isOpenModalOrder}
      onCancel={toggleModal}
      footer={[
        <Button key="submit" type="primary" onClick={formOrder.submit}>
          Оформить заказ
        </Button>,
        <Button key="back" onClick={toggleModal}>
          Вернуться
        </Button>,
      ]}
      cancelText="Отмена"
      width={isMobileSize}
    >
      <Row
        wrap={itIsMobile}
        justify={"space-evenly"}
        align={"stretch"}
        style={{ height: "100%" }}
      >
        <Col
          xs={{ flex: "100%", order: 1 }}
          sm={{ flex: "60%", order: 1 }}
          md={{ flex: "40%", order: 1 }}
          lg={{ flex: "35%", order: 1 }}
          xl={{ flex: "30%", order: 1 }}
          xxl={{ flex: "35%", order: 1 }}
        >
          <Form
            form={formOrder}
            layout="vertical"
            onFinish={handleOrderSubmit}
            initialValues={order ?? undefined} // Инициализируем форму значениями из order
          >
            <Form.Item label="Заказано со склада в городе" name="shipping_city">
              {/* <Input style={styleInput} disabled={true} /> */}
              <Tooltip title="Для смены склада измените город">
                <Text strong>{city}</Text>
              </Tooltip>
            </Form.Item>
            <Form.Item
              label="Номер телефона"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона",
                },
              ]}
            >
              <Input style={styleInput} />
            </Form.Item>
            <Form.Item
              label="Адрес доставки"
              name="delivery_address"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите адрес доставки",
                },
              ]}
            >
              <Input style={styleInput} />
            </Form.Item>
            <Form.Item
              label="Тип доставки"
              name="delivery_type"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите тип доставки",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="DELIVERY">Доставка</Radio>
                  <Radio value="PICKUP">Самовывоз</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Комментарий" name="comment">
              <Input.TextArea style={styleInput} />
            </Form.Item>
          </Form>
        </Col>
        <Col
          xs={{ flex: "100%", order: 2 }}
          sm={{ flex: "60%", order: 2 }}
          md={{ flex: "40%", order: 2 }}
          lg={{ flex: "35%", order: 2 }}
          xl={{ flex: "30%", order: 2 }}
          xxl={{ flex: "35%", order: 2 }}
        >
          {children}
        </Col>
      </Row>
    </Modal>
  );
}
