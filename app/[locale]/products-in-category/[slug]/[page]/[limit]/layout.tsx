import { Providers } from "@/_app/providers/providers";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";



import { Category } from "@/shared/types/category";
import { unstable_setRequestLocale } from "next-intl/server";

interface Params {
  slug: string;
}


export async function generateStaticParams() {

  try {
    const url = "http://185.100.67.246:8888/api/v1/category/?format=json";
    const response = await fetch(url, { cache: 'force-cache' });
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
  params: { locale, slug, page, limit },
}: {
  children: React.ReactNode;
  params: { locale: string; slug: string; page: number; limit: number };
}) {
  unstable_setRequestLocale(locale);
  return (<Providers>{children}</Providers>
    // <html lang={locale}>
    //   <head>
    //     <MetaTagStatic />
    //   </head>
    //   <body>
    //     <Providers>{children}</Providers>
    //   </body>
    // </html>
  );
}
