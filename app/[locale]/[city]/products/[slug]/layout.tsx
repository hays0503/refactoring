export async function generateStaticParams() {
  const arrId = await fetch(
    "http://185.100.67.246:8888/api/v1/products/all/slugs/"
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
