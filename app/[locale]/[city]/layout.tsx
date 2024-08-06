import { Providers } from "@/_app/providers/providers";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import getCities from "@/shared/api/v1/getCities";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};


export async function generateStaticParams() {
  const Cities  = await getCities(); 
  return Cities.map((i)=>({city:i.additional_data.EN}))
}

export default async function RootLayout({
  children,
  params: { locale,city },
}: {
  children: React.ReactNode;
  params: { locale: string,city:string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <head>
        <MetaTagStatic />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
