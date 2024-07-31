import { ProductCartPreview } from "@/features/ProductCartPreview";
import { Card, Skeleton } from "antd";
import { useState, useEffect, useMemo } from "react";
import { Products } from "@/shared/types/products";
import React from "react";

interface FetchProductbyIdProps {
  ids: number[];
  currentCity: string;
  urlCity:string
}

function FetchProductbyId({ ids, currentCity,urlCity }: FetchProductbyIdProps) {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/products/by_ids/${ids.join(",")}/`, { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));  // Добавление обработки ошибок
  }, [ids]);

  const renderedProducts = useMemo(() => {
    return products?.map((product, index) => (
      <div key={index}>
        <ProductCartPreview
          product={product}
          city={currentCity}
          urlCity={urlCity}
          isVertical={true}
        />
      </div>
    ));
  }, [products, currentCity]);

  if (loading || !products) {
    return (
      <>
        <Card
          loading={true}
          style={{ minWidth: "250px", minHeight: "320px" }}
          cover={
            <Skeleton.Image
              active={true}
              style={{ width: "100%", height: "150px" }}
            />
          }
        >
          <Card.Meta title="Загрузка..." description="Загрузка..." />
        </Card>
      </>
    );
  }


  return <>{renderedProducts}</>;
}

export default React.memo(FetchProductbyId);
