import { ProductsDetail } from "@/shared/types/productsDetail";
import Script from "next/script";

export default function KaspiCredit({
  product,
  currentCity,
}: {
  product: ProductsDetail | null;
  currentCity: string;
}) {
  return (
    <>
      <Script id="KS-Widget" src="https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js" />
      
      <div
        className="ks-widget"
        data-template="button"
        data-merchant-sku={product?.vendor_code}
        data-merchant-code="BUGA"
        data-city="591010000"
        id="ks-lztgz5iw"
      ></div>
      <div className="forte-btn" data-merchant-id="A2YN7r1ivpxijOlp1E" data-articul={product?.vendor_code} data-city-id="KZ-SEV-591010000" data-theme="dark">
      </div>
      <Script type="text/javascript" src="https://cdn-1.forte.kz/assets/forte-market-scripts/buy-credit.js" />
    </>
  );
}
