import { useEffect, useState } from "react";
import { notification } from "antd";


export interface GetCurrentCity {
  currentCity: string;
  pos: { latitude: number; longitude: number };
  contextHolder: any;
}

function useGetCurrentCity():GetCurrentCity {
  const [currentCity, setCurrentSity] = useState("");
  const [pos, setPos] = useState({ latitude: 0, longitude: 0 });
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        // console.log(url)
        setPos({ latitude, longitude });
        fetch(url)
          .then((res) => res.json())
          .then((data) => setCurrentSity(data.address.city.split(" ")[0]));
      },
      (err) => {
        // if(err.code === err.PERMISSION_DENIED) {
        api["warning"]({
          message: "Не могу определить ваше местоположение",
          description:
            "Вы отменили запрос на геолокацию или ваш браузер не поддерживает геолокацию установите город вручную",
          duration: 15,
        });
        // }
        // console.log(err)
        setCurrentSity("Астана");
        setPos({ latitude: 43.258866, longitude: 76.905113 });
      }
    );
  }, [api]);
  return { currentCity, pos, contextHolder };
}

export default useGetCurrentCity;
