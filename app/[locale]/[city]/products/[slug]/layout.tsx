import { revalidateConfig } from "@/shared/config/revalidateConfig";

export async function generateStaticParams() {
  const arrId = await fetch(
    "http://pimenov.kz/api/v1/products/all/slugs/",
    {
      next: revalidateConfig["/api/v1/products/all/slugs"],
    }
  )
    .then((res) => res.json())
    .then((data: any) => {
      return data.map((item: any) => {
        return { slug: item };
      });
    });
  return arrId;
}

export default function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <section>{children}</section>;
}
