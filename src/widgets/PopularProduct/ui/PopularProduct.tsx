"use client";

import { Divider, Typography } from "antd";
import { ProductCartPreview } from "@/features/ProductCartPreview";
import style from "./PopularProduct.module.scss";
import { Products } from "@/shared/types/products";
import useCityStore from "@/_app/store/city";
import { useState, useEffect, useMemo,memo } from "react";
import { Populates } from "@/shared/types/populates";
import { FetchProductbyId } from "@/features/FetchProductbyId";

const { Title } = Typography;

function PopularProduct({
  populates,
}: {
  populates: Populates[];
}) {

  const flatProductId = useMemo(() => { return populates.map((product) => product.products).flat();}, [populates]);

  const currentCity = useCityStore((state) => state.currentCity);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className={style.Container}>
          <Title level={5}>Популярное {currentCity}</Title>
          <Divider orientation="center" type="horizontal" />

          <div className={style.HorizontalScrollWraper}>
            <FetchProductbyId ids={flatProductId} currentCity={currentCity} />
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(PopularProduct);
