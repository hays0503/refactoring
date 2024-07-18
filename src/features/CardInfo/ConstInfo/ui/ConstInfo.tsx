import style from './ConstInfo.module.scss';
import { Button, Popover, Typography } from 'antd';
import { InfoCircleTwoTone, StarFilled } from '@ant-design/icons';
import { useTranslations } from "next-intl";
import { Products } from '@/shared/types/products';
import useCityStore from '@/_app/store/city';
import { ProductsDetail } from '@/shared/types/productsDetail';

const { Text,Link } = Typography;

const ConstInfo = ({ product }: { product: ProductsDetail | null }) => {

  const City = useCityStore((state) => state.currentCity);

  const t = useTranslations();

  return (
    <div className={style.CostContainer}>

    {/* Артикул и рейтинг */}
    <div className={style.ConstLineSpaceBetween}>
      <Text type="secondary">{t('artikul')} {product?.id}</Text>
      <div className={style.ConstLineSpaceBetween}>
        <Text><StarFilled style={{ color: 'gold' }} />{4.7}</Text>
        <Link>(7 {t('otzyvov')})</Link>
      </div>
    </div>

    {/* Цена */}
    <div className={style.ConstLine}>
      {/* Цена */}
      <div className={style.Cost}>
        <Text>{`${Number(product?.price[City]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸ `}</Text>
      </div>

      {/* Цена без скидки */}
      <div className={style.Cost}>
        <Text disabled delete>{`${Number(product?.price[City]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸ `}</Text>
      </div>
    </div>

    {/* Бонусы */}
    <div className={style.Bonus}>
      <Link>до 100</Link>
      <Text>{t('bonusov')}</Text>
      <Popover
        content={<div><Text>{t('akciya-takaya-to-i-uslovie-takie-to')}</Text></div>}
        title={t('opisanie-akcii-i-bonusov')}>
        <InfoCircleTwoTone />
      </Popover>
    </div>

    {/* В кредит / В рассрочку*/}
    <div className={style.Credit}>
      <div className={style.CreditLine}>
        <Text>{t('v-kredit')} </Text>
        <Text strong>{`${Number(11111).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}  ₸ x ${60} мес`}</Text>
      </div>
      <div className={style.CreditLine}>
        <Text>{t('v-rassrochku')} </Text>
        <Text strong>{`${Number(1111111).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}  ₸ x ${60} мес`}</Text>
      </div>
    </div>

    {/* Кнопка купить */}
    <Button className={style.CostBuy}>{t('dobavit-v-korzinu')}</Button>

  </div>
  )
}

export default ConstInfo