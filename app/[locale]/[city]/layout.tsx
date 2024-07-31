import { Providers } from "@/_app/providers/providers";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};

const City = [
  {
    id: 1,
    additional_data: {
      EN: "Petropavlovsk",
      KZ: "",
    },
    name_city: "Петропавловск",
  },
  {
    id: 2,
    additional_data: {
      EN: "Astana",
      KZ: "",
    },
    name_city: "Астана",
  },
];

export function generateStaticParams() {
  const city = City.map((i)=>({city:i.additional_data.EN})); 
  return city
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
