import useBasketStore from "@/_app/store/basket";
import useOrderStore from "@/_app/store/order";
import { Button, Form, Input, Modal, Radio, Space } from "antd";
import { CSSProperties } from "react";
import styles from './OrderInBasket.module.scss';  // Предполагается, что у вас есть соответствующий CSS модуль
import OrderApiManipulator from "@/_app/api/apiOrderApiManipulator";

const styleInput: CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  color: "black",
};

export function OrderInBasket({ city }: { city: string }) {
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
      ...values,  // Используем сразу значения из формы
      shipping_city: city,
    };
    addOrder(newOrder);
    
    const isSuccess = await OrderApiManipulator.create(newOrder);
    if (isSuccess) {
      alert('Заказ оформлен и передан менеджеру. С вами свяжутся в скором времени.');
      localStorage.removeItem("basket-storage");
      clearBasket();
      toggleModal();
    } else {
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    }
  };

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
    >
      <div>
        { order &&<Form
          form={formOrder} layout="vertical"
          onFinish={handleOrderSubmit}
          initialValues={order}  // Инициализируем форму значениями из order
        >
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
            label="Заказано со склада в городе"
            name="shipping_city"
          >
            <Input style={styleInput} disabled={true} />
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
        </Form>}
      </div>
    </Modal>
  );
}
