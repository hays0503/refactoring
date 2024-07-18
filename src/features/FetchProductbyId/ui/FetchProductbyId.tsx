import { ProductCartPreview } from "@/features/ProductCartPreview";
import { Products } from "@/shared/types/products";
import { useState, useEffect } from "react";

export default function FetchProductbyId({
  ids,
  currentCity,
}: {
  ids: number[];
  currentCity: string;
}) {
  const [products, setProducts] = useState<Products[] |[]>([]);

  useEffect(() => {
    fetch(`/api/v1/products/by_ids/${ids.join(",")}/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <>
      {products.map((product, index) => {
        return <div key={index}>
          <ProductCartPreview
            product={product}
            city={currentCity}
            isVertical={true}
          />
        </div>;
      })}
    </>
  );
}
