"use client"

import { Footer } from "@/features/Footer";
import { FooterMobile } from "@/features/FooterMobile";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import { revalidateConfig } from "@/shared/config/revalidateConfig";
import useTheme from "@/shared/hook/useTheme";
import { iCity } from "@/shared/types/city";
import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { ProductCardDetail } from "@/widgets/ProductCardDetail";
import { ConfigProvider, Layout } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Script from "next/script";
import { useState, useEffect } from "react";

const { Content } = Layout;

const fetchProduct = async (slug: any, locale: string) => {
  const url = `/api/v1/products/${slug}`;
  const response = await fetch(url, {
    next: revalidateConfig["/api/v1/products"],
  });
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};

export default function ProductPage({ params, Cities }: {params:any,Cities:iCity[]}) {
  const { slug } = params;
  const locale = useLocale();
  const [product, setProduct] = useState<ProductsDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { CurrentTheme } = useTheme();

  useEffect(() => {
    fetchProduct(slug, locale)
      .then(setProduct)
      .catch((error) => setError(error.message));
  }, [slug, locale]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentCity:string = Cities.find((i) => i.additional_data['EN'] === params.city)?.name_city||"Ошибка";

  return (
    <ConfigProvider theme={CurrentTheme}>
      <Layout>
        <Content>
          <header>
          <Header params={params} currentCity={currentCity} Cities={Cities}/>
            <HeaderMenu city={currentCity} urlCity={params.city}/>
          </header>
          <section>
            <ProductCardDetail product={product} params={params} currentCity={currentCity} />
          </section>
          <Footer params={params}/>
          <FooterMobile params={params} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
