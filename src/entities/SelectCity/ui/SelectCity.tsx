"use client";

import useGetAllCity from "@/shared/hook/useGetAllCity";
import useGetCurrentCity from "@/shared/hook/useGetCurrentCity";
import {
  Flex,
  Button,
  Typography,
  Modal,
  Input,
  Divider,
  Space,
  Tour,
} from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import style from "./SelectCity.module.scss";
import { useRouter } from "next/navigation";
import { iCity } from "@/shared/types/city";
import { selectDataByLangCity } from "@/shared/tool/selectDataByLang";
import { useRef, useEffect, useState } from "react";
import type { GetRef, TourProps } from "antd";
import useCityStore from "@/_app/store/city";

export default function SelectCity({ params, currentCity, Cities }: any) {
  const t = useTranslations();
  const dataHook = useGetCurrentCity();
  const localActive = useLocale();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCity, setListCity] = useState(Cities);
  const [missCity, setMissCity] = useState(false);
  const ref1 = useRef<GetRef<typeof Button>>(null);

  const CityStore = useCityStore((state) => state);

  const route = useRouter();

  const onSearchCity = (value: string, cities: iCity[]) => {
    const filteredCities = cities.filter((city) =>
      selectDataByLangCity(city, localActive)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setListCity(filteredCities);
  };

  const steps: TourProps["steps"] = [
    {
      title: "Возможность выбора города",
      description: "После нажатия на кнопку выберите город",
      target: () => ref1.current!,
      nextButtonProps: {
        children: (
          <div onClick={() => CityStore.setMissCityConfirm(true)}>OK</div>
        ),
      }
    },
  ];

  // Если useGetCurrentCity (город) отличается от currentCity
  // то показываем сообщение с предложением выбрать город
  useEffect(() => {
    if (dataHook.currentCity && !CityStore.missCityConfirm) {
      if (dataHook.currentCity !== currentCity) {
        setMissCity(true);
      }
    }
  }, [currentCity, dataHook.currentCity]);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        style={{ padding: "10px", height: "30px" }}
      >
        {dataHook.contextHolder}
        <Button onClick={() => setIsModalOpen(true)} ref={ref1}>
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
        <Tour
          open={missCity}
          onClose={() => setMissCity(false)}
          mask={true}
          steps={steps}
        />
      </Flex>
    </>
  );
}
