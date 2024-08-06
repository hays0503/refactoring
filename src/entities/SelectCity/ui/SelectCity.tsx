"use client";

import useGetAllCity from "@/shared/hook/useGetAllCity";
import useGetCurrentCity from "@/shared/hook/useGetCurrentCity";
import { Flex, Button, Typography, Modal, Input, Divider, Space } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import style from "./SelectCity.module.scss";
import { useRouter } from "next/navigation";
import { iCity } from "@/shared/types/city";
import { selectDataByLangCity} from "@/shared/tool/selectDataByLang";

export default function SelectCity({ params, currentCity, Cities }: any) {

  const t = useTranslations();
  const dataHook = useGetCurrentCity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCity, setListCity] = useState(Cities);

  const route = useRouter();

  const onSearchCity = (
    value: string,
    cities: iCity[]
  ) => {
    const filteredCities = cities.filter((city) =>
      selectDataByLangCity(city, localActive)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setListCity(filteredCities);
  };

  const localActive = useLocale();

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ padding: "10px", height: "30px" }}
      >
        {dataHook.contextHolder}
        <Button onClick={() => setIsModalOpen(true)}>
          <Flex justify="center" align="center">
            <Image
              className={style.logo}
              src="/place.svg"
              alt={t("logotip")}
              width={30}
              height={30}
            />
            <Typography.Text>{currentCity}</Typography.Text>
          </Flex>
        </Button>
        <Modal
          zIndex={2000}
          title={t("vyberite-gorod")}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          okText={t("potverdit")}
          cancelText={t("otmena")}
          onOk={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        >
          <Input
            style={{ width: 200 }}
            placeholder={t("filtr")}
            onChange={(e) => onSearchCity(e.target.value, Cities)}
          />
          <div className={style.modalCity}>
            <Divider type="horizontal" />
            <Space size="small" wrap>
              {listCity.map((city: iCity, index: number) => (
                <Button
                  key={index}
                  className={style.city}
                  onClick={() => {
                    route.replace(
                      `/${localActive}/${city.additional_data.EN}/`
                    );
                    setIsModalOpen(false);
                  }}
                >
                  {selectDataByLangCity(city, localActive)}
                </Button>
              ))}
            </Space>
          </div>
        </Modal>
      </Flex>
    </>
  );
}
