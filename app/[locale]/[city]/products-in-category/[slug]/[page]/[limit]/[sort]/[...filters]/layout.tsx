import { Providers } from "@/_app/providers/providers";
import { MetaTagStatic } from "@/shared/MetaTagStatic";
import { buildFlatCategory } from "@/shared/tool/buildFlatCategory";
import parseFilters from "@/shared/tool/parseFilters";

import { Category } from "@/shared/types/category";
import { unstable_setRequestLocale } from "next-intl/server";

interface Params {
  slug: string;
}

export default function Layout({
  children,
  params: { locale, city, slug, page, limit, sort,filters},
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    city: string;
    slug: string;
    page: number;
    limit: number;
    sort: string;
    filters: string[];
  };
}) {

  unstable_setRequestLocale(locale);
  return (
    <Providers>{children}</Providers>
  );
}
