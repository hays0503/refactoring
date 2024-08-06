"use client";

import { Divider, Typography } from "antd";
import { ProductCartPreview } from "@/features/ProductCartPreview";
import style from "./PopularProduct.module.scss";
import { Products } from "@/shared/types/products";
import useCityStore from "@/_app/store/city";
import { useState, useEffect, useMemo, memo } from "react";
import { Populates } from "@/shared/types/populates";
import { FetchProductbyId } from "@/features/FetchProductbyId";

const { Title } = Typography;

function PopularProduct({ city,populates,urlCity }: { city:string,populates: Products[],urlCity:string; }) {



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
          <Title level={5}>Популярное {city}</Title>
          <Divider orientation="center" type="horizontal" />

          <div className={style.HorizontalScrollWraper}>
            {
                populates.length===0&&"Ни одного популярного продукта не определено"
            }
            {populates.map((i) => (
              <ProductCartPreview
                city={city}
                urlCity={urlCity}
                isVertical={true}
                key={i.id}
                product={i}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(PopularProduct);
