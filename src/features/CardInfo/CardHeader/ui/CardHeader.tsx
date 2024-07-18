import style from './CardHeader.module.scss';
import { Typography } from 'antd';
import { ProductsDetail } from '@/shared/types/productsDetail';

const { Title } = Typography;

const CardHeader = ({ product }: { product: ProductsDetail | null }) => {
  return (
    <div className={style.Header}>
    {/* Тэги */}
    <div className={style.HeaderTag}>
      <div className={style.Tag} style={{ backgroundColor: 'rgb(244, 128, 18)' }}>0-0-24</div>
      <div className={style.Tag} style={{ backgroundColor: 'rgb(115, 190, 111)' }}>-19%</div>
    </div>
    {/* Название */}
    <div>
      <Title level={5}>{product?.name_product}</Title>
    </div>
  </div>
  )
}

export default CardHeader;