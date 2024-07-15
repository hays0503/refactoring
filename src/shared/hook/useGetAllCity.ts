import { useTranslations } from "next-intl";
import { useMemo } from "react";

const useGetAllCity = () =>{
    const t = useTranslations();

  const cities = useMemo(() => [
      { key: 'Абай', value: t('abai') },
      { key: 'Актау', value: t('aktau') },
      { key: 'Актобе', value: t('aktobe') },
      { key: 'Алматы', value: t('almaty') },
      { key: 'Астана', value: t('astana') },
      { key: 'Караганда', value: t('karaganda') },
      { key: 'Кокшетау', value: t('kokshetau') },
      { key: 'Костанай', value: t('kostanai') },
      { key: 'Кызылорда', value: t('kyzylorda') },
      { key: 'Павлодар', value: t('pavlodar') },
      { key: 'Петропавловск', value: t('petropavlovsk') },
      { key: 'Рудный', value: t('rudnyi') },
      { key: 'Сарань', value: t('saran') },
      { key: 'Семей', value: t('semei') },
      { key: 'Талдыкорган', value: t('taldykorgan') },
      { key: 'Тараз', value: t('taraz') },
      { key: 'Темиртау', value: t('temirtau') },
      { key: 'Туркестан', value: t('turkestan') },
      { key: 'Уральск', value: t('uralsk') },
      { key: 'Усть-Каменогорск', value: t('ust-kamenogorsk') },
      { key: 'Шахтинск', value: t('shakhtinsk') },
      { key: 'Шымкент', value: t('shymkent') },
      { key: 'Экибастуз', value: t('ekibastuz') }
  ], [t]);

  return cities;
}


export default useGetAllCity;