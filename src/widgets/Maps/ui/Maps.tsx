import React from 'react'
import { 
        YMapsProvider,
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker 
    } from 'react-ymaps3'
import type { LngLat } from '@yandex/ymaps3-types/common/types/lng-lat'
import { Image } from 'antd'
import useGetCurrentCity from '@/shared/hook/useGetCurrentCity'

interface IPlacemark {
  geometry: LngLat
  properties: {
    hintContent: string
    balloonContent: string
  }
  options?: {
    iconLayout: string
    iconImageHref: string
    iconImageSize: [number, number]
    iconImageOffset: [number, number]
  }

}

const placemarks: IPlacemark[] = [
  {
    geometry: [71.513955,51.168583],
    properties: {
      hintContent: 'г. Астана, Переулок Ашутас 2',
      balloonContent: 'Адрес склада:<br>г. Нур-Султан (Астана), ул. А 184, 5',
    },
  },
  {
    geometry: [73.036823,49.813666],
    properties: {
      hintContent: 'г. Караганда, ул. Сакена Сейфуллина, 105',
      balloonContent: 'Адрес склада:<br>г. Караганда, ул. Сакена Сейфуллина, 105',
    },
  },
  {
    geometry: [ 69.164223,54.890801],
    properties: {
      hintContent: 'г. Петропавловск, ул. Мусрепова, 34А',
      balloonContent: 'Адрес склада:<br>г. Петропавловск, ул. Мусрепова, 34А',
    },
  },
  {
    geometry: [69.629234,42.300320],
    properties: {
      hintContent: 'г. Шымкент, ул. Койкелди Батыра, 18/2',
      balloonContent: 'Адрес склада:<br>г. Шымкент, ул. Койкелди Батыра, 18/2',
    },
  },
  {
    geometry: [76.905113,43.258866],
    properties: {
      hintContent: 'г. Алматы, ул. Нурмакова, 1А',
      balloonContent: 'Адрес склада:<br>г. Алматы, ул. Нурмакова, 1А',
    },
  },
  {
    geometry: [57.245357,50.237895],
    properties: {
      hintContent: 'г. Актобе, 41 разъезд, 114 А',
      balloonContent: 'Адрес склада:<br>г. Актобе, 41 разъезд, 114 А',
    },
  },
]


export default function Maps() {
  const {pos,contextHolder} = useGetCurrentCity();
  const centerDyn: LngLat = [pos.longitude,pos.latitude];
  const center: LngLat = pos ? centerDyn : [69.122280, 54.853091];
  return (<>
    {contextHolder}
    <div style={{height: 600}}>
      <YMapsProvider apikey='8cb320a3-b994-4a21-afd4-50a64b7156a3' >
        <YMap location={{center: center, zoom: 12}} >
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          {placemarks.map((placemark, index) => (
            <YMapMarker
              key={index}
              coordinates={placemark.geometry}
              properties={placemark.properties}
            >
              <Image src="/sck-map.svg" alt="sck-map.svg" style={{
                  width: 64,
                  height: 64,
                  transform: 'translate(-50%, -50%)',
                }}/>
            </YMapMarker>
          ))}

        </YMap>
      </YMapsProvider>
    </div>
    </>
  )
}
