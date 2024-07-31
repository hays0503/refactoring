"use client";

import useCityStore from "@/_app/store/city";
import useGetAllCity from "@/shared/hook/useGetAllCity";
import useGetCurrentCity from "@/shared/hook/useGetCurrentCity";
import { Flex, Button, Typography, Modal, Input, Divider, Space } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Image from 'next/image';
import style from './SelectCity.module.scss';
import { useRouter } from "next/navigation";
import { iCity } from "@/shared/types/city";

export default function SelectCity({params,currentCity,Cities}:any) {
  
  const t = useTranslations();
  const cities = useGetAllCity();
  const dataHook = useGetCurrentCity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCity, setListCity] = useState(cities);

  const route = useRouter();

  const onSearchCity = (value: string, cities: Array<{ key: string, value: string }>) => {
    const filteredCities = cities.filter(city =>
      city.key.toLowerCase().includes(value.toLowerCase())
    );
    setListCity(filteredCities);
  }

  const localActive = useLocale();

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
                            const found:iCity = Cities.find((i:iCity)=>i.name_city==city.key)
                            if(found){
                                route.replace(`/${localActive}/${found.additional_data.EN}/`)
                                setIsModalOpen(false);
                            }else{
                                alert('А такой склад есть ?')
                            }
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
