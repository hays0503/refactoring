"use client";

import {
  Badge,
  Typography,
} from "antd";
import useBasketStore from "@/_app/store/basket";
const { Text } = Typography;


export default function BasketMobile({children}: any) {
  const { BasketData, } = useBasketStore((state) => ({
    BasketData: state.BasketData
  }));

  const badgeCount = Array.from(BasketData.values()).reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.count;
    },
    0
  );

  return (<Badge count={badgeCount} size="small">{children}</Badge>)
}