"use client";

import useCityStore from "@/_app/store/city";
import useGetAllCity from "@/shared/hook/useGetAllCity";
import useGetCurrentCity from "@/shared/hook/useGetCurrentCity";
import { Flex, Button, Typography, Modal, Input, Divider, Space } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from 'next/image';
import style from './SelectCity.module.scss';

export default function SelectCity({params,currentCity}:any) {
  
  const t = useTranslations();


//   const { currentCity,setCurrentCity} = useCityStore((state) => {
//     return {
//       currentCity: state.currentCity,
//       setCurrentCity: state.setCurrentCity
//     };
//   });
  
  const cities = useGetAllCity();
  const dataHook = useGetCurrentCity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCity, setListCity] = useState(cities);

  const onSearchCity = (value: string, cities: Array<{ key: string, value: string }>) => {
    const filteredCities = cities.filter(city =>
      city.key.toLowerCase().includes(value.toLowerCase())
    );
    setListCity(filteredCities);
  }

//   useEffect(() => {
//     // setCurrentCity(dataHook.currentCity)
//   }, [dataHook.currentCity,setCurrentCity]);

  return (
    <>
    <Flex justify='center' align='center'
        style={{ padding: '10px', height: '30px' }}
    >
        {dataHook.contextHolder}
        <Button onClick={()=>setIsModalOpen(true)}
        >
            <Flex justify='center' align='center'>
                <Image className={style.logo} src="/place.svg" alt={t('logotip')} width={30} height={30} />
                <Typography.Text>{currentCity}</Typography.Text>
            </Flex>
        </Button>
        <Modal
            zIndex={2000}
            title={t('vyberite-gorod')}
            open={isModalOpen}
            onCancel={()=>setIsModalOpen(false)}
            okText={t('potverdit')}
            cancelText={t('otmena')}
            onOk={()=>setIsModalOpen(false)}
            onClose={()=>setIsModalOpen(false)}
        >
            <Input
                style={{ width: 200 }}
                placeholder={t('filtr')}
                onChange={(e) => onSearchCity(e.target.value, cities)}
            />
            <div className={style.modalCity}>
                <Divider type="horizontal" />
                <Space size="small" wrap>
                    {listCity.map((city, index) => (
                        <Button key={index} className={style.city} onClick={() => {
                            // setCurrentCity(city.value);
                            setIsModalOpen(false);
                        }}>
                            {city.value}
                        </Button>
                    ))}
                </Space>
            </div>
        </Modal>
    </Flex>
    </>
);
}
