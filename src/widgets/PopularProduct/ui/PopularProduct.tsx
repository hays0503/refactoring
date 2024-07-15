'use client';

import { Divider, Typography } from 'antd'
import { ProductCartPreview } from '@/features/ProductCartPreview';
import style from './PopularProduct.module.scss'
import { Populates } from '@/shared/types/populates';
import { Products } from '@/shared/types/products';
import useCityStore from '@/_app/store/city';

const { Title } = Typography

export default function PopularProduct({ products }: { products: Populates[] }) {

  const flatProduct:Products[] = products.filter((product) => product.activ_set === true).map((product) => product.products).flat();

  const currentCity = useCityStore((state)=>state.currentCity)


  return (
    <>
      <div style={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
        }}>
        <div className={style.Container}
        >

          <Title level={5}>Популярное {currentCity}</Title>
          <Divider orientation='center' type='horizontal' />

          <div className={style.HorizontalScrollWraper}>
            {
              flatProduct.map((product, index) => {
                return <ProductCartPreview
                  key={index}
                  product={product}
                  city={currentCity}
                  isVertical={true} />
              })
            }
          </div>
          <div className={style.HorizontalScrollWraper}>
            {
              flatProduct.map((product, index) => {
                return <ProductCartPreview
                  key={index}
                  product={product}
                  city={currentCity}
                  isVertical={true} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
