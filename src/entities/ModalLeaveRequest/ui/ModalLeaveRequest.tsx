"use client";

import { Modal, Typography, Flex } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./ModalLeaveRequest.module.scss";

export default function ModalLeaveRequest() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => setModalOpen(!modalOpen);

  const t = useTranslations();

  const modal = () => {
    return <Modal
      key={1}
      title={t("ostavit-obrashenie")}
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[]}
    >
      {/* Форма обратной связи */}
      <div className={styles.ModalLeaveRequest}>
        <Typography.Text>
          {t("vam-perezvonyat-po-povodu-vashego-obrasheniya")}
        </Typography.Text>
        <form>
          <Flex gap={"10px"} vertical={true} justify="space-between">
            <Flex gap={"10px"} vertical={true} justify="space-between">
              <label htmlFor="name">{t("imya")}</label>
              <input type="text" id="name" />
            </Flex>
            <Flex gap={"10px"} vertical={true} justify="space-between">
              <label htmlFor="phone">{t("telefon")}</label>
              <input type="text" id="phone" />
            </Flex>
            <Flex gap={"10px"} vertical={true} justify="space-between">
              <label htmlFor="comment">{t("kommentarii")}</label>
              <textarea id="comment"></textarea>
            </Flex>
            <Flex gap={"10px"} vertical={true} justify="space-between">
              <button type="submit">{t("otpravit")}</button>
            </Flex>
          </Flex>
        </form>
      </div>
    </Modal>
  };

  return [toggle, modal];
}
