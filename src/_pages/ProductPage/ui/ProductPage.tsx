import { Footer } from "@/features/Footer";
import { Header } from "@/features/Header";
import { HeaderMenu } from "@/features/HeaderMenu";
import useTheme from "@/shared/hook/useTheme";
import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { ProductCardDetail } from "@/widgets/ProductCardDetail";
import { ConfigProvider, Layout } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const { Content } = Layout;

const fetchProduct = async (slug: any, locale: string) => {
  const url = `/api/v1/products/${slug}`;
  console.log("url ",url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const data = await response.json();
  return data;
};



export default function ProductPage({ params }: any){

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


  return (
    <ConfigProvider theme={CurrentTheme}>
    <Layout>
      <Content>
        <header>
          <Header/>
          <HeaderMenu/>
        </header>
        <section style={{ padding: "10px", minHeight: "calc(100vh)" }}>
          <ProductCardDetail product={product} />
        </section>
          <Footer/>
      </Content>
      </Layout>
    </ConfigProvider>     
  );
};