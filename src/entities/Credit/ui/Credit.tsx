import { ProductsDetail } from "@/shared/types/productsDetail";
import Script from "next/script";
import { useState } from "react";

export default function Credit({
  product,
  currentCity,
}: {
  product: ProductsDetail | null;
  currentCity: string;
}) {
  const [rerender, setRerender] = useState(false);
  return (
    <>      
      <div
        className="ks-widget"
        data-template="button"
        data-merchant-sku={product?.vendor_code}
        data-merchant-code="BUGA"
        data-city="591010000"
        // id="ks-lztgz5iw"
        style={{ width: "100%" }}
      ></div>
      <div className="forte-btn" data-merchant-id="A2YN7r1ivpxijOlp1E" data-articul={product?.vendor_code} data-city-id="KZ-SEV-591010000" data-theme="dark">
      </div>
      <Script
      onReady={() => setRerender(!rerender)}
      id="KS-Widget"
      src="https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js" />      
      <Script
      onReady={() => setRerender(!rerender)}
      type="text/javascript"
      src="https://cdn-1.forte.kz/assets/forte-market-scripts/buy-credit.js" />
    </>
  );
}
