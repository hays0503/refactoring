import { Providers } from "@/_app/providers/providers";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";

import { Category } from "@/shared/types/category";
import { unstable_setRequestLocale } from "next-intl/server";

interface Params {
  slug: string;
}

export default function Layout({
  children,
  params: { locale, city, sku },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    city: string;
    sku: number;
  };
}) {
  unstable_setRequestLocale(locale);
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script
          id="KS-Widget"
          src="https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js"
        ></script>
      </head>
      <body>
        <div
          className="ks-widget"
          data-template="button"
          data-merchant-sku={sku}
          data-merchant-code="BUGA"
          data-city="591010000"
          id="ks-lztgz5iw"
        ></div>
        <div
          className="forte-btn"
          data-merchant-id="A2YN7r1ivpxijOlp1E"
          data-articul={sku}
          data-city-id="KZ-SEV-591010000"
          data-theme="dark"
        ></div>
        <script
          type="text/javascript"
          src="https://cdn-1.forte.kz/assets/forte-market-scripts/buy-credit.js"
        ></script>
      </body>
    </html>
  );
}
