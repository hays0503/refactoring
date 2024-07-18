import { ProductsDetail } from '@/shared/types/productsDetail';
import { Breadcrumb } from 'antd';

const AllBreadcrumb = ({ product }: { product: ProductsDetail | null }) => {
  const items = [
    {
      title: product?.category.name_category,
    },
    {
      title: product?.brand.name_brand,
    },
  ];

  return <Breadcrumb items={items} />;
};

export default AllBreadcrumb;