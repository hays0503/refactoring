'use client';

import { Button, Divider, Dropdown, Flex, Space, Typography } from 'antd'
import { ProductCartPreview } from '@/features/ProductCartPreview';
import Style from './CategoryProduct.module.scss'
import { useLocale } from 'next-intl';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { Category } from '@/shared/types/category';
import useCityStore from '@/_app/store/city';
import { selectDataByLangCategory } from '@/shared/tool/selectDataByLang';
import Image from 'next/image';
import { useState } from 'react';
import { ProductsDetail } from '@/shared/types/productsDetail';
import { Products } from '@/shared/types/products';

const { Title } = Typography



const ChangeListViewDropdown = ({currentItem,items}:{currentItem:number,items:MenuProps['items']}) => {
  // На странице 10 , 20 , 30 товаров

  return <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['0'],
    }}    
  >
    <Typography.Link>
      <Space>
        <Typography.Text>{`На странице ${currentItem}`}</Typography.Text>
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
};

export default function CategoryProduct(
  {
    products,
    currentCategory,
    params
  }:
    {
      products: Products[],
      currentCategory: Category | null,
      params: any
    }

) {

  const route = useRouter();

  const localActive = useLocale();

  const currentCity = useCityStore((store)=>store.currentCity)

  const nameCategory = selectDataByLangCategory(currentCategory, localActive)

  const [isVertical,setVertical] = useState<boolean>(true);
  

  const items = [
    {
      key: 0,
      label: 'Показать 12 товаров',
      onClick: () => route.replace(`/${localActive}/products-in-category/${params.slug}/${params.page}/12`)
    },
    {
      key: 1,
      label: 'Показать 15 товаров',
      onClick: () => route.replace(`/${localActive}/products-in-category/${params.slug}/${params.page}/15`)
    },
    {
      key: 2,
      label: 'Показать 18 товаров',
      onClick: () => route.replace(`/${localActive}/products-in-category/${params.slug}/${params.page}/18`)
    },
  ];

  return (
    <>
      {/* <div className={Style.MainContainer}> */}
        <div className={Style.Container}
        >
          <Flex justify='space-between' style={{width:'100%'}}>
            <div><Title level={5}>{nameCategory}</Title></div>
            <Flex justify='center' align='center' gap={'5px'}>
                <ChangeListViewDropdown currentItem={params.limit<=0?12:params.limit} items={items}/>
                <Button id={Style.desktop} onClick={()=>setVertical(false)}><Image src='/HorizontalList.svg' width={24} height={24} alt='HorizontalList'/></Button>
                <Button id={Style.desktop} onClick={()=>setVertical(true)}><Image src='/VerticalList.svg' width={24} height={24} alt='VerticalList'/></Button>                
            </Flex>
          </Flex>

          <Divider orientation='center' type='horizontal' />
          {/* ///////////////////////////////// */}
          <div
            className={isVertical?Style.GridContainerVertical:Style.GridContainerHorizontal}
          >
            {/* Если продуктов нет то пишем товар закончился */}
            {products && products.length === 0 && <div>Товар закончился</div>}
            {
              products?.map((product, index) => {
                return <ProductCartPreview
                  key={index}
                  product={product}
                  city={currentCity}
                  isVertical={isVertical} />
              })
            }
          </div>
        </div>
      {/* </div> */}

    </>
  )
}
