import { Providers } from "@/_app/providers/providers";
import { revalidateConfig } from "@/shared/config/revalidateConfig";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";

import { Category } from "@/shared/types/category";
import { unstable_setRequestLocale } from "next-intl/server";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  try {
    const url = "http://pimenov.kz/api/v1/category/?format=json";
    const response = await fetch(url, {
      next: revalidateConfig["api/v1/category"],
    });
    const dataCatalog: Category[] = await response.json();

    const slug = buildFlatCategory(dataCatalog);
    return slug || [];
  } catch (error) {
    console.log("Ошибка при получении категорий", error);
    return [];
  }
}

export default function Layout({
  children,
  params: { locale, city, slug, page, limit, sort },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    city: string;
    slug: string;
    page: number;
    limit: number;
    sort: string;
  };
}) {
  unstable_setRequestLocale(locale);
  return (
    <Providers>{children}</Providers>
  );
}
